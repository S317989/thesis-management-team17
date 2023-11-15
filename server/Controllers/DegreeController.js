'use strict';

const degree = require('../Models/Degree');

module.exports = {
  getAllCds: function (req, res) {
    console.log('ControllerDegree');

    degree
      .getAllDegrees()
      .then((result) => {
        console.log(result);
        return res.status(200).json(result);
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message }).end();
      });
  },
};
