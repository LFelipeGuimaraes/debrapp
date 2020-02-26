const Class = require('../models/Class');
const School = require('../models/School');

module.exports = {
    async store(req, res) {
        const { school_id } = req.params;
        const { year, letter } = req.body;
        
        const school = await School.findByPk(school_id);

        if (!school) {
            return res.status(404).json({ error: 'School not found' });
        }

        const _class = await Class.create({
            year,
            letter,
            school_id,
        });

        return res.json(_class);
    },

    async index(req, res) {
        const { school_id } = req.params;

        const school = await School.findByPk(school_id, {
            include: { association: 'classes' }
        });

        if (!school) {
            return res.status(404).json({ error: 'School not found' });
        }

        return res.json(school.classes);
    },

    async delete(req, res) {
        const { class_id, school_id } = req.params;

        let _class = await Class.findByPk(class_id);

        if (!_class) {
            return res.status(404).json({ error: 'Class not found' })
        } else if (_class['school_id'] != school_id) {
            return res.status(400).json({ error: 'Class does not belong to this school' });
        } else {
            await _class.destroy();
            return res.json(_class);
        }
    }
}
