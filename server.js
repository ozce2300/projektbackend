const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const aport = 8000;
const app = express();
const jwt = require("jsonwebtoken")
const authenticateToken = require('./authmiddle');  // Importera authenticateToken



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
app.use(express.urlencoded({ extended: true })) // Aktivera formulärdata.

// Exportera connection
module.exports = connection;

// Importera rutter från 'routes' mappen
const start = require("./routes/start")
const auth = require('./routes/auth');
const getMenu = require('./routes/getMenu');
const cms = require('./routes/cms');
const postTable = require('./routes/postTable')

// Använd routes
app.use("/api", start)
app.use("/api/admin", auth);
app.use("/api/getMenu", authenticateToken, getMenu);
app.use("/api/cms", authenticateToken, cms);
app.use("/api/postTable", postTable);


// Starta server
app.listen(aport, () => {
    console.log(`Server running at port: ${aport}`);
});
