const express = require('express');
const apiRouter = express.Router();

apiRouter.use('/test', require('./RouterTest'));

apiRouter.use('/config', require('./RouterConfig'));

module.exports = apiRouter;