const express   = require('express');
const router    = express.Router();
const request   = require('request');

const data      = require('../creds.json');

router.post('/', (req, res) => {
    const info =  { "address": data[0].addr, "amount": parseInt(req.body.amount) };

    request.post('https://api.blockcypher.com/v1/bcy/test/faucet?token=' + data[0].token, {form: JSON.stringify(info)}, (err, resp, body) => {
        if (err) {
            console.log(err)
        } else if (!err && resp.statusCode === 200) {
            res.redirect('/')
        }
    })
});

module.exports = router;