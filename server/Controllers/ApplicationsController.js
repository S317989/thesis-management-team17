'use strict';

const applicationsServices = require('../Services/Applications');

module.exports = {
    /** Get(/login) and Get(/login/callback) are in index.js due to some problem with routes */

    getAllApplications: (req, res) => {
        applicationsServices.getAllApplications().then((applications) => {
            return res.status(200).json(applications);
        }).catch((err) => {
            return res.status(500).json({ message: err.message }).end()
        });
    },

    getStudentApplications: (req, res) => {
        applicationsServices.getStudentApplications(req.user.id).then((applications) => {
            return res.status(200).json(applications);
        }).catch((err) => {
            return res.status(500).json({ message: err.message }).end()
        });
    },

    createApplication: async function (req, res) {
        applicationsServices.createApplication(req.body.proposalId, req.user.studentId).then((applicationAdded) => {
            if (!applicationAdded) return res.status(400).json({ message: "The student has pending or accepted application" });
            return res.status(200).json({ message: 'application added' });
        }).catch((err) => {
            return res.status(500).json({ message: err.message }).end()
        });
    },

    acceptApplication: async function (req, res) {
        try {
            await applicationsServices.acceptApplication(req.body.proposalId, req.body.studentId);
            return res.status(200).json({ message: "application accepted" });
        } catch (err) {
            
            return res.status(500).json({ errorMessage: err });
        }
    },

    rejectApplication: async function (req, res) {
        try {
            await applicationsServices.rejectApplication(req.body.proposalId, req.body.studentId);
            return res.status(200).json({ message: "application rejected successfully!" });
        } catch (err) {
            
            return res.status(500).json({ errorMessage: err });
        }
    },
}