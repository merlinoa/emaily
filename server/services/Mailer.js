const sendgrid = require('sendgrid')
const helper = sendgrid.mail
const keys = require('../config/keys')

class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {
        super()

        this.sgApi = sendgrid(keys.sendGridKey)
        this.from_email = new helper.Email('no-reply@email.com')
        this.subject = subject
        this.body = new helper.Content('text/html', content)
        this.recipients = this.formatAddresses(recipients)

        // addContent is method from helper.Mail
        this.addContent(this.body)
        // enable click tracking in email
        this.addClickTracking()
        this.addRecipients()
    }

    formatAddresses(recipients) {
        const out = recipients.map((recipient) => {
            return new helper.Email(recipient.email)
        })
        console.log("Recipients2: ", out)
        return out
    }

    addClickTracking() {
        // this stuff is from sendgrid API docs
        const trackingSettings = new helper.TrackingSettings()
        const clickTracking = new helper.ClickTracking(true, true)

        trackingSettings.setClickTracking(clickTracking)
        this.addTrackingSettings(trackingSettings)
    }

    addRecipients() {
        const personalize = new helper.Personalization()
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient)
        })
        this.addPersonalization(personalize)
    }

    async send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        })

        const response = await this.sgApi.API(request)
        
        return response
    }
}

module.exports = Mailer

