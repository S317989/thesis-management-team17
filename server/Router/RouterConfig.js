const express = require('express');
const configRouter = express.Router();

const configController = require('../Controllers/ConfigController');

configRouter.get('/', configController.getConfig);

module.exports = configRouter;