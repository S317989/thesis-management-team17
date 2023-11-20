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

    getStudentApplications: (req, res) => {
        if (!req.isAuthenticated() || !req.user.role === 'Student')
            return res.status(401).json({ message: 'Unauthorized' }).end();

        Application.getStudentApplications(req.params.id).then((applications) => {
            return res.status(200).json(applications);
        }).catch((err) => {
            return res.status(err.status).json({ message: err.message }).end()
        });
    }
}