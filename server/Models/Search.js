"use strict";

/**
 * DAO for ThesisProposal table
 * */

const sqlite = require("sqlite3");
//const dayjs = require('dayjs'); 

/// Open the database connection
const db = new sqlite.Database('./Database/DB.sqlite', (err) => {
    if (err) console.error(err.message);
    console.log('Search DAO ready.');
});


module.exports = {
    getAllProposals: function (userId) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT
                    Proposal.Id AS ProposalId,
                    Proposal.Title,
                    Proposal.Supervisor,
                    Proposal.Type,
                    Proposal.Description,
                    Proposal.Required_Knowledge,
                    Proposal.Notes,
                    Proposal.Expiration,
                    Proposal.Level,
                    Proposal.Archived,
                    Proposal_Degrees.Degree_Id,
                    Keyword.Name AS KeywordName,
                    Teacher.Surname AS SupervisorSurname,
                    Teacher.Name AS SupervisorName,
                    Teacher.Email AS SupervisorEmail
                FROM
                    Proposal
                JOIN Proposal_Degrees ON Proposal.Id = Proposal_Degrees.Proposal_Id
                JOIN Teacher ON Proposal.Supervisor = Teacher.Id
                JOIN Student ON Proposal_Degrees.Degree_Id = Student.Cod_Degree
                LEFT JOIN Proposal_Keywords ON Proposal.Id = Proposal_Keywords.Proposal_Id
                LEFT JOIN Keyword ON Proposal_Keywords.Keyword_Id = Keyword.Id
                WHERE Proposal.Archived = 0 and Student.Id= ?
            `;

            db.all(sql, [userId],(err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    },

    searchProposals: function (userId, searchTerm) {
        return new Promise((resolve, reject) => {
            const sql = `
            SELECT
                Proposal.Id AS ProposalId,
                Proposal.Title,
                Proposal.Supervisor,
                Proposal.Type,
                Proposal.Description,
                Proposal.Required_Knowledge,
                Proposal.Notes,
                Proposal.Expiration,
                Proposal.Level,
                Proposal.Archived,
                Proposal_Degrees.Degree_Id,
                Keyword.Name AS KeywordName,
                Teacher.Surname AS SupervisorSurname,
                Teacher.Name AS SupervisorName,
                Teacher.Email AS SupervisorEmail
            FROM
            Proposal
            JOIN Proposal_Degrees ON Proposal.Id = Proposal_Degrees.Proposal_Id
            JOIN Teacher ON Proposal.Supervisor = Teacher.Id
            JOIN Student ON Proposal_Degrees.Degree_Id = Student.Cod_Degree
            LEFT JOIN Proposal_Keywords ON Proposal.Id = Proposal_Keywords.Proposal_Id
            LEFT JOIN Keyword ON Proposal_Keywords.Keyword_Id = Keyword.Id
            WHERE Proposal.Archived = 0 and Student.Id= ?
            AND (
                Proposal.Title LIKE ?
                OR Proposal.Description LIKE ?
                OR Proposal.Required_Knowledge LIKE ?
                OR Proposal.Notes LIKE ?
                OR Keyword.Name LIKE ?
                OR Teacher.Surname LIKE ?
                OR Teacher.Name LIKE ?
                OR Teacher.Email LIKE ?
                OR Proposal.Type LIKE ?
            );
                `;

            const params = Array(9).fill(`%${searchTerm}%`);

            db.all(sql, [userId, ...params], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    },


};


