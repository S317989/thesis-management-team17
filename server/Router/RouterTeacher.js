const express = require('express');
const teacherRouter = express.Router();

const teacherController = require('../Controllers/TeacherController');


teacherRouter.get('/get-all', teacherController.getAllTeacher); 


module.exports = teacherRouter;