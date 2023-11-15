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
   
    getAllProposals: function(userId) {
            return new Promise((resolve, reject) => {
                const sql = `
                    SELECT tp.Title, tp.Supervisor
                    FROM Thesis_Proposal tp
                    JOIN Degrees_By_Thesis dbt ON tp.Id = dbt.Th_Proposal_Id
                    JOIN Student s ON s.Cod_Degree = dbt.Cod_Degree
                    WHERE s.Id = ?
                `;    
                db.all(sql, [userId], (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            });
        },

        searchProposals: function(userId, searchTerm) {
            return new Promise((resolve, reject) => {
                const sql = `
                    SELECT tp.Title, tp.Supervisor
                    FROM Thesis_Proposal tp
                    JOIN Degrees_By_Thesis dbt ON tp.Id = dbt.Th_Proposal_Id
                    JOIN Student s ON s.Cod_Degree = dbt.Cod_Degree
                    WHERE s.Id = ? AND (
                        tp.Title LIKE '%' || ? || '%'
                        OR tp.Supervisor LIKE '%' || ? || '%'
                        OR tp.Keywords LIKE '%' || ? || '%'
                        OR tp.Type LIKE '%' || ? || '%'
                        OR tp.Description LIKE '%' || ? || '%'
                        OR tp.Required_Knowledge LIKE '%' || ? || '%'
                        OR tp.Notes LIKE '%' || ? || '%'
                        OR tp.Expiration LIKE '%' || ? || '%'
                        OR tp.Level LIKE '%' || ? || '%'
                        OR tp.CDS LIKE '%' || ? || '%'
                    )
                `;
    
                const params = Array(10).fill(`%${searchTerm}%`);
    
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


