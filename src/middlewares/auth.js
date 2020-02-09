const jwt = require('jsonwebtoken');
require('custom-env').env(process.env.NODE_ENV);

module.exports = function(req, res, next) {
    const token = req.header('X-auth-token');

    if (!token) {
        return res.status(401).send('Access denied. No authentication token provided.');
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_KEY);
        req.user = payload;
        next();
    } catch (e) {
        res.status(401).send('Invalid authentication token.');
    }
}