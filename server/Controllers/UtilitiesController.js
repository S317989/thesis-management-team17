'use strict';

const utilitiesServices = require('../Services/Utilities');

module.exports = {
  getAllCoSup: function (req, res) {
    console.log('Controller CoSupervisor');

    utilitiesServices
      .getAllCoSupervisor()
      .then((result) => {

        return res.status(200).json(result);
      })
      .catch((err) => {

        return res.status(err.status).json({ message: err.message }).end();
      });
  },

  getAllCds: function (req, res) {
    console.log('ControllerDegree');

    utilitiesServices
      .getAllDegrees()
      .then((result) => {

        return res.status(200).json(result);
      })
      .catch((err) => {

        return res.status(err.status).json({ message: err.message }).end();
      });
  },

  getAllGroups: function (req, res) {
    console.log('Controller Research Group');

    utilitiesServices
      .getAllGroups()
      .then((result) => {

        return res.status(200).json(result);
      })
      .catch((err) => {

        return res.status(err.status).json({ message: err.message }).end();
      });
  },

  getAllTeacher: function (req, res) {
    console.log('TeacherController');

    utilitiesServices
      .getAllTeacher()
      .then((result) => {

        return res.status(200).json(result);
      })
      .catch((err) => {

        return res.status(err.status).json({ message: err.message });
      });
  },
};
