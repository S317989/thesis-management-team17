const express = require('express');
const authRouter = express.Router();

const authController = require('../Controllers/AuthenticationController');

authRouter.get('/session', authController.session);

module.exports = authRouter;