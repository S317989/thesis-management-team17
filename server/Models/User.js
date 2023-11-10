'use strict';

/**
 * DAO for User table
 * */

const sqlite = require('sqlite3');

// Open the database connection
const db = new sqlite.Database('./Database/DB.sqlite', (err) => {
    if (err) console.error(err.message);
    console.log('User DAO ready.');
});

module.exports = {
    authentication: function (username, password) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM User WHERE Email = ?';
            db.get(sql, [username], (err, row) => {
                if (err)
                    reject({
                        status: 500, message: 'Internal Server Error'
                    });

                if (row === undefined) reject({ status: 404, message: 'User not found' });
                else {
                    resolve({ id: row.Id, email: row.Email });
                }
            });
        }
        );
    },

    getUserById: function (id) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM User WHERE Id = ?';
            try {
                db.get(sql, [id], (err, row) => {
                    if (err)
                        return reject({
                            status: 500, message: 'Internal Server Error'
                        });

                    if (row === undefined) return reject({ status: 404, message: 'User not found' });
                    else
                        return resolve({ id: row.Id, email: row.Email });
                });
            } catch (e) {
                return reject({ status: 500, message: 'Author not found' });
            }
        });
    },

}