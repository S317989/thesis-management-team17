const express = require('express');
const thesisController = require('../Controllers/ThesisController');

const thesisRouter = express.Router();

thesisRouter.get('/:thesisId', thesisController.getThesis);
thesisRouter.post('/edit', thesisController.addOrUpdateThesisRequest);

//STUDENT ONLY ROUTES
thesisRouter.get('/current-student', thesisController.getThesisByStudent);

//TEACHER ONLY ROUTES
thesisRouter.get('/current-supervisor', thesisController.getThesisBySupervisor);
thesisRouter.get('/current-cosupervisor', thesisController.getThesisByCosupervisor);
thesisRouter.post('/set-status', thesisController.setThesisRequestStatus)
thesisRouter.delete('/delete', thesisController.deleteThesisRequest); 

module.exports = thesisRouter;