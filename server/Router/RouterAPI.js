const express = require('express');
const apiRouter = express.Router();

apiRouter.use('/test', require('./RouterTest'));


module.exports = apiRouter;