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
    retrieveKeywordsDetails: function (proposal_id) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM Proposal_Keywords JOIN Keyword ON Proposal_Keywords.Keyword_Id = Keyword.Id WHERE Proposal_Keywords.Proposal_Id = ?';
            try {
                db.all(sql, [proposal_id], (err, rows) => {
                    if (err)
                        return reject({
                            status: 500, message: 'Internal Server Error'
                        });

                    if (!rows || rows.length === 0) {
                        return reject({ status: 404, message: 'Keywords not found' });
                    }

                    const keywords = rows.map((element) => {
                        return element.Keyword;
                    });

                    return resolve(keywords);
                });
            } catch (e) {
                return reject({ status: 500, message: 'Error during keywords retrieving' });
            }
        })
    },

    retrieveProposalInfos: function (proposalId) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM Proposal WHERE Id = ?';
            try {
                db.get(sql, [proposalId], async (err, row) => {
                    if (err)
                        return reject({
                            status: 500, message: 'Internal Server Error'
                        });

                    const keywordsInfos = await this.retrieveKeywordsDetails(proposalId);

                    if (row === undefined) return reject({ status: 404, message: 'Proposal not found' });
                    else {
                        const proposal = {
                            title: row.Title,
                            supervisor: row.Supervisor,
                            keywords: keywordsInfos,
                            type: row.Type,
                            description: row.Description,
                            requiredKnowledge: row.Required_Knowledge,
                            notes: row.Notes,
                            expiration: row.Expiration,
                            level: row.Level,
                            archived: row.Archived,
                            degree: row.Cod_Degree
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
                            surname: row.Surname,
                            name: row.Name,
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
            const sql = 'SELECT * FROM Application';
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
                        let proposalKeywords = await this.retrieveKeywordsDetails(element.Th_Proposal_Id);

                        const application = {
                            proposal_id: element.Th_Proposal_Id,
                            proposal_title: proposalInfos.title,
                            proposal_supervisor: proposalInfos.supervisor,
                            proposal_keywords: proposalKeywords,
                            proposal_type: proposalInfos.type,
                            proposal_description: proposalInfos.description,
                            proposal_requiredKnowledge: proposalInfos.requiredKnowledge,
                            proposal_notes: proposalInfos.notes,
                            proposal_expiration: proposalInfos.expiration,
                            proposal_level: proposalInfos.level,
                            proposal_archived: proposalInfos.archived,
                            proposal_degree: proposalInfos.degree,
                            student_id: element.Student_Id,
                            student_surname: studentInfos.surname,
                            student_name: studentInfos.name,
                            student_gender: studentInfos.gender,
                            student_nationality: studentInfos.nationality,
                            student_email: studentInfos.email,
                            student_degree: studentDegree.degree,
                            student_year: studentInfos.year,
                            status: element.Status,
                            date: element.Date
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
            const sql = 'SELECT * FROM Application WHERE Student_Id = ?';
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
                        let proposalKeywords = await this.retrieveKeywordsDetails(element.Th_Proposal_Id);

                        const application = {
                            proposal_id: element.Th_Proposal_Id,
                            proposal_title: proposalInfos.title,
                            proposal_supervisor: proposalInfos.supervisor,
                            proposal_keywords: proposalKeywords,
                            proposal_type: proposalInfos.type,
                            proposal_description: proposalInfos.description,
                            proposal_requiredKnowledge: proposalInfos.requiredKnowledge,
                            proposal_notes: proposalInfos.notes,
                            proposal_expiration: proposalInfos.expiration,
                            proposal_level: proposalInfos.level,
                            proposal_archived: proposalInfos.archived,
                            proposal_degree: proposalInfos.degree,
                            student_id: element.Student_Id,
                            status: element.Status,
                            date: element.Date
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
