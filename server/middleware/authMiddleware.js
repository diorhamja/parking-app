const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        } else {
            req.userId = decodedToken.id;
            next();
        }
    });
};

module.exports = requireAuth;
