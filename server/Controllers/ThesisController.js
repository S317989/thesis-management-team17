'use strict';

const thesisServices = require('../Services/Thesis');

module.exports = {
    addOrUpdateThesisRequest: async function (req, res) {
        await thesisServices
            .addOrUpdateThesisRequest(req.body)
            .then((thesis) => {
                return res.status(200).json(thesis);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({ message: err.message });
            });
    },

    deleteThesisRequest: async function (req, res) {
        await thesisServices
            .deleteThesisRequest(req.body.thesisId)
            .then(() => {
                return res.status(200).json('deleted');
            })
            .catch((err) => {
                return res.status(500).json({ message: err.message });
            });
    },

    setThesisRequestStatus: async function (req, res) {
        await thesisServices
            .setThesisRequestStatus(req.body.thesisId, req.body.status)
            .then(() => {
                return res.status(200).json('status updated');
            })
            .catch((err) => {
                return res.status(500).json({ message: err.message });
            });
    },

    getThesis: async function (req, res) {
        try {
            const results = await thesisServices.getThesis(req.params.thesisId);
            return res.status(200).json(results);
        } catch (error) {
            return res.status(500);
        }
    },

    getThesisByStudent: async function (req, res) {
        console.log('reached');
        try {
            const results = await thesisServices.getThesisByStudent('319976');
            return res.status(200).json(results);
        } catch (error) {
            return res.status(500);
        }
    },

    getThesisBySupervisor: async function (req, res) {
        try {
            const results = await thesisServices.getThesisBySupervisor(req.user.id);
            return res.status(200).json(results);
        } catch (error) {
            return res.status(500);
        }
    },

    getThesisByCosupervisor: async function (req, res) {
        try {
            const results = await thesisServices.getThesisByCosupervisor(req.user.id);
            return res.status(200).json(results);
        } catch (error) {
            return res.status(500);
        }
    },


};
