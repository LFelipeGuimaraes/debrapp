const User = require('../models/User');
const School = require('../models/School');
const bcrypt = require('bcrypt');

module.exports = {
    async store(req, res) {
        const { name, email } = req.body;
        let { password } = req.body;

        const salt = await bcrypt.genSalt(8);
        password = await bcrypt.hash(password, salt);

        let user = await User.findOne({ where: { email } });

        if (user) {
            return res.status(400).send('User with this email is already registered.');
        }

        user = await User.create({ name, email, password });

        await user.save();

        const token = user.generateAuthToken();

        res.send(token);
    },

    async show(req, res) {
        const { id } = req.user;

        const user = await User.findByPk(id, {
            attributes: ['name', 'email']
        });

        return res.json(user);
    },

    async addSchool(req, res) {
        const { id } = req.user;
        const { code } = req.body;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const school = await School.findOne({
            where: { code }
        });

        if (!school) {
            return res.status(400).json({ error: 'School not found' });
        }

        await user.addSchool(school, { through: { isManager: false } });

        return res.json(school);

    }
}