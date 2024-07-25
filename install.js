const mysql = require ("mysql");
require("dotenv").config();

//Ansluta till server

const connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    port     : process.env.DB_PORT,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE
  });
   
  connection.connect(err =>{
    if(err) {
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
} )
connection.query(`CREATE TABLE foodmeny (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(235),
    description VARCHAR(300),
    price INT,
    created DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err, results) =>{
        if(err) throw err;

        console.log("Tabel foodmeny created" + results)
    });

    




