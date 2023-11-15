const express = require('express');
const searchRouter = express.Router();

const searchController = require('../Controllers/SearchController');

searchRouter.get('/:userId', searchController.getAllProposals);

searchRouter.post('/search/:userId', searchController.searchProposals);

module.exports = searchRouter;


