const express = require('express');
const thesisRouter = express.Router();

const thesisController = require('../Controllers/ThesisController');

thesisRouter.post('/apply', thesisController.applyForProposal);
thesisRouter.get('/active-proposals', thesisController.getActiveThesisProposals);

module.exports = thesisRouter;