// index.js
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const util = require('./util');
const fs = require('fs');
const app = express();

const router = express.Router();
const Options = {etag:false,
    maxAge: 86400 * 1000    // 24 Hour
};

// Other settings
app.set("port" , (process.env.PORT || 5000)); 
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public', Options));
app.set("etag", false);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(flash());

// Custom Middlewares
app.use(function (req, res, next) {
    req.headers['if-none-match'] = 'no-match-for-this';
    res.locals.util = util;
    next();
});


// Routes
app.use('/', require('./routes/home'));
app.use('/crawling', require('./routes/crawling'));
app.use('/api', require('./routes/api'));

app.listen(app.get("port") , 
    function(){ console.log("APP IS RUNNING ON ["+ app.get("port") +"]"); }); 
