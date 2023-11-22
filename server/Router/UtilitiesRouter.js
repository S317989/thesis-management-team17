const express = require('express');
const utilitiesController = require('../Controllers/UtilitiesController');

const utilitiesRouter = express.Router();

utilitiesRouter.get('/cosupervisors', utilitiesController.getAllCoSup); 
utilitiesRouter.get('/degrees', utilitiesController.getAllCds); 
utilitiesRouter.get('/groups', utilitiesController.getAllGroups); 
utilitiesRouter.get('/teachers', utilitiesController.getAllTeacher); 

module.exports = utilitiesRouter;