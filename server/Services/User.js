'use strict';

/**
 * DAO for User table
 * */

const sqlite = require('sqlite3');
const { get } = require('../Router/RouterTest');

// Open the database connection
const db = new sqlite.Database('./Database/DB.sqlite', (err) => {
    if (err) console.error(err.message);
    console.log('User DAO ready.');
});

module.exports = {
    getStudentInfos: function (id) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM Student WHERE Id = ?';
            try {
                db.get(sql, [id], (err, row) => {
                    if (err)
                        return reject({
                            status: 500, message: 'Internal Server Error'
                        });

                    if (row === undefined) return reject({ status: 404, message: 'Student not found' });
                    else {
                        const studentInfos = {
                            id: row.Id,
                            surname: row.Surname,
                            name: row.Name,
                            gender: row.Gender,
                            nationality: row.Nationality,
                            email: row.Email,
                            cod_degree: row.Cod_Degree,
                            enrollment_year: row.Enrollment_Year,
                            role: 'Student'
                        };

                        return resolve(studentInfos);
                    }
                });
            } catch (e) {
                return reject({ status: 500, message: 'Error during student info retrieving' });
            }
        })
    },

    getTeacherInfos: function (id) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM Teacher WHERE Id = ?';
            try {
                db.get(sql, [id], (err, row) => {
                    if (err)
                        return reject({
                            status: 500, message: 'Internal Server Error'
                        });

                    if (row === undefined) return reject({ status: 404, message: 'Teacher not found' });
                    else {
                        const teacherInfos = {
                            id: row.Id,
                            surname: row.Surname,
                            name: row.Name,
                            email: row.Email,
                            cod_group: row.Cod_Group,
                            cod_department: row.Cod_Department,
                            role: 'Teacher'
                        };

                        return resolve(teacherInfos);
                    }
                });
            } catch (e) {
                return reject({ status: 500, message: 'Error during teacher infos retrieving' });
            }
        })
    },

    getUserById: function (id) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM User WHERE Id = ?';
            try {
                db.get(sql, [id], async (err, row) => {
                    if (err)
                        return reject({
                            status: 500, message: 'Internal Server Error'
                        });

                    if (row === undefined) return reject({ status: 404, message: 'User not found' });
                    else {
                        const userInfos =
                            row.Role === 'Student'
                                ? await this.getStudentInfos(row.Id)
                                : await this.getTeacherInfos(row.Id);

                        resolve(userInfos);
                    }
                });
            } catch (e) {
                return reject({ status: 500, message: 'Error during user infos retrieving' });
            }
        });
    }
};