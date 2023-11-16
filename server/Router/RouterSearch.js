const express = require('express');
const searchRouter = express.Router();

const searchController = require('../Controllers/SearchController');

searchRouter.get('/get-all/:userID', searchController.getAllProposals);

searchRouter.get('/retrieve-all/:userID', searchController.getAllProposals);

searchRouter.get('/search/:userID/:searchTerm', searchController.searchProposals);

module.exports = searchRouter;


