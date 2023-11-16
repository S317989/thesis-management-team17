const express = require('express');
const cosupRouter = express.Router();

const cosupController = require('../Controllers/CoSupervisorController');


cosupRouter.get('/get-all', cosupController.getAllCoSup); 


module.exports = cosupRouter;