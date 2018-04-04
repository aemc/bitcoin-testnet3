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
                const data = JSON.parse(body);
                res.render('home', {
                    address: data.address,
                    balance: data.final_balance,
                    totalReceived: data.total_received,
                    totalSent: data.total_sent,
                    page: 'home'
                })
            }
        });
});

// router.get('/balance/:address', (req, res) => {
//     request
//         .get('https://api.blockcypher.com/v1/bcy/test/addrs/' + req.params.address + '/balance', (err, res, body) => {
//             if (err) {
//                 console.log(err)
//             } else if (!err && res.statusCode === 200) {
//                 const balance = JSON.parse(body).final_balance;
//                 console.log(`Latest bitcoin balance is ${balance}`);
//                 return balance
//             }
//         })
//         .pipe(res);
//
// });

// router.get('/info', (req, res) => {
//     request
//         .get('https://api.blockcypher.com/v1/tokens/' + TOKEN)
//         .pipe(res);
// });
//
// router.get('/addr', (req, res) => {
//     request.post('https://api.blockcypher.com/v1/bcy/test/addrs?token=' + data[1].token)
//         .pipe(res)
// });

// Receive page
router.get('/receive', (req, res) => {
    res.render('receive', {page: 'receive'});
});

// Send page
router.get('/send', (req, res) => {
    res.render('send', {page: 'send'});
});

module.exports = router;