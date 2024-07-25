const express = require("express");
const router = express.Router();
const connection = require("../server"); // Importera anslutningen


// route
router.post('/', async (req, res) => {
    try {
        res.json({ message: "Logged in" })
    }

    catch {
        res.status(500).json({ error: " Server error" })
    }
});

module.exports = router;
