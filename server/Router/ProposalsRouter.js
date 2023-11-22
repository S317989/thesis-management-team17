const express = require('express');
const proposalsController = require('../Controllers/ProposalsController');

const proposalsRouter = express.Router();

proposalsRouter.post('/new-proposal', proposalsController.newThesisRequest); 
proposalsRouter.get('/retrieve-all', proposalsController.getAllProposals);
proposalsRouter.get('/search/', proposalsController.searchProposals);
proposalsRouter.get('/active-proposals', proposalsController.getActiveThesisProposals);
proposalsRouter.get('/archived-proposals', proposalsController.getArchivedThesisProposals);


module.exports = proposalsRouter;