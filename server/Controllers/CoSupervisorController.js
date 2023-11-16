'use strict';

const cosupervisor = require('../Models/CoSupervisor');

module.exports = {
  getAllCoSup: function (req, res) {
    console.log('Controller CoSupervisor');

    cosupervisor
      .getAllCoSupervisor()
      .then((result) => {
       
        return res.status(200).json(result);
      })
      .catch((err) => {
        
        return res.status(err.status).json({ message: err.message }).end();
      });
  },
};
