// Instantiate express
const express = require('express');
const app     = express();

// Import routes
const indexRoutes   = require('./routes/index');
const receiveRoutes = require('./routes/receive');
const sendRoutes    = require('./routes/send');

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// View engine setup
app.set("view engine", "ejs");
app.use('/scripts', express.static(__dirname + '/node_modules/'));

// Assign routes
app.use('/', indexRoutes);
app.use('/receive', receiveRoutes);
app.use('/send', sendRoutes);

// Ports
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));