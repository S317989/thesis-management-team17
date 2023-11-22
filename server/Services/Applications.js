'use strict';
const db = require("../Database/DAO");

module.exports = {
    retrieveKeywordsDetails: async function (proposal_id) {
        const sql = 'SELECT Name FROM Keyword JOIN Proposal_Keywords ON Keyword.Id = Proposal_Keywords.Keyword_Id WHERE Proposal_Keywords.Proposal_Id = ?';
        try {
            await db.getData(sql, [proposal_id]);
        } catch (e) {
            return { status: 500, message: 'Error during keywords retrieving' };
        }
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

    retrieveTeacherInfos: function (teacherId) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM Teacher WHERE Id = ?';

            try {
                db.get(sql, [teacherId], (err, row) => {
                    if (err)
                        return reject({
                            status: 500, message: 'Internal Server Error'
                        });

                    if (row === undefined) return reject({ status: 404, message: 'User not found' });
                    else {
                        const user = {
                            name: row.Name,
                            surname: row.Surname,
                            email: row.Email,
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
                db.getData(sql, async (err, rows) => {
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
                        let proposalInfos = await this.retrieveProposalInfos(element.Proposal_Id);
                        let proposalKeywords = await this.retrieveKeywordsDetails(element.Proposal_Id);
                        let teacherInfos = await this.retrieveTeacherInfos(proposalInfos.supervisor);

                        const application = {
                            proposal_id: element.Proposal_Id,
                            proposal_title: proposalInfos.title,
                            proposal_supervisor_name: teacherInfos.name,
                            proposal_supervisor_surname: teacherInfos.surname,
                            proposal_supervisor_email: teacherInfos.email,
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
            const sql = 'SELECT * FROM Application WHERE Student_Id = ? GROUP BY Proposal_Id';
            try {
                db.getData(sql, [studentId], async (err, rows) => {
                    if (err)
                        return reject({
                            status: 500, message: 'Internal Server Error'
                        });

                    if (!rows || rows.length === 0) {
                        return reject({ status: 404, message: 'Applications not found' });
                    }

                    const applications = await Promise.all(rows.map(async (element) => {
                        let proposalInfos = await this.retrieveProposalInfos(element.Proposal_Id);
                        let proposalKeywords = await this.retrieveKeywordsDetails(element.Proposal_Id);
                        let teacherInfos = await this.retrieveTeacherInfos(proposalInfos.supervisor);

                        const application = {
                            proposal_id: element.Proposal_Id,
                            proposal_title: proposalInfos.title,
                            proposal_supervisor_name: teacherInfos.name,
                            proposal_supervisor_surname: teacherInfos.surname,
                            proposal_supervisor_email: teacherInfos.email,
                            proposal_keywords: proposalKeywords,
                            proposal_type: proposalInfos.type,
                            proposal_description: proposalInfos.description,
                            proposal_requiredKnowledge: proposalInfos.requiredKnowledge,
                            proposal_notes: proposalInfos.notes,
                            proposal_expiration: proposalInfos.expiration,
                            proposal_level: proposalInfos.level,
                            proposal_archived: proposalInfos.archived,
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

    createApplication: function (proposalId, studentId) {
        return new Promise((resolve, reject) => {
            try {
                console.log(proposalId, studentId);
                db.run(`INSERT INTO Thesis_Applications (Th_Proposal_Id, Student_Id, Status)
                                       VALUES (?, ?, "Pending")`, [proposalId, studentId], (err) => {
                    if (err) reject(err);
                    resolve();
                });
            } catch (error) {
                reject(error);
            }
        });
    },

    acceptApplication: function (reqBody) {
        return new Promise((resolve, reject) => {
            try {
                db.run(`UPDATE Thesis_Applications
                        SET Status = "Accepted", Progress = "Active"
                        WHERE Th_Proposal_Id = $proposalId AND Student_Id = $studentId;
                        
                        UPDATE Thesis_Applications
                        SET Status = "Rejected"
                        WHERE (Th_Proposal_Id = $proposalId AND Student_Id != $studentId) OR (Th_Proposal_Id != $proposalId AND Student_Id = $studentId)`,
                    {
                        $proposalId: reqBody.roposalId,
                        $studentId: reqBody.studentId
                    }, (err) => {
                        if (err) reject(err);
                        resolve();
                    });
            } catch (error) {
                reject(error);
            }
        });
    },


    rejectApplication: function (reqBody) {
        return new Promise((resolve, reject) => {
            try {
                db.run(`UPDATE Thesis_Applications
                        SET Status = "Accepted", Progress = "Rejected"
                        WHERE Th_Proposal_Id = $proposalId AND Student_Id = $studentId`,
                    {
                        $proposalId: reqBody.roposalId,
                        $studentId: reqBody.studentId
                    }, (err) => {
                        if (err) reject(err);
                        resolve();
                    });
            } catch (error) {
                reject(error);
            }
        });
    }
}
