const Student = require('../models/Student');
const Class = require('../models/Class');
const School = require('../models/School');

module.exports = {
    async store(req, res) {
        const { name, disability, age, medical_report, comments, class_id } = req.body;
        const { school_id } = req.params;

        const _class = await Class.findByPk(class_id);

        if (!_class) {
            return res.status(404).json({ error: 'Class not found' });
        } else if (_class['school_id'] != school_id) {
            return res.status(400).json({ error: 'Class does not belong to this school' });
        }

        const student = await Student.create({ name, disability, age, medical_report, comments, class_id, school_id });

        return res.json(student);
    },

    async index(req, res) {
        const { school_id } = req.params;

        const school = await School.findByPk(school_id, {
            include: { 
                association: 'students', 
                include: { 
                    association: 'class', 
                    attributes: ['year', 'letter']
                }, 
            },
            order: [
                ['students', 'name', 'ASC']
            ] 
        });

        if (!school) {
            return res.status(404).json({ error: 'School not found' });
        }

        return res.json(school.students);
    },

    async show(req, res) {
        const { school_id, student_id } = req.params;

        const student = await Student.findByPk(student_id, {
            include: { association: 'class', attributes: ['year', 'letter'] }
        });
        
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        } else if (student['school_id'] != school_id) {
            return res.status(400).json({ error: 'Student does not belong to this school' });
        }

        return res.json(student);
    },

    async update(req, res) {
        const { school_id, student_id } = req.params;
        const body = req.body;

        const updateQuery = await Student.update(body, {
            returning: true,
            where: {
                id: student_id,
                school_id: school_id,
            },
        });

        const [ rowsUpdate, [ updatedSchool ] ] = updateQuery;

        if (rowsUpdate == 0) {
            return res.status(404).json({ error: 'Student not found or does not belong to this school' });
        }

        return res.json(updatedSchool);
    },

    async delete(req, res) {
        const { school_id, student_id } = req.params;

        let student = await Student.findByPk(student_id);

        if (!student) {
            return res.status(404).json({ error: 'Student not found' })
        } else if (student['school_id'] != school_id) {
            return res.status(400).json({ error: 'Student does not belong to this school' });
        } else {
            await student.destroy();
            return res.json(student);
        }
    }
}