'use strict';

const passport = require('passport');
const configDAO = require("../Models/Config");

module.exports = {
    getConfig: (req, res) => {
        configDAO.getConfig().then((configs) => {
            res.status(200).json(configs);
        }).catch((err) => {
            return res.status(err.status).json({ message: err.message }).end()
        });
    },
};

