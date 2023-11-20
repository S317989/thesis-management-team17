'use strict';

/**
 * DAO for Application table
 * */

const sqlite = require('sqlite3');

// Open the database connection
const db = new sqlite.Database('./Database/DB.sqlite', (err) => {
    if (err) console.error(err.message);
    console.log('Application DAO ready.');
});

module.exports = {
    retrieveProposalInfos: function (proposalId) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM Thesis_Proposal WHERE Id = ?';
            try {
                db.get(sql, [proposalId], (err, row) => {
                    if (err)
                        return reject({
                            status: 500, message: 'Internal Server Error'
                        });

                    if (row === undefined) return reject({ status: 404, message: 'Proposal not found' });
                    else {
                        const proposal = {
                            title: row.Title,
                            supervisor: row.Supervisor,
                            keywords: row.Keywords,
                            type: row.Type,
                            description: row.Description,
                            requiredKnowledge: row.Required_Knowledge,
                            notes: row.Notes,
                            expiration: row.Expiration,
                            level: row.Level
                        };
                        return resolve(proposal);
                    }
                });
            } catch (e) {
                return reject({ status: 500, message: 'Error during proposal infos retrieving' });
            }
        })
    },

    retrieveStudentDegree: function (degreeId) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT Title_Degree FROM Degree WHERE Cod_Degree = ?';
            try {
                db.get(sql, [degreeId], (err, row) => {
                    if (err)
                        return reject({
                            status: 500, message: 'Internal Server Error'
                        });

                    if (row === undefined) return reject({ status: 404, message: 'Degree not found' });
                    else {
                        const degree = {
                            degree: row.Title_Degree
                        };
                        return resolve(degree);
                    }
                });
            } catch (e) {
                return reject({ status: 500, message: 'Error during degree infos retrieving' });
            }
        })
    },

    retrieveStudentInfos: function (studentId) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM Student WHERE Id = ?';

            try {
                db.get(sql, [studentId], (err, row) => {
                    if (err)
                        return reject({
                            status: 500, message: 'Internal Server Error'
                        });

                    if (row === undefined) return reject({ status: 404, message: 'User not found' });
                    else {
                        const user = {
                            name: row.Name,
                            surname: row.Surname,
                            gender: row.Gender,
                            nationality: row.Nationality,
                            email: row.Email,
                            cod_degree: row.Cod_Degree,
                            year: row.Enrollment_Year
                        }
                        return resolve(user);
                    }
                });
            } catch (e) {
                return reject({ status: 500, message: 'Error during user infos retrieving' });
            }
        });
    },

    getAllApplications: function () {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM Thesis_Applications';
            try {
                db.all(sql, async (err, rows) => {
                    if (err)
                        return reject({
                            status: 500, message: 'Internal Server Error'
                        });

                    if (!rows || rows.length === 0) {
                        return reject({ status: 404, message: 'Applications not found' });
                    }

                    const applications = await Promise.all(rows.map(async (element) => {
                        let studentInfos = await this.retrieveStudentInfos(element.Student_Id);
                        let studentDegree = await this.retrieveStudentDegree(studentInfos.cod_degree);
                        let proposalInfos = await this.retrieveProposalInfos(element.Th_Proposal_Id);

                        const application = {
                            proposal_id: element.Th_Proposal_Id,
                            proposal_title: proposalInfos.title,
                            proposal_supervisor: proposalInfos.supervisor,
                            proposal_keywords: proposalInfos.keywords,
                            proposal_type: proposalInfos.type,
                            proposal_description: proposalInfos.description,
                            proposal_requiredKnowledge: proposalInfos.requiredKnowledge,
                            proposal_notes: proposalInfos.notes,
                            proposal_expiration: proposalInfos.expiration,
                            proposal_level: proposalInfos.level,
                            student_id: element.Student_Id,
                            student_surname: studentInfos.surname,
                            student_name: studentInfos.name,
                            student_gender: studentInfos.gender,
                            student_nationality: studentInfos.nationality,
                            student_email: studentInfos.email,
                            student_degree: studentDegree.degree,
                            student_year: studentInfos.year,
                            status: element.Status,
                        };

                        return application;
                    }));

                    return resolve({ status: 200, applications: applications });
                });
            } catch (e) {
                return reject({ status: 500, message: 'Error during applications retrieving' });
            }
        })
    },

    getStudentApplications: function (studentId) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM Thesis_Applications WHERE Student_Id = ?';
            try {
                db.all(sql, [studentId], async (err, rows) => {
                    if (err)
                        return reject({
                            status: 500, message: 'Internal Server Error'
                        });

                    if (!rows || rows.length === 0) {
                        return reject({ status: 404, message: 'Applications not found' });
                    }

                    const applications = await Promise.all(rows.map(async (element) => {
                        let proposalInfos = await this.retrieveProposalInfos(element.Th_Proposal_Id);

                        const application = {
                            proposal_id: element.Th_Proposal_Id,
                            proposal_title: proposalInfos.title,
                            proposal_supervisor: proposalInfos.supervisor,
                            proposal_keywords: proposalInfos.keywords,
                            proposal_type: proposalInfos.type,
                            proposal_description: proposalInfos.description,
                            proposal_requiredKnowledge: proposalInfos.requiredKnowledge,
                            proposal_notes: proposalInfos.notes,
                            proposal_expiration: proposalInfos.expiration,
                            proposal_level: proposalInfos.level,
                            student_id: element.Student_Id,
                            status: element.Status,
                        };

                        return application;
                    }));

                    return resolve({ status: 200, applications: applications });
                });
            } catch (e) {
                return reject({ status: 500, message: 'Error during applications retrieving' });
            }
        })
    },
}
