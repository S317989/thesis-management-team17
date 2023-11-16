'use strict';

const rgroup = require('../Models/ResearchGroup');

module.exports = {
  getAllGroups: function (req, res) {
    console.log('Controller Research Group');

    rgroup
      .getAllGroups()
      .then((result) => {
       
        return res.status(200).json(result);
      })
      .catch((err) => {
        
        return res.status(err.status).json({ message: err.message }).end();
      });
  },
};
