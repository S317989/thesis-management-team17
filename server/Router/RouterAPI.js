const express = require('express');
const apiRouter = express.Router();

apiRouter.use('/test', require('./RouterTest'));

apiRouter.use('/auth', require('./RouterAuth'));

apiRouter.use('/thesis/newproposal', require('./ProposalRouter'));

// All the routes will be protected by the checkAuthentication middleware
const checkAuthentication = (req, res, next) => {
    req.isAuthenticated() ? next() : res.status(401).json({ errorMessage: 'Unauthorized' });
}

apiRouter.use((req, res, next) => {
    checkAuthentication(req, res, next);
});

module.exports = apiRouter;