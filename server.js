const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.DB_PORT | 8000;
const app = express();

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
const loggin = require('./routes/loggin');
const cms = require('./routes/cms');

// Använd rutter
app.use("/", getMenu);
app.use("/admin", loggin);
app.use("/cms", cms);

// Starta server
app.listen(port, () => {
    console.log(`Server running at port: ${port}`);
});
