const express = require('express');
const proposalRouter = express.Router();

const ThesisProposalController = require('../Controllers/ThesisProposalController');


proposalRouter.post('/thesis/newproposal', ThesisProposalController.newThesisRequest); 


module.exports = proposalRouter;