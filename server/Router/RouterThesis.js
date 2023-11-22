const express = require('express');
const thesisRouter = express.Router();

const thesisController = require('../Controllers/ThesisController');

thesisRouter.post('/apply', thesisController.applyForProposal);
thesisRouter.get('/active-proposals', thesisController.getActiveThesisProposals);
thesisRouter.get('/archived-proposals', thesisController.getArchivedThesisProposals);
thesisRouter.get('/accept', thesisController.acceptThesisApplication);
thesisRouter.get('/reject', thesisController.rejectThesisApplication);

module.exports = thesisRouter;