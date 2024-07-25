const mysql = require ("mysql");
require("dotenv").config();

//Ansluta till server

const connection = mysql.createConnection({
    host     : process.env.HOST,
    port     : process.env.PORT,
    user     : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE
  });
   
  connection.connect(err =>{
    if(err) {
        console.log("Could not connect to database")
    }

    else {
        console.log("Connected to database")
    }
  });

// SQL-FRÅGA

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




