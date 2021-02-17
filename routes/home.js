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

router.get('/ar', function (req, res) {
    res.render('home/ar');
});

router.get('/faceapi', function (req, res) {
    res.render('home/faceapi');
});

router.post('/fetch_external_image', async (req, res) => {
    console.log('Data: ', req.body);

    const { imageUrl } = req.body
    if (!imageUrl) {
      return res.status(400).send('imageUrl param required')
    }
    try {
      const externalResponse = await request(imageUrl)
      res.set('content-type', externalResponse.headers['content-type'])
      return res.status(202).send(Buffer.from(externalResponse.body))
    } catch (err) {
      return res.status(404).send(err.toString())
    }
  })

module.exports = router;