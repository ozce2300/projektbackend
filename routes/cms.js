const express = require("express");
const router = express.Router();
const connection = require("../server"); // Importera anslutningen


// routes

router.get('/', async (req, res) => {
    try {
        res.json({ message: ("Get cms") })
    }

    catch {
        res.status(500).json({ error: " Server error" })
    }
});

router.post('/', (req, res) => {
    connection.query(`INSERT INTO foodmeny(name, description, price) VALUES("Margarheta", "ost, skinka", 555)`, (error, results) => {
        if (error) {
            res.status(500).json({ error: "Server error" });
            return;
        }

        res.json({ message: "New menu ", results });
    });
});



router.put('/', async (req, res) => {
    try {
        res.json({ message: ("Put cms") })
    }

    catch {
        res.status(500).json({ error: " Server error" })
    }
});

router.delete('/', async (req, res) => {
    try {
        res.json({ message: "Deleted cms" })
    }

    catch {
        res.status(500).json({ error: " Server error" })
    }
});

module.exports = router;
