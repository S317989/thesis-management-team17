'use strict';

/**
 * DAO for Thesis_Proposal table
 * */

const sqlite = require('sqlite3');
//const { get } = require('../Router/RouterTest');

// Open the database connection
const db = new sqlite.Database('./Database/DB.sqlite', (err) => {
    if (err) console.error(err.message);
    console.log('User DAO ready.');
});

// create new service
exports.createThesisProposal = (title, supervisor, cosup, groups, keywords) => {
  
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO Services(Name, AverageServiceTime) VALUES(?, ?)';  
      // 
      db.run(sql, [name, ast], function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.lastID); //returns last id element
      });
    });
  };