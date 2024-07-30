const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.DB_PORT | 8000;
const app = express();
const jwt = require("jsonwebtoken")


// Ansluta till MySQL-databas
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect(err => {
    if (err) {
        console.error("Could not connect to database", err);
        return;
    }
    console.log("Connected to database");
});

// Middleware
app.use(express.json());  // För att hantera JSON-data
app.use(cors());  // För att hantera CORS

// Exportera connection
module.exports = connection;

// Importera rutter från 'routes' mappen
const getMenu = require('./routes/getMenu');
const auth = require('./routes/auth');
const cms = require('./routes/cms');
const postTable = require('./routes/postTable')

// Använd routes
app.use("/admin", auth);
app.use("/", authenticateToken, getMenu);
app.use("/cms", authenticateToken, cms);
app.use("/postTable", authenticateToken, postTable);

//Validera token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    console.log('Authorization header:', authHeader);  // Lägg till denna rad
    const token = authHeader && authHeader.split(" ")[1]; // Token

    if (token == null) {
        return res.status(401).json({message: "Not authorize for this page, token missing"});
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) => {
        if (err) {
            console.error('JWT verification error:', err);  // Lägg till denna rad
            return res.status(403).json({message: "Invalid JWT"});
        }

        req.username = username;
        next();
    });
}

// Starta server
app.listen(port, () => {
    console.log(`Server running at port: ${port}`);
});
