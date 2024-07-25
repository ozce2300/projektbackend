const express = require("express");
const router = express.Router();
const connection = require("../server"); // Importera anslutningen


// route
router.get('/', (req, res) => {

    res.json({message: "Get menu"})
});

module.exports = router;
