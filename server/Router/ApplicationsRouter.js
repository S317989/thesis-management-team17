const express = require('express');
const applicationsController = require('../Controllers/ApplicationsController');

const applicationsRouter = express.Router();

applicationsRouter.get('/retrieve-all', applicationsController.getAllApplications);
applicationsRouter.get('/retrieve-my-all/', applicationsController.getStudentApplications);
applicationsRouter.post('/apply', applicationsController.createApplication);
applicationsRouter.get('/accept', applicationsController.acceptApplication);
applicationsRouter.get('/reject', applicationsController.rejectApplication);

module.exports = applicationsRouter;