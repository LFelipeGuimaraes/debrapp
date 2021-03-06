const jwt = require('jsonwebtoken');
const User = require('../models/User');
const School = require('../models/School');

module.exports = async function(req, res, next) {
    const { id } = req.user;
    const { school_id } = req.params;

    const user = await User.findByPk(id);
    const school = await School.findByPk(school_id);

    if (!school) {
        return res.status(404).send({ error: 'School not found' });
    }

    const check = await user.hasSchool(school);

    if (!check) {
        return res.status(403).send({ error: 'Access denied. You do not have permission to access this school.' });
    }

    return next();
}