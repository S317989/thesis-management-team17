const express = require('express');
const searchRouter = express.Router();

const searchController = require('../Controllers/SearchController');

searchRouter.get('', searchController.getAllProposals);

searchRouter.post('/search', searchController.searchProposals);

module.exports = searchRouter;


