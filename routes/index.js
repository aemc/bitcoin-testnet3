const express = require('express');
const router = express.Router();

// Home page
router.get('/', (req, res) => {
    res.render('home');
});

// Receive page
router.get('/receive', (req, res) => {
    res.render('receive');
});

// Send page
router.get('/send', (req, res) => {
    res.render('send');
});

module.exports = router;