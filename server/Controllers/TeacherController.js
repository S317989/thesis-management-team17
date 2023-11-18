'use strict';

const teacher = require('../Models/Teacher');

module.exports = {
  getAllTeacher: function (req, res) {
    console.log('TeacherController');

    teacher
      .getAllTeacher()
      .then((result) => {
       
        return res.status(200).json(result);
      })
      .catch((err) => {
        
        return res.status(err.status).json({ message: err.message });
      });
  },
};