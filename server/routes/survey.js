const _ = require('lodash')
const Path = require('path-parser')
const { URL } = require('url')
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

const Survey = mongoose.model('surveys')

//const testSurvey = { title: 'my title', subject: 'my subject', body: 'this is the body', recipients: 'merlinoa88@gmail.com'}

module.exports = (app) => {
    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting!')
    })

    app.post('/api/surveys/webhooks', (req, res) => {
        let events = _.map(req.body, (event) => {
            const pathname = new URL(event.url).pathname
            const p = new Path('/api/surveys/:surveyId/:choice')
            // p.test will return wildcards (e.g. /:wildcard_name) in an object
            // if p.test cant find all widcards it will return null
            const match = p.test(pathname)
            if (match) {
                return { 
                    email: event.email,
                    surveyId: match.surveyId,
                    choice: match.choice
                }
            }
        })
        
        // remove elements from events that are undefined
        events = _.compact(events)
        // only want unique events.  do not want to record multiple survey responses from same person for the same survey
        events = _.uniqBy(events, "surveyId", "email")

        console.log(events)
        res.send({})
    })

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        

        let { title, subject, body, recipients } = req.body

        recipients = recipients.split(',').map((e) => {
            return { email: e.trim() }
        })
        
        const survey = new Survey({
            title,
            body,
            subject,
            recipients,
            _user: req.user.id,
            dateSent: Date.now()
        })

        try {
            // send email
            const mailer = new Mailer(survey, surveyTemplate(survey))
            await mailer.send()
            
            // save to mongo surveys collection
            await survey.save()

            // deduct one credit for the survey
            req.user.credits -= 1
            const user = await req.user.save()

            // pass user with one less credit back to express
            res.send(user)
        } catch (err) {
            res.status(422).send(err)
        }
    })
}
