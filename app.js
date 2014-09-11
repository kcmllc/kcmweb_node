// set up ========================
var express = require('express');
var stylus = require('stylus');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');
var app = express();

//mongoose.connect('mongodb://knightcapllc.com:27017/fin_intel')
var conn = mongoose.createConnection('mongodb://knightcapllc.com:27017/fin_intel');
conn.on('error', console.error.bind(console,'connection error:'));
conn.once('open', function () {
    console.info('connected to database')
});
// Bootstrap models
fs.readdirSync(__dirname + '/server/models').forEach(function (file) {
    if (~file.indexOf('.js')) require(__dirname + '/server/models/' + file);
        console.log(file)
});
console.log(mongoose.modelNames());
app.set('views', __dirname + '/client/public/templates');
app.set('view engine', 'jade');

app.use(bodyParser({
    limit: '50mb'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser('97OUK3hTmvC4CDfbFh7rRCb3'));
app.use(session({
    secret: '97OUK3hTmvC4CDfbFh7rRCb3',
    saveUninitialized: true,
    resave: true
}));

app.use(stylus.middleware(__dirname + '/client'));
app.use(express.static(__dirname + '/client'));

// check auth
app.use(function(req, res, next){
    app.locals.username = req.session.username;
    req.db = conn;
    next();
});

var auth = require('./server/routes/auth');
var index = require('./server/routes/index');
var finintel = require('./server/routes/finintel');
var articles = require('./server/routes/articles');
var strategy = require('./server/routes/strategy');

app.use('/', index);
app.use('/finintel', finintel);
app.use('/articles', articles);
app.use('/auth', auth);
app.use('/strategy', strategy);



// listen (start app with node server.js) ======================================
app.listen(3002);

