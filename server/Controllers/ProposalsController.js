'use strict';

const proposalsServices = require('../Services/Proposals');

module.exports = {
  addOrUpdateProposal: function (req, res) {
    proposalsServices
      .addOrUpdateProposal(req.body)
      .then((proposal) => {
        return res.status(200).json(proposal);
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message }).end();
      });
  },

  deleteProposal: function (req, res) {
    proposalsServices
      .deleteProposal(req.body.proposalId)
      .then(() => {
        return res.status(200).json('proposal deleted');
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message }).end();
      });
  },

  archiveProposal: function (req, res) {
    proposalsServices
      .archiveProposal(req.body.proposalId)
      .then(() => {
        return res.status(200).json('proposal archived');
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message }).end();
      });
  },

  getAllProposals: function (req, res) {
    proposalsServices.getAllProposals().then((proposals) => {
      return res.status(200).json(proposals);
    }).catch((err) => {
      return res.status(500).json({ message: err.message }).end()
    });
  },

  getStudentApplicationsProposals: function (req, res) {
    console.log(req.user);
    proposalsServices.getStudentApplicationsProposals(req.user.id).then((proposals) => {
      console.log(proposals);
      return res.status(200).json(proposals);
    }).catch((err) => {
      return res.status(500).json({ message: err.message }).end()
    });
  },

  getAvailableProposalsForStudent: function (req, res) {
    console.log(req.user);
    proposalsServices.getAvailableProposalsForStudent(req.user.id).then((proposals) => {
      console.log(proposals);
      return res.status(200).json(proposals);
    }).catch((err) => {
      return res.status(500).json({ message: err.message }).end()
    });
  },

  searchProposals: function (req, res) {
    proposalsServices.searchProposals(req.params.searchTerm).then((proposals) => {
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

      return res.status(500);
    }
  },

  getTeacherArchivedProposals: async function (req, res) {
    try {
      const results = await proposalsServices.getTeacherArchivedProposals(req.user.id);
      res.status(200).json(results);
    } catch (error) {

      return res.status(500);
    }
  },
};
