const request = require('request');
const express = require('express');
const app     = express();

const data    = require('./creds.json');

// Import routes
const indexRoutes   = require('./routes/index');
const receiveRoutes = require('./routes/receive');
const sendRoutes    = require('./routes/send');

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// view engine setup
app.set("view engine", "ejs");
app.use('/scripts', express.static(__dirname + '/node_modules/'));

app.get('/info', (req, res) => {
    request
        .get('https://api.blockcypher.com/v1/tokens/' + TOKEN)
        .pipe(res);
});

app.get('/addr', (req, res) => {
    request.post('https://api.blockcypher.com/v1/bcy/test/addrs?token=' + data[1].token)
        .pipe(res)
});

app.get('/balance/:address', (req, res) => {
    request
        .get('https://api.blockcypher.com/v1/bcy/test/addrs/' + req.params.address + '/balance', (err, res, body) => {
            if (!err && res.statusCode === 200) {
                const balance = JSON.parse(body).final_balance;
                console.log(`Latest bitcoin balance is ${balance}`);
                return balance
            }
        })
        .pipe(res);

});

// Assign routes
app.use('/', indexRoutes);
app.use('/receive', receiveRoutes);
app.use('/send', sendRoutes);

// Ports
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));