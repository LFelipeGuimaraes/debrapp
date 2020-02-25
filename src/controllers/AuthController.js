const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
    async store(req, res) {
        const { email, password } = req.body;

        let user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).send('Invalid email or password');
        }

        const validPass = await bcrypt.compare(password, user.password);

        if (!validPass) {
            return res.status(400).send('Invalid email or password');
        }

        const token = user.generateAuthToken();

        res.json(token);
    }
}