const passport = require('passport')


module.exports = app => {
    // send request to google to login
    app.get('/auth/google', 
        passport.authenticate('google', {
            // what we want google to return
            scope: ['profile', 'email']
        })
    )
    // auth response from google
    app.get('/auth/google/callback',
        passport.authenticate('google'),
        // redirect response from google OAuth
        (req, res) => {
            res.redirect('/surveys')
        }
    )

    // logout
    app.get('/api/logout', (req, res) => {
        // passport attaches req.logout
        req.logout()
        res.redirect('/')
    })

    // test OAuth
    app.get('/api/current_user', (req, res) => {
        res.send(req.user)
    })
}
