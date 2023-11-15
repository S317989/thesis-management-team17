'use strict';

const thesis_proposal = require('../Models/ThesisProposal');

module.exports = {
  newThesisRequest: function (req, res) {
    console.log('ControllerProposal');
    const {
      title,
      supervisor,
      cosup,
      groups,
      keywords,
      type,
      description,
      knowledge,
      notes,
      expiration,
      level,
      cds,
    } = req.body;

    thesis_proposal
      .createThesisProposal(title, supervisor, cosup, groups, keywords, type, description, knowledge, notes, expiration, level, cds)
      .then((proposal) => {
         console.log(proposal)
        return res.status(200).json(proposal);
       
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message }).end();
      });
  },
};
