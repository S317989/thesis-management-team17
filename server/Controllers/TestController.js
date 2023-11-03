'use strict';

const passport = require('passport');
const test = require("../Models/Test");

module.exports = {
    getTest: (req, res) => {
        test.getTest();
    },
    postTest: (req, res) => {
        test.postTest(req.body.test);
    }
};

