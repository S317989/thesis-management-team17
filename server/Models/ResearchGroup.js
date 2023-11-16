'use strict';

/**
 * DAO for ResearchGroup table
 * */

const sqlite = require('sqlite3');
const { get } = require('../Router/RouterTest');

// Open the database connection
const db = new sqlite.Database('./Database/DB.sqlite', (err) => {
    if (err) console.error(err.message);
    console.log('Research Group DAO ready.');
});


// get all degrees
exports.getAllGroups = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM ResearchGroup';
      db.all(sql, [], (err, rows) => {
        console.log(rows)
        if (err) {
          reject(err);
          return;
        }
        const groupList = rows.map((e) => ({ id: e.Id, name: e.Name }));
        console.log(groupList)
        resolve(groupList);
      });
    });
  };