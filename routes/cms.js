const express = require("express");
const router = express.Router();
const connection = require("../server"); // Importera anslutningen

// routes
router.get('/', (req, res) => {
    connection.query('SELECT * FROM foodmeny', (err,results) => {
        if(err) {
            console.error('Database query error:', err)
            res.status(500).json({error: "Server error"})
            return;
        }
        if(results.length === 0) {
            res.status(404).json({message: "No meny find"})
            return;
        }
        res.json({message : "Get Meny", results})
    })
});

router.post('/', (req, res) => {
    const {name, description, price} = req.body

    // Validera inmatning
    let errors = []
    if(!name) {errors.push("Skriv in namnet")};
    if(!description) {errors.push("Skriv in beskrivning")};
    if(!price) {errors.push("Skriv in priset")}

    // Om det finns fel, returnera alla felmeddelanden
    if(errors.length > 0) {
        res.status(404).json({errors})
    }

    connection.query(`INSERT INTO foodmeny(name, description, price) VALUES(?,?,?)`, [name,description,price], (err, results) => {
        if (err) {
            console.error("Database querry error:", err)
            res.status(500).json({ error: "Server error" });
            return;
        }

        let meny = {
            name:name,
            description:description,
            price:price
        }

        res.json({ message: "New menu ", meny  });
    });
});



router.put('/:id', async (req, res) => {
    const id = req.params.id
    const {name, description, price} = req.body

    connection.query('UPDATE ')

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
