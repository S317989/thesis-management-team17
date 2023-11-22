'use strict';

const applicationsServices = require('../Services/Applications');

module.exports = {
    /** Get(/login) and Get(/login/callback) are in index.js due to some problem with routes */

    getAllApplications: (req, res) => {
        applicationsServices.getAllApplications().then((applications) => {
            return res.status(200).json(applications);
        }).catch((err) => {
            return res.status(err.status).json({ message: err.message }).end()
        });
    },

    getStudentApplications: (req, res) => {
        if (!req.isAuthenticated() || !req.user.role === 'Student')
            return res.status(401).json({ message: 'Unauthorized' }).end();

        applicationsServices.getStudentApplications(req.user.id).then((applications) => {
            return res.status(200).json(applications);
        }).catch((err) => {
            return res.status(err.status).json({ message: err.message }).end()
        });
    },

    createApplication: async function (req, res) {
        try {
            if (req.isAuthenticated() && req.user.role === 'Student') {
                console.log(req.body);
                await applicationsServices.createApplication(req.body.proposalId, req.user.id);
                return res.status(200).json({ Message: 'Application Added' });
            }
            else {
                return res.status(401).json({ errorMessage: 'Unauthorized' });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ errorMessage: err });
        }
    },

    acceptApplication: async function (req, res) {
        try {
            if (req.isAuthenticated() && req.user.role !== 'Student') {
                await applicationsServices.acceptApplication(req.body);
                return res.status(200).json({ message: "application accepted" });
            }
            else {
                return res.status(401).json({ errorMessage: 'Unauthorized' });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ errorMessage: err });
        }
    },

    rejectApplication: async function (req, res) {
        try {
            if (req.isAuthenticated() && req.user.role !== 'Student') {
                await applicationsServices.rejectApplication(req.body);
                return res.status(200).json({ message: "application rejected successfully!" });
            }
            else {
                return res.status(401).json({ errorMessage: 'Unauthorized' });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ errorMessage: err });
        }
    },
}