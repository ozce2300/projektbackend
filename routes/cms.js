const express = require("express");
const router = express.Router();
const connection = require("../server"); // Importera anslutningen


// routes

router.get('/', (req, res) => {
    res.json("CMS endpoint");
});

router.post('/', (req, res) => {
    res.json("CMS endpoint");
});

router.put('/', (req, res) => {
    res.json("CMS endpoint");
});

router.put('/', (req, res) => {
    res.json("CMS endpoint");
});

module.exports = router;
