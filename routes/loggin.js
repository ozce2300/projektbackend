const express = require("express");
const router = express.Router();
const connection = require("../server"); // Importera anslutningen


// route
router.post('/', async (req, res) => {
    try {
       const {username, password} = req.body
       errors = [];

       //Validera inmatning
       if(!username) {errors.push("Write in your username")};
       if (!password) { errors.push("Write in your password")};

       if (errors.length > 0) {
        res.status(400).json({errors})
        return;
       }

   
       
    }
    catch {
        res.status(500).json({ error: " Server error" })
    }
});

module.exports = router;
