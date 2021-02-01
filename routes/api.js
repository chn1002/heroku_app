//routes/home.js
var express = require('express');
var router = express.Router();
const Instagram = require('instagram-web-api')
const FileCookieStore = require('tough-cookie-filestore2')

const cookieStore = new FileCookieStore('./cookies.json')

var username = "chn1002@gmail.com";
var password = "Cjswl100@";
var profile;
var activity;
let commentId;
let nextPageToken;
let userId;
var user;

console.log(username + " : " + password);
const client = new Instagram({username, password, cookieStore});
(async () => {
    try {
        const {userId: id} = await client.login()
        const user = await client.getUserByUsername({username: "desiredUsername"})
        console.log(`${username}'s id is ${user.id} !`)
        userId = user.id;
        const followers = await client.getFollowers({userId: userId})
        console.log("followers :" + followers.count)
        console.log("followers :" + followers.data.first_name)

    } catch (err) {
        if (err.error && err.error.message === 'checkpoint_required') {
            const challengeUrl = err
                .error
                .checkpoint_url
                await client
                .updateChallenge({challengeUrl, choice: 1})
        }
        console.log("err")
    }

    profile = await client.getProfile()
})()

// AJAX GET METHOD
router.get('/get', function (req, res) {
    var data = req.query.data;
    var result = data;

    if(data == "TIME")
    {
        result += ": " + new Date();
    }
    else
    {
        console.log('GET Parameter = ' + data);

        result += "Succese"
    }
    console.log(result);

    res.send({result: result});
});

// AJAX POST METHOD
router.post('/post', function (req, res) {
    var data = req.body.data;

    console.log('POST Parameter = ' + data);
    var result = data + ' Succese';
    console.log(result);
    res.send({result: result});
});

module.exports = router;