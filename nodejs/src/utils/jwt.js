const jwt = require('jsonwebtoken');

const createToken = (user) => {
    return jwt.sign({ id: user._id,defaultrole:user?.defaultrole }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { createToken, verifyToken };
