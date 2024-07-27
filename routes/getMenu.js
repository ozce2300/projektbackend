const express = require("express");
const router = express.Router();
const connection = require("../server"); // Importera anslutningen


// route
router.get('/', (req, res) => {
 
        connection.query(`SELECT * FROM foodmeny`, (err, results) =>{
            if(err) {
                console.error('Database query error:', err);
                res.status(500).json({ error: " Server error" })
                return;
            }

            if(results.length === 0){
                res.status(404).json({ message: "Meny is empty" })
                return;
            }

            res.json({ message: "Get Meny", results})

        })

});


module.exports = router;
