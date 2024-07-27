const express = require("express");
const router = express.Router();
const connection = require("../server"); // Importera anslutningen

// routes
router.get('/', (req, res) => {
    connection.query('SELECT * FROM foodmeny', (err, results) => {
        if (err) {
            console.error('Database query error:', err)
            res.status(500).json({ error: "Server error" })
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ message: "No meny find" })
            return;
        }
        res.json({ message: "Get Meny", results })
    })
});

router.post('/', (req, res) => {
    const { name, description, price } = req.body

    // Validera inmatning
    let errors = []
    if (!name) { errors.push("Write in name") };
    if (!description) { errors.push("Write in description") };
    if (!price || isNaN(price)) { errors.push("Write in price in numbers") }

    // Om det finns fel, returnera alla felmeddelanden
    if (errors.length > 0) {
        res.status(400).json({ errors })
        return;
    }

    // Kontrollera om namnet redan finns i databasen
    connection.query('SELECT * FROM foodmeny WHERE name = ?', [name], (err, results) => {
        if (err) {
            console.error("Database query error:", err);
            res.status(500).json({ error: "Server error" });
            return;
        }

        if (results.length > 0) {
            // Namnet finns redan i databasen
            errors.push("Name already exists in the menu");
            res.status(400).json({ errors });
            return;
        }
    })


    connection.query(`INSERT INTO foodmeny(name, description, price) VALUES(?,?,?)`, [name, description, price], (err, results) => {
        if (err) {
            console.error("Database querry error:", err)
            res.status(500).json({ error: "Server error" });
            return;
        }

        let meny = {
            name: name,
            description: description,
            price: price
        }

        res.json({ message: "New menu ", meny });
    });
});



router.put('/:id', (req, res) => {
    const id = req.params.id
    const { name, description, price } = req.body

    // Validera inmatning
    let errors = []
    if (!name) { errors.push("Write in name") };
    if (!description) { errors.push("Write in description") };
    if (!price || isNaN(price)) { errors.push("Write in price") }

    // Om det finns fel, returnera alla felmeddelanden
    if (errors.length > 0) {
        res.status(400).json({ errors })
        return;
    }

    connection.query('UPDATE foodmeny SET name = ?, description = ?, price = ? WHERE id = ?', [name, description, price, id],(err,result) => {
        if(err) {
            console.error("Database query error: ", err)
            res.status(500).json({error: "Server error"})
            return;
        }

        let updatedMeny = {
            id:id,
            name: name,
            description: description,
            price: price
        }
        res.json({message : "Updated meny", updatedMeny })
   
    });

});


router.delete('/:id', (req, res) => {
    const id = req.params.id;

    connection.query('DELETE FROM foodmeny WHERE id = ?', [id],(err,results) => {
        if(err) {
            console.error("Database query error")
            res.status(500).json({error: "Server error"})
            return;
        }

        res.json({message: "Meny deleted", results})
    })


});

module.exports = router;
