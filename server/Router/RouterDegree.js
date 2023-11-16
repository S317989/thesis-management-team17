const express = require('express');
const degreeRouter = express.Router();

const degreeController = require('../Controllers/DegreeController');


degreeRouter.get('/get-all', degreeController.getAllCds); 


module.exports = degreeRouter;