const { privKey, pubKey } = require('../keys.json');

const express = require('express');
const router  = express.Router();
const request = require('request');

const bitcoin = require('bitcoinjs-lib');
const bigi    = require('bigi');
const buffer  = require('buffer');
const keys    = new bitcoin.ECPair(bigi.fromHex(privKey));

const data = require('../creds.json');

router.post('/', (req, res) => {
    const newtx = {
        inputs: [{addresses: [data[0].addr]}],
        outputs: [{addresses: [data[1].addr], value: parseInt(req.body.amount)}]
    };

    // Creating transaction + locally sign transaction
    request.post({
        url: 'https://api.blockcypher.com/v1/bcy/test/txs/new',
        form: JSON.stringify(newtx)
    }, (err, resp, body) => {
        if (err) {
            console.log(err)
        } else {
            // Sign each of the hex-encoded string required to finalize the transaction
            let tmptx = JSON.parse(body);
            tmptx.pubkeys = [];
            tmptx.signatures = tmptx.tosign.map((tosign, n) => {
                tmptx.pubkeys.push(keys.getPublicKeyBuffer().toString('hex'));
                return keys.sign(new buffer.Buffer(tosign, 'hex')).toDER().toString('hex');
            });

            // Send back the transaction with all the signatures to broadcast
            request.post({
                url: 'https://api.blockcypher.com/v1/bcy/test/txs/send',
                form: JSON.stringify(tmptx)
            }, (err, resp, body) => {});

            const sendtx = {
                tx: tmptx.tx,
                tosign: tmptx.tosign,
                signatures: tmptx.signatures,
                pubkeys: [pubKey]
            };

            // Send transaction
            request.post({
                url: 'https://api.blockcypher.com/v1/bcy/test/txs/send',
                form: JSON.stringify(sendtx)
            }, (err, resp, body) => {
                if (err) {
                    console.log(err)
                } else {
                    //console.log((body)) //TODO: remove
                    res.redirect('/send');
                }
            })
        }
    })
});

module.exports = router;

