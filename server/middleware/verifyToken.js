const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Access denied. Token is missing.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_PASS);
        req.userId = decoded._id;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
};

module.exports = verifyToken;
