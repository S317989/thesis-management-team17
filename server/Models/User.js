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
    authentication: function (username) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM User WHERE Email = ?';
            db.get(sql, [username], (err, row) => {
                if (err)
                    reject({
                        status: 500, message: 'Internal Server Error'
                    });

                if (row === undefined) reject({ status: 404, message: 'User not found' });
                else {
                    const user = { id: row.id, username: row.username, role: row.role };
                    resolve(user);
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
                        return resolve({ id: row.id, username: row.username, role: row.role });
                });
            } catch (e) {
                return reject({ status: 500, message: 'Author not found' });
            }
        });
    }
    ,

    getUsers: function () {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT Id, Email FROM User';
            db.all(sql, [], (err, rows) => {
                if (err)
                    return reject({
                        status: 500, message: 'Internal Server Error'
                    });
                else {
                    if (rows === undefined) return reject({ status: 404, message: 'Users not found' });
                    else {
                        let users = rows.map((row) => {
                            return { id: row.id, username: row.username };
                        });
                        resolve({ status: 200, users: users });
                    }
                }
            });
        });
    }
}