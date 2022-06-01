var express = require('express');
var app = express();
var path = require('path');
const jsdom = require('jsdom');
const jquery = require('jquery');
var mysql = require('mysql');
var bodyParser = require('body-parser');
const cors = require('cors');
var web = require('./routes/web');
var admin = require('./routes/admin');
var MultiParser = require('./multiparser');
let multer = require('multer');
const db = require('./database.js');
var crypto = require('crypto');

var session = require('express-session');
var cookieParser = require('cookie-parser');
var MySQLStore = require('express-mysql-session')(session);

var sessionStore = new MySQLStore({
    expiration: 10800000,
    createDatabaseTable: true,
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
}, db.connection);
// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use('/',web)
app.use('/admin', admin);


app.use(MultiParser());
app.use(multer().any());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());


// set the view engine to ejs
app.set('view engine', 'ejs');
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));



app.listen(8092);
console.log('Server is listening on port 8092');