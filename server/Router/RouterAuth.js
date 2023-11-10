const express = require('express');
const authRouter = express.Router();

const authController = require('../Controllers/AuthenticationController');

authRouter.post('/login', authController.login);

authRouter.get('/session', authController.session);

authRouter.delete('/logout', authController.logout);

module.exports = authRouter;