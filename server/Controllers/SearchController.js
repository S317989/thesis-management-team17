'use strict'

const searchDAO = require("../Models/Search");

module.exports = {
    getAllProposals: function(req, res) {
        const  userId  = req.params.userID;

        searchDAO.getAllProposals(userId).then((proposals) =>  {
            return res.status(200).json(proposals);
        }).catch((err) => {
            return res.status(err.status).json({message: err.message}).end()
        });
    },

    searchProposals: function(req, res) {

        console.log("inside controller");
        const userId  = req.params.userID; 
        const searchTerm = req.params.searchTerm;

        
        searchDAO.searchProposals(userId, searchTerm).then((proposals) =>  {
            
            return res.status(200).json(proposals);
        }).catch((err) => {
            return res.status(err.status).json({message: err.message}).end()
        });
    },
};
