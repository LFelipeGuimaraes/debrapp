const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const conn = new Sequelize(dbConfig);

console.log('AAAA ', dbConfig);

// models
const UserSchools = require('../models/UserSchools');
const Student = require('../models/Student');
const School = require('../models/School');
const Class = require('../models/Class');
const Post = require('../models/Post');
const User = require('../models/User');

UserSchools.init(conn);
Student.init(conn);
School.init(conn);
Class.init(conn);
Post.init(conn);
User.init(conn);

School.associate(conn.models);
Class.associate(conn.models);
Student.associate(conn.models);
Post.associate(conn.models);
User.associate(conn.models);

module.exports = conn;