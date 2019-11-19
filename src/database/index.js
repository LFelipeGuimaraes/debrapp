const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
let conn;

if (process.env.DATABASE_URL) {
    conn = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'psotgres'
    });
} else {
    conn = new Sequelize(dbConfig);
}


// models
const Student = require('../models/Student');
const School = require('../models/School');
const Class = require('../models/Class');
const Post = require('../models/Post');

Student.init(conn);
School.init(conn);
Class.init(conn);
Post.init(conn);

School.associate(conn.models);
Class.associate(conn.models);
Student.associate(conn.models);
Post.associate(conn.models);

module.exports = conn;