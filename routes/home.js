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

router.get('/postdata', function (req, res) {
    res.render('home/postdata', { title: 'PostData', id: "test", method: "get"});
});

router.get('/instagram', function (req, res) {
    res.render('home/instagram');
});

router.post('/sendPost', function (req, res) {
    var bodyT = req.body.color;
    console.log('Data: ', req.body.color);

    res.render('home/postdata', { title: 'PostD', id: bodyT, method: "post"});
});

module.exports = router;