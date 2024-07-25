const mysql = require("mysql");
const express = require("express");
const cors = require("cors")
require("dotenv").config();
const port = process.env.PORT || 8000;
const app = express();

//Ansluta till server

const connection = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

connection.connect(err => {
    if (err) {
        console.log("Could not connect to database")
        return;
    }

    else {
        console.log("Connected to database")
    }
});


app.get("/", (req, res) => {
    res.json({message: "Get Menu"})
})

app.post("/admin/cms", (req,res, next) => {
    
})