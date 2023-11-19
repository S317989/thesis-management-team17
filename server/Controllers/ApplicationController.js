'use strict';

const passport = require('passport');
const Application = require('../Models/Application');

module.exports = {
    /** Get(/login) and Get(/login/callback) are in index.js due to some problem with routes */

    getAllApplications: (req, res) => {
        Application.getAllApplications().then((applications) => {
            return res.status(200).json(applications);
        }).catch((err) => {
            return res.status(err.status).json({ message: err.message }).end()
        });
    },

    acceptApplication: (req, res) => {
        if (!req.isAuthenticated() || !req.user.role === 'Teacher')
            return res.status(401).json({ message: 'Unauthorized' }).end();

        Application.acceptApplication(req.params.id).then((application) => {
            return res.status(200).json(application);
        }).catch((err) => {
            return res.status(err.status).json({ message: err.message }).end()
        });
    },

    rejectApplication: (req, res) => {
        if (!req.isAuthenticated() || !req.user.role === 'Teacher')
            return res.status(401).json({ message: 'Unauthorized' }).end();

        Application.rejectApplication(req.params.id).then((application) => {
            return res.status(200).json(application);
        }).catch((err) => {
            return res.status(err.status).json({ message: err.message }).end()
        });
    }
}