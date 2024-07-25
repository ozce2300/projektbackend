const express = require("express");
const router = express.Router();
const connection = require("../server"); // Importera anslutningen


// route
router.post('/', (req, res) => {
    res.json({message: ("Logged in")})
});

module.exports = router;
