// index.js
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
var util = require('./util');
var fs = require('fs');
const app = express();

const router = express.Router();

// Other settings
app.set("port" , (process.env.PORT || 5000)); 
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(flash());

// Custom Middlewares
app.use(function (req, res, next) {
    res.locals.util = util;
    next();
});


// Routes
app.use('/', require('./routes/home'));

app.listen(app.get("port") , 
    function(){ console.log("APP IS RUNNING ON ["+ app.get("port") +"]"); }); 
