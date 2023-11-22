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
    proposalsServices.getAllProposals().then((proposals) => {
      return res.status(200).json(proposals);
    }).catch((err) => {
      return res.status(err.status).json({ message: err.message }).end()
    });
  },

  searchProposals: function (req, res) {
    proposalsServices.searchProposals(req.params.searchTerm).then((proposals) => {
      console.log(proposals);
      return res.status(200).json(proposals);
    }).catch((err) => {
      return res.status(500).json({ message: err.message }).end()
    });
  },

  getTeacherActiveProposals: async function (req, res) {
    try {
      const results = await proposalsServices.getTeacherActiveProposals(req.user.id);
      res.status(200).json(results);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },

  getTeacherArchivedProposals: async function (req, res) {
    try {
      const results = await proposalsServices.getTeacherArchivedProposals(req.user.id);
      res.status(200).json(results);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
};
