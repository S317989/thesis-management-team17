const express = require('express');
const apiRouter = express.Router();

apiRouter.use('/test', require('./RouterTest'));

apiRouter.use('/proposals', require('./RouterSearch'));

apiRouter.use('/application', require('./RouterApplication'));

apiRouter.use('/auth', require('./RouterAuth'));

apiRouter.use('/thesis', require('./RouterThesis'));

apiRouter.use('/thesis', require('./ProposalRouter'));

apiRouter.use('/degree', require('./RouterDegree'));

apiRouter.use('/teacher', require('./RouterTeacher'));

apiRouter.use('/cosupervisor', require('./RouterCoSupervisor'));

apiRouter.use('/groups', require('./RouterResearchGroup'));


// All the routes will be protected by the checkAuthentication middleware
const checkAuthentication = (req, res, next) => {
    req.isAuthenticated() ? next() : res.status(401).json({ errorMessage: 'Unauthorized' });
}

apiRouter.use((req, res, next) => {
    checkAuthentication(req, res, next);
});

module.exports = apiRouter;