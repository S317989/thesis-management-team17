const express = require('express');
const apiRouter = express.Router();

apiRouter.use('/test', require('./RouterTest'));

apiRouter.use('/auth', require('./RouterAuth'));


module.exports = apiRouter;