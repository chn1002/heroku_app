//routes/home.js
var express = require('express');
var router = express.Router();
const axios = require("axios");
const cheerio = require('cheerio');

router.get('/', function (req, res) {
    res.render('home/crawling');
});

router.get('/apicrawling', function (req, res) {
    var redata = req.query.data;
    let url = 'http://ncov.mohw.go.kr/';

    axios.get(url).then(html => {
        const $ = cheerio.load(html.data);
        let parentTag = $("div.liveNum ul.liveNum li");

        let resultArr = [];
        parentTag.each(function(i, elem){
            let itemObj = { 
                _text : $(this).find("strong").text(), 
                _num :$(this).find("span").text()
            }
            resultArr.push(itemObj);
        })
     
        const data = resultArr.filter(n => n._text);
        return res.json(data);
    });
});

module.exports = router;