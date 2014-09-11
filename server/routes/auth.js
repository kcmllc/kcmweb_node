var express = require('express')
var router = express.Router()
var googleapis = require('googleapis')
var OAuth2Client = googleapis.auth.OAuth2

var CLIENT_ID = '170203394820-udbd9v0rtgf1r2h2lalha178ei05jp2g.apps.googleusercontent.com'
var CLIENT_SECRET = 'Pc0SDrJqB_PMhzB8174h4eqC'
var REDIRECT_URL = 'http://www.knightcapllc.com/auth/oauth2callback'

var oauth2client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)

var scopes = ['https://www.googleapis.com/auth/plus.login',
              'https://www.googleapis.com/auth/plus.me', 'https://www.googleapis.com/auth/userinfo.profile',
              'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/admin.directory.group',
              'https://www.googleapis.com/auth/admin.directory.group.member', 'https://www.googleapis.com/auth/tasks']


router.get('/oauth2callback', function(req, res){
    var code = req.params.code;
    oauth2client.getToken(code, function(err, tokens){
        oauth2client.setCredentials(tokens)
        req.session.username = 'Kyle'
        res.redirect('/')
    });
})
router.get('/login', function(req, res){
    if(req.session.username){
        res.redirect(req.originalUrl)
    }
    var url = oauth2client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes.join(" ")
    })
    res.redirect(url)
})

router.get('/logout', function(req, res){
    req.session.destroy()
    res.redirect('/')
})



module.exports = router
