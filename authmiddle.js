// authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    console.log('Authorization header:', authHeader);  // Debugging
    const token = authHeader && authHeader.split(" ")[1]; // Token

    if (token == null) {
        return res.status(401).json({ message: "Not authorized, token missing" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            console.error('JWT verification error:', err);  // Debugging
            return res.status(403).json({ message: "Invalid JWT" });
        }

        req.user = user;
        next();
    });
}

module.exports = authenticateToken ;
