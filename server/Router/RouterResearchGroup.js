const express = require('express');
const rgroupRouter = express.Router();

const groupsController = require('../Controllers/ResearchGroupController');


rgroupRouter.get('/get-all', groupsController.getAllGroups); 


module.exports = rgroupRouter;