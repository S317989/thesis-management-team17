'use strict';

/**
 * DAO for Thesis_Proposal table
 * */

const sqlite = require('sqlite3');
//const { get } = require('../Router/RouterTest');

// Open the database connection
const db = new sqlite.Database('./Database/DB.sqlite', (err) => {
    if (err) console.error(err.message);
    console.log('Thesis proposal DAO ready.');
});

// create new service
exports.createThesisProposal = (title, supervisor, cosup, groups, keywords, type, description, knowledge, notes, expiration, level, cds) => {
  
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO Thesis_Proposal(Title, Supervisor, CoSupervisors, Groups, Keywords, Type, Description, Required_Knowledge, Notes, Expiration, Level, CDS) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';  
      // 
      db.run(sql, [title, supervisor, cosup, groups, keywords, type, description, knowledge, notes, expiration, level, cds], function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.lastID); //returns last id element created
      });
    });
  };