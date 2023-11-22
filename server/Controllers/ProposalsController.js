'use strict';

const proposalsServices = require('../Services/Proposals');

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

    proposalsServices
      .createThesisProposal(title, supervisor, cosup, groups, keywords, type, description, knowledge, notes, expiration, level, cds)
      .then((proposal) => {
        console.log(proposal)
        return res.status(200).json(proposal);

      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message }).end();
      });
  },

  getAllProposals: function (req, res) {
    proposalsServices.getAllProposals(req.user.id).then((proposals) => {
      return res.status(200).json(proposals);
    }).catch((err) => {
      return res.status(err.status).json({ message: err.message }).end()
    });
  },

  searchProposals: function (req, res) {
    proposalsServices.searchProposals(req.user.id, req.params.searchTerm).then((proposals) => {
      console.log(proposals);
      return res.status(200).json(proposals);
    }).catch((err) => {
      return res.status(err.status).json({ message: err.message }).end()
    });
  },

  getActiveThesisProposals: async function (req, res) {
    try {
      if (req.isAuthenticated() && req.user.role !== 'Student') {
        const result = await proposalsServices.getThesisProposals('Active');
        return res.status(200).json(result);
      }
      else {
        return res.status(401).json({ errorMessage: 'Unauthorized' });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ errorMessage: err });
    }
  },

  getArchivedThesisProposals: async function (req, res) {
    try {
      if (req.isAuthenticated() && req.user.role !== 'Student') {
        const result = await proposalsServices.getThesisProposals('Archived');
        return res.status(200).json(result);
      }
      else {
        return res.status(401).json({ errorMessage: 'Unauthorized' });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ errorMessage: err });
    }
  },

};
