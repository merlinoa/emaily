const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    //res.send(req)
    res.render('index')
})

// set express to always start looking for files in the root directory
// app.use(express.static(__dirname))
app.use(bodyParser.urlencoded({ extended: true }))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})

