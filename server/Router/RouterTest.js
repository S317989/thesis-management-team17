const express = require('express');
const testRouter = express.Router();

const testController = require('../Controllers/TestController');

testRouter.get('/', testController.getTest);

testRouter.post('/', testController.postTest);

module.exports = testRouter;