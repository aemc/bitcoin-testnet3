const express = require('express');
const router  = express.Router();
const request = require('request');

const data    = require('../creds.json');

// Home page
router.get('/', (req, res) => {
    request
        .get('https://api.blockcypher.com/v1/bcy/test/addrs/' + data[0].addr + '/balance', (err, resp, body) => {
            if (err) {
                console.log(err)
            } else if (!err && resp.statusCode === 200) {
                const balance = JSON.parse(body).final_balance;
                res.render('home', {balance, page: 'home'})
            }
        });
});

// Receive page
router.get('/receive', (req, res) => {
    res.render('receive', {page: 'receive'});
});

// Send page
router.get('/send', (req, res) => {
    res.render('send', {page: 'send'});
});

module.exports = router;