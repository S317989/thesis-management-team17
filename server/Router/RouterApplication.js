const express = require('express');
const applicationRouter = express.Router();

const applicationController = require('../Controllers/ApplicationController');

/** Get(/login) and Get(/login/callback) are in index.js due to some problem with routes */

applicationRouter.get('/retrieve-all', applicationController.getAllApplications);

module.exports = applicationRouter;