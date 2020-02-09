const User = require('../models/User');
const School = require('../models/School');
const UserSchools = require('../models/UserSchools');

module.exports = async function(req, res, next) {
    const { id } = req.user;
    const { school_id } = req.params;

    const user_school = await UserSchools.findOne({
        where: {
            user_id: id,
            school_id: school_id,
        }
    })

    if (!user_school.isManager) {
        res.status(403).send('Access denied. This operation can only be executed by the school manager.')
    }

    next();
}