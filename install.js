const mysql = require("mysql");
require("dotenv").config();

//Ansluta till server

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
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

// SQL-FRÅGA

connection.query(`DROP TABLE IF EXISTS foodmeny`, (err, results) => {
    if (err) throw err;
    console.log("Tabel removed" + results)
})
connection.query(`CREATE TABLE foodmeny (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(235),
    description VARCHAR(300),
    price INT,
    created DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err, results) => {
    if (err) throw err;

    console.log("Tabel foodmeny created" + results)
});

connection.query(`DROP TABLE IF EXISTS bord`, (err, results) => {
    if (err) throw err;
    console.log("Tabel removed" + results)
})
connection.query(`CREATE TABLE bord (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100),
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    number_of_guests INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`, (err, results) => {
    if (err) throw err;

    console.log("Tabel bord created" + results)
});





