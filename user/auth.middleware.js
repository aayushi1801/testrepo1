const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(" ")[1]; 
    if(!token){
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, '01');
        req.user = decoded; 
        next(); 
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = {
    authenticate,
};
