const express = require("express");
const router = express.Router();
const connection = require("../server"); // Importera anslutningen


// route
router.get('/', (req, res) => {
 
        connection.query(`SELECT * FROM foodmeny`, (error, results) =>{
            if(error) {
                res.status(500).json({ error: " Server error" })
                return;
            }

            res.json({ message: "Get Menu", results})

        })

});


module.exports = router;
