//routes/home.js
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('home/index');
});

router.get('/photosphereviewer', function (req, res) {
    res.render('home/photosphereviewer');
});

router.get('/marzipano', function (req, res) {
    res.render('home/marzipano');
});

module.exports = router;