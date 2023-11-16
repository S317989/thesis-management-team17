'use strict';

/**
 * DAO for Teacher table
 * */

const sqlite = require('sqlite3');
const { get } = require('../Router/RouterTest');

// Open the database connection
const db = new sqlite.Database('./Database/DB.sqlite', (err) => {
    if (err) console.error(err.message);
    console.log('Degree DAO ready.');
});


// get all degrees
exports.getAllDegrees = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Degree';
      db.all(sql, [], (err, rows) => {
        console.log(rows)
        if (err) {
          reject(err);
          return;
        }
        const cdsList = rows.map((e) => ({ id: e.Id, degree: e.Title_Degree }));
        console.log(cdsList)
        resolve(cdsList);
      });
    });
  };