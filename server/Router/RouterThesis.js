const express = require('express');
const thesisRouter = express.Router();

const thesisController = require('../Controllers/ThesisController');

thesisRouter.post('/apply', thesisController.applyForProposal);

module.exports = thesisRouter;