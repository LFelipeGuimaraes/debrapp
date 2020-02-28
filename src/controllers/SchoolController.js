const School = require('../models/School');
const User = require('../models/User');
const UserSchools = require('../models/UserSchools')
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
                },
                include: {
                    association: 'users',
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    }
                }
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user.schools);
    },

    async update(req, res) {
        const { school_id } = req.params;
        const body = req.body;

        const updateQuery = await School.update(body, {
            returning: true,
            where: {
                id: school_id,
            },
        });

        const [ rowsUpdate, [ updatedSchool ] ] = updateQuery;

        if (rowsUpdate == 0) {
            return res.status(404).json({ error: 'School not found' });
        }

        return res.json(updatedSchool);
    },

    async delete(req, res) {
        const { school_id } = req.params;

        let school = await School.findByPk(school_id);

        if (!school) {
            return res.status(404).json({ error: 'School not found' })
        } else {
            await school.destroy();
            return res.json(school);
        }
    }

    
}