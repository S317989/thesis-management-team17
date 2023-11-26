const express = require('express');
const proposalsController = require('../Controllers/ProposalsController');

const proposalsRouter = express.Router();

proposalsRouter.get('/all', proposalsController.getAllProposals);
proposalsRouter.get('/search/:searchTerm', proposalsController.searchProposals);

//teacher only routes
proposalsRouter.get('/my-active', proposalsController.getTeacherActiveProposals);
proposalsRouter.get('/my-archived', proposalsController.getTeacherArchivedProposals);
proposalsRouter.post('/edit', proposalsController.addOrUpdateProposal); 
proposalsRouter.delete('/delete', proposalsController.deleteProposal); 
proposalsRouter.post('/archive', proposalsController.archiveProposal); 

module.exports = proposalsRouter;