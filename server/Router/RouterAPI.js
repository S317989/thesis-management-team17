const express = require('express');
const apiRouter = express.Router();

apiRouter.use('/test', require('./RouterTest'));

apiRouter.use('/proposals', require('./RouterSearch'));


module.exports = apiRouter;