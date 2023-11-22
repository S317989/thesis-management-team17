const express = require('express');
const proposalsController = require('../Controllers/ProposalsController');

const proposalsRouter = express.Router();

proposalsRouter.post('/new', proposalsController.newThesisRequest); 
proposalsRouter.get('/all', proposalsController.getAllProposals);
proposalsRouter.get('/search/:searchTerm', proposalsController.searchProposals);

//teacher only routes
proposalsRouter.get('/my-active', proposalsController.getTeacherActiveProposals);
proposalsRouter.get('/my-archived', proposalsController.getTeacherActiveProposals);

module.exports = proposalsRouter;