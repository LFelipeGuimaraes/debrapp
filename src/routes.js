const express = require('express');

const SchoolController = require('./controllers/SchoolController');
const ClassController = require('./controllers/ClassController');
const StudentController = require('./controllers/StudentController');
const PostController = require('./controllers/PostController');
const UserController = require('./controllers/UserController');
const AuthController = require('./controllers/AuthController');

// middlewares
const auth = require('./middlewares/auth');
const authSchool = require('./middlewares/authSchool');
const checkManager = require('./middlewares/checkManager');

const routes = express.Router();

// Register user
routes.post('/users', UserController.store);

// Authenticate user
routes.post('/auth', AuthController.store);

// Require authentication to access the routes below
routes.use(auth);
// Users
routes.get('/users/me', UserController.show);
routes.post('/users/me/schools', UserController.addSchool);

// Schools
routes.post('/schools', SchoolController.store);
routes.get('/schools', SchoolController.index);
routes.delete('/schools/:school_id', checkManager, SchoolController.delete);
routes.put('/schools/:school_id', checkManager, SchoolController.update);

// Require authorization to access the routes from a specified school
routes.param('school_id', authSchool);
// Classes
routes.get('/schools/:school_id/classes', ClassController.index);
routes.post('/schools/:school_id/classes', checkManager, ClassController.store);
routes.delete('/schools/:school_id/classes/:class_id', checkManager, ClassController.delete);

// Students
routes.post('/schools/:school_id/students', checkManager, StudentController.store);
routes.get('/schools/:school_id/students', StudentController.index);
routes.get('/schools/:school_id/students/:student_id', StudentController.show);
routes.delete('/schools/:school_id/students/:student_id', checkManager, StudentController.delete);
routes.put('/schools/:school_id/students/:student_id', checkManager, StudentController.update);

// Posts
routes.post('/schools/:school_id/students/:student_id/posts', PostController.store);
routes.get('/schools/:school_id/students/:student_id/posts', PostController.index);
routes.get('/schools/:school_id/students/:student_id/posts/:category', PostController.indexByCategory);
routes.delete('/schools/:school_id/students/:student_id/posts/:post_id', PostController.delete);


module.exports = routes;