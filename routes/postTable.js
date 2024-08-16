const express = require("express");
const router = express.Router();
const connection = require("../server"); // Importera anslutningen
const nodemailer = require("nodemailer");
require('dotenv').config(); 
const authenticateToken = require('../authmiddle');  // Importera authenticateToken


// Transporter för nodemailer med e-postdomänens SMTP-inställningar
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

router.post('/', (req, res) => {
    const { customer_name, phone, email,reservation_date,reservation_time, number_of_guests } = req.body

    // Validera inmatning
    let errors = []
    if (!customer_name) { errors.push("Write in your name") };
    if (!email) { errors.push("Write in your email") };
    if (!phone || isNaN(phone)) { errors.push("Write in your phonenumber") };
    if (!reservation_date) { errors.push("Write in your reservation date") };
    if (!reservation_time) { errors.push("Write in your reservation time") };
    if (!number_of_guests || isNaN(number_of_guests)) { errors.push("Write in how many guests") };

    // Om det finns fel, returnera alla felmeddelanden
    if (errors.length > 0) {
        res.status(400).json({ errors })
        return;
    }

    // SQL FRåga
    connection.query(`INSERT INTO bord(customer_name, email, phone, reservation_date, reservation_time, number_of_guests) 
        VALUES(?,?,?,?,?,?)`, [customer_name, email, phone, reservation_date, reservation_time,number_of_guests], (err, results) => {
        if (err) {
            console.error("Database querry error:", err)
            res.status(500).json({ error: "Server error" });
            return;
        }
        //Objekt

        let booking = {
            customer_name: customer_name,
            email: email,
            phone: phone,
            reservation_date:reservation_date,
            reservation_time:reservation_time,
            number_of_guests:number_of_guests
        }

        res.json({ message: "New menu ", booking });

        //Skicka mejl ifall allt är okej
        const mailOptions = {
            from: process.env.EMAIL_USER,
            from: `"Dollar Restaurang" <${process.env.EMAIL_USER}>`,
            to: email, 
            subject: 'Bokningsbekräftelse',
            text: `Hej ${customer_name},\n\nTack för din bokning!\n\nDetaljer:\nDatum: ${reservation_date}\nTid: ${reservation_time}\nAntal gäster: ${number_of_guests}\n\n<Varmt Välkomna>,\nDollar Restaurang`,
            html: `<p>Hej ${customer_name},</p>
                   <p>Tack för din bokning!</p>
                   <p>Detaljer:</p>
                   <ul>
                       <li>Datum: ${reservation_date}</li>
                       <li>Tid: ${reservation_time}</li>
                       <li>Antal gäster: ${number_of_guests}</li>
                   </ul>
                   <p>Varmt Välkomna,<br>Dollar Restaurang</p>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Email sending error:", error);
                res.status(500).json({ error: "Server error while sending email" });
                return;
            }
    });
});

});

//SQL-Fråga
router.get('/', authenticateToken, (req, res) => {
    connection.query('SELECT * FROM bord', (err, results) => {
        if (err) {
            console.error('Database query error:', err)
            res.status(500).json({ error: "Server error" })
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ message: "No bookings find" })
            return;
        }
        res.json({ message: "Get booking", results })
});
});
//SQL-Fråga radera
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    connection.query('DELETE FROM bord WHERE id = ?', [id],(err,results) => {
        if(err) {
            console.error("Database query error")
            res.status(500).json({error: "Server error"})
            return;
        }

        res.json({message: "Meny deleted", results})
    })


});
module.exports = router;
