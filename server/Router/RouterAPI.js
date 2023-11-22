const express = require('express');
const apiRouter = express.Router();

apiRouter.use('/proposals', require('./ProposalsRouter'));
apiRouter.use('/applications', require('./ApplicationsRouter'));
apiRouter.use('/auth', require('./AuthRouter'));
apiRouter.use('/utilities', require('./UtilitiesRouter'));

// All the routes will be protected by the checkAuthentication middleware
const checkAuthentication = (req, res, next) => {
    req.isAuthenticated() ? next() : res.status(401).json({ errorMessage: 'Unauthorized' });
}

apiRouter.use((req, res, next) => {
    checkAuthentication(req, res, next);
});

module.exports = apiRouter;