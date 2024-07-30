const express = require("express");
const router = express.Router();
const connection = require("../server"); // Importera anslutningen
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();


// routes

//Registrera inlogg 
router.post("/registration", async (req, res) => {
    //Felhantering med try & catch

    try {
        const { username, password } = req.body;
        //Validera inmatning
        if (!username || !password) {
            res.status(400).json({ error: "Please write in your username and password" })
            return;
        }
        // Se om användanamnet är upptaget
        connection.query('SELECT * FROM members WHERE username = ?;', [username], async (err, results) => {
            if (err) {
                console.error("Database query error", err);
                res.status(500).json({ error: "Database query error" });
                return;
            }

            if (results.length > 0) {
                res.status(409).json({ error: "The username is already in use" });
                return;
            }


            //Hasha lösenord
            const hashedPassword = await bcrypt.hash(password, 10)

            // Spara användare
            connection.query(`INSERT INTO members(username, password)VALUES(?,?);`, [username, hashedPassword], (err) => {

                if (err) {
                    console.error('Error creating user:', err);
                    res.status(500).json({ error: "Error creating user" })
                    return;
                }

                else {
                    res.status(201).json({ message: "Registrations succesful" })
                }
            });
        });
    }

    catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: " Server error" })
    }
});

router.post('/inlog', async (req, res) => {
    try {
        const { username, password } = req.body

        //Tom array där fel läggs till
        let errors = [];

        //Validera inmatning
        if (!username) { errors.push("Write in your username") };
        if (!password) { errors.push("Write in your password") };

        if (errors.length > 0) {
            res.status(400).json({ errors })
            return;
        }
        //SQL-FRÅGA
        connection.query(`SELECT * FROM members WHERE username = ?;`, [username], async (err, results) => {
            if (err) {
                console.error("Database query error")
                res.status(400).json({ error: "Database query error" });
                return;
            }

            if (results.length === 0) {
                res.status(401).json({ error: "Invalid username or password" });
                return;
            }

                // Om användare finns
                const user = results[0];

                // Verifiera lösenord
                const match = await bcrypt.compare(password, user.password);
                if (!match) {
                    res.status(401).json({ error: "Invalid username or password" });
                    return;
                } 
                //Skapa JWT
                const payload = { username: username }
                const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '1h'})
                const response = {
                    message:"SUccesfull login",
                    token:token
            }           
            res.json({ response });


        });

    }
    catch (error) {
        console.error('Server error', err);
        res.status(500).json({ error: "Server error" });
        return;
    }
});

module.exports = router;
