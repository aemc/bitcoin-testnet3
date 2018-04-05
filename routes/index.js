const express = require('express');
const router  = express.Router();
const request = require('request');

const data    = require('../creds.json');

// Home page
router.get('/', (req, res) => {
    let txrefs;

    // Get address data
    request
        .get('https://api.blockcypher.com/v1/bcy/test/addrs/' + data[0].addr, (err, resp, body) => {
            if (err) {
                console.log(err);
                res.redirect('/');
            } else if (!err && resp.statusCode === 200) {
                const addrData = JSON.parse(body);
                txrefs = addrData.txrefs;

                // Get balance info
                request
                    .get('https://api.blockcypher.com/v1/bcy/test/addrs/' + data[0].addr + '/balance', (err, resp, body) => {
                        if (err) {
                            console.log(err);
                            res.redirect('/');
                        } else if (!err && resp.statusCode === 200) {
                            const data = JSON.parse(body);
                            // Return the latest 20 tx
                            txrefs = txrefs.slice(0, 20);
                            res.render('home', {
                                address: data.address,
                                balance: data.final_balance,
                                totalReceived: data.total_received,
                                totalSent: data.total_sent,
                                confirmedTx: data.n_tx,
                                unconfirmedTx: data.unconfirmed_n_tx,
                                totalTx: data.final_n_tx,
                                page: 'home',
                                txrefs,
                            })
                        }
                    });
            }
        })
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