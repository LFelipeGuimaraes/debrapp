const Student = require('../models/Student');
const Post = require('../models/Post');
const User = require('../models/User');
const categories = require('../config/categories');

module.exports = {
    async store(req, res) {
        const { content } = req.body;
        let { category } = req.body;
        const { student_id, school_id } = req.params;
        const user_id = req.user.id;

        category = category.toLowerCase();

        const student = await Student.findByPk(student_id);
        
        if (!categories.includes(category)) {
            return res.status(400).json({ error: `Category must be one of these values: [${categories}]` });
        }
        
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        } else if (student['school_id'] != school_id) {
            return res.status(400).json({ error: 'Student does not belong to this school' });
        }
        
        const post = await Post.create({ content, category, student_id, user_id });
        
        const user = await User.findByPk(user_id);
        await user.addPost(post);

        return res.json(post);
    },

    async index(req, res) {
        const { student_id, school_id } = req.params;

        const student = await Student.findByPk(student_id, {
            include: { 
                association: 'posts',
                include: {
                    association: 'author',
                    attributes: ['name']
                },
            },
            order: [
                ['posts', 'created_at', 'DESC']
            ]
        });

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        } else if (student['school_id'] != school_id) {
            return res.status(400).json({ error: 'Student does not belong to this school' });
        }

        return res.json(student.posts);
    },

    async indexByCategory(req, res) {
        const { student_id, school_id } = req.params;
        let { category } = req.params;

        category = category.toLowerCase();

        if (!categories.includes(category)) {
            return res.status(400).json({ error: `Category must be one of these values: [${categories}]` });
        }

        let student = await Student.findByPk(student_id);

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        } else if (student['school_id'] != school_id) {
            return res.status(400).json({ error: 'Student does not belong to this school' });
        }

        student = await Student.findByPk(student_id, {
            include: { 
                association: 'posts',
                where: { category },
                include: {
                    association: 'author',
                    attributes: ['name']
                },
            },
            order: [
                ['posts', 'created_at', 'ASC']
            ]
        });

        if (!student) {
            return res.status(404).json({ error: 'Student does not have any post with this category' });
        }

        return res.json(student.posts);
    },

    async delete(req, res) {
        const { school_id, student_id, post_id } = req.params;

        let post = await Post.findByPk(post_id, {
            include: { association: 'student' }
        });

        if (!post) {
            return res.status(404).json({ error: 'Post not found' })
        } else if (post['student_id'] != student_id) {
            return res.status(400).json({ error: 'Post does not belong to this student' });
        } else if (post['student']['school_id'] != school_id) {
            return res.status(400).json({ error: 'Student does not belong to this school' });
        } else {
            await post.destroy();
            return res.json(post);
        }
    }
}