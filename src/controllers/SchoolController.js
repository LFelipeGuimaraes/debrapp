const School = require('../models/School');
const User = require('../models/User');
const random = require('crypto-random-string');

module.exports = {
    async store(req, res) {
        const { name, city, state } = req.body;
        const { id } = req.user;
        const code = random({length: 8});

        const school = await School.create({ name, city, state, code });

        const user = await User.findByPk(id);

        await user.addSchool(school, { through: { isManager: true } });

        return res.json(school);
    },

    async index(req, res) {
        const { id } = req.user;
        
        const user = await User.findByPk(id, {
            include: { 
                association: 'schools',
                attributes: ['id', 'name', 'city', 'state', 'code'],
                through: {
                    as: 'user_school',
                    attributes: ['isManager'],
                }
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user.schools);
    }
}