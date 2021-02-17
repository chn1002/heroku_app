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

app.listen(app.get("port"), () => console.log('Listening on port 5000!'))

function request(url, returnBuffer = true, timeout = 10000) {
  return new Promise(function(resolve, reject) {
    const options = Object.assign(
      {},
      {
        url,
        isBuffer: true,
        timeout,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
        }
      },
      returnBuffer ? { encoding: null } : {}
    )

    get(options, function(err, res) {
      if (err) return reject(err)
      return resolve(res)
    })
  })
}