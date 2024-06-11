// fetchuser.js
const jwt = require('jsonwebtoken');
require('dotenv').config()

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token')
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET)
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "INVALID TOKEN" })
    }
}

module.exports = fetchuser;
