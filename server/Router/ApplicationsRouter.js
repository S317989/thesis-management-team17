const express = require('express');
const applicationsController = require('../Controllers/ApplicationsController');

const applicationsRouter = express.Router();

// applicationsRouter.get('/all', applicationsController.getAllApplications);

//student only
applicationsRouter.get('/mine', applicationsController.getStudentApplications);
applicationsRouter.post('/apply', applicationsController.createApplication);

//teacher only routes
applicationsRouter.post('/accept', applicationsController.acceptApplication);
applicationsRouter.post('/reject', applicationsController.rejectApplication);

module.exports = applicationsRouter;