const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys')
require('./models/User')
require('./services/passport')

mongoose.connect(keys.mongoURI)

const app = express()
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // encrypt id
    keys: [keys.cookieKey]
}))
app.use(passport.initialize())
app.use(passport.session())

require('./routes/auth')(app)

// sets express to always start looking for files in the root directory
// app.use(express.static(__dirname))
// allows for parsing of req.body
//app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send({name: "Andy"})
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})
