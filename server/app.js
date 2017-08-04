const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const keys = require('./config/keys')
require('./models/User')
require('./models/Survey')
require('./services/passport')

mongoose.connect(keys.mongoURI)

const app = express()

// allows for parsing of req.body
app.use(bodyParser.json())

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // encrypt id
    keys: [keys.cookieKey]
}))
app.use(passport.initialize())
app.use(passport.session())

// routes that go directly to Express APIs
require('./routes/auth')(app)
require('./routes/billing')(app)
require('./routes/survey')(app)

if (process.env.NODE_ENV === 'production') {
    // Express will serve up React production assest
    // like our main.js React stuff
    // make root at client/build.  This will happen after express
    // serves index.html; which is set up in the code following this loc
    app.use(express.static('client/build'))

    // if Express does not recognize the route
    // serve up index.html which will then look for the react js build file
    const path = require('path')
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})
