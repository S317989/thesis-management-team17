'use strict';

const utilitiesServices = require('../Services/Utilities');

module.exports = {
  getAllExternalCosupervisors: function (req, res) {
    
    utilitiesServices
      .getAllExternalCoSupervisor()
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message }).end();
      });
  },

  getAllCds: function (req, res) {
    

    utilitiesServices
      .getAllDegrees()
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message }).end();
      });
  },

  getAllGroups: function (req, res) {
    

    utilitiesServices
      .getAllGroups()
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message }).end();
      });
  },

  getAllTeacher: function (req, res) {
    

    utilitiesServices
      .getAllTeacher()
      .then((result) => {

        return res.status(200).json(result);
      })
      .catch((err) => {

        return res.status(500).json({ message: err.message });
      });
  },

  getAllKeywords: function (req, res) {
    

    utilitiesServices
      .getAllKeywords()
      .then((result) => {

        return res.status(200).json(result);
      })
      .catch((err) => {

        return res.status(500).json({ message: err.message });
      });
  },

  addKeyword: function (req, res) {
    

    utilitiesServices
      .addKeyword(req.body.keyword)
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => {
        
        return res.status(500).json({ message: err.message });
      });
  },

  addExternalCoSupervisor: function (req, res) {
    

    utilitiesServices
      .addExternalCoSupervisor(req.body)
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message });
      });
  },
};
