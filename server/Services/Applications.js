'use strict';
const db = require("../Database/DAO");
const ProposalsServices = require('./Proposals');

module.exports = {
    /* 
        I AM ONLY RETURNING BASIC INFOS.
        FOR MORE INFO ABOUT THE STUDENT/PROPOSAL THE USER WILL CLICK ANOTHER
        BUTTON TO SHOW MORE, AND IT WILL BE MADE ANOTHER REQUEST TO BRING PROPOSAL/STUDENT DATA
    */
    getAllApplications: async function () {
        const applications =
            await db.getData(`SELECT A.Application_Id, A.Student_Id, S.Surname|| " " || S.name AS StudentName,
                            A.Proposal_Id, P.Title, T.Surname|| " " || T.name AS Supervisor, A.date, A.Status
                            FROM Application AS A, Student AS S,  Proposal AS P, Teacher AS T
                            WHERE A.Student_Id = S.Id AND A.Proposal_Id = P.Id AND T.Id = P.Supervisor`, []);
        return this.attachProposals(applications);
    },

    getStudentApplications: async function (studentId) {
        const applications =
            await db.getData(`SELECT A.Application_Id, A.Student_Id, S.Surname|| " " || S.name AS StudentName,
                                A.Proposal_Id, P.Title, T.Surname || " " || T.name AS Supervisor, A.date, A.Status
                                FROM Application AS A, Student AS S,  Proposal AS P, Teacher AS T
                                WHERE A.Student_Id = S.Id AND A.Proposal_Id = P.Id AND T.Id = P.Supervisor
                                AND A.Student_Id = ?`, [studentId]);
        return this.attachProposals(applications);
    },

    getApplicationsByTeacherProposals: async function (teacherId) {
        const applications =
            await db.getData(`SELECT A.Application_Id, A.Student_Id, S.Surname|| " " || S.name AS StudentName,
                                A.Proposal_Id, P.Title, T.Surname || " " || T.name AS Supervisor, A.date, A.Status
                                FROM Application AS A, Student AS S,  Proposal AS P, Teacher AS T
                                WHERE A.Student_Id = S.Id AND A.Proposal_Id = P.Id AND T.Id = P.Supervisor
                                AND A.Proposal_Id IN (SELECT  Id FROM Proposal WHERE Supervisor = ?)`, [teacherId]);
        return this.attachProposals(applications);
    },

    attachProposals: async function (applications) {
        for (const a of applications) {
            a.Proposal = await ProposalsServices.getProposal(a.Proposal_Id);
        }
        return applications
    },

    //returns 1 if everything is okay, 0 if failed
    createApplication: async function (proposalId, studentId) {
        //CHECK IF THE STUDENT HAS OTHER APPLICATIONS NOT REJECTED
        const studentApplications = await this.getStudentApplications(studentId);
        for (const a of studentApplications) {
            if (a.Status === 'Pending' || a.Status === 'Accepted' || a.Proposal_Id === proposalId)
                return 0;
        }
        await db.executeQuery(`INSERT INTO Application (Proposal_Id, Student_Id, Status, Date)
                                       VALUES (?, ?, "Pending", CURRENT_TIMESTAMP)`, [proposalId, studentId]);
        return 1;
    },

    acceptApplication: async function (applicationId) {
        await db.executeTransaction(async () => {
            const applicationDetails =
                await db.getOne(`SELECT Proposal_Id, Student_Id FROM Application
                                 WHERE Application_Id = ?`, [applicationId]);
            await db.executeQuery(`UPDATE Application
                                    SET Status = "Accepted"
                                    WHERE Application_Id = ?`, [applicationId]);
            await db.executeQuery(`UPDATE Application
                                    SET Status = "Rejected"
                                    WHERE Proposal_Id != ? AND Student_Id = ?`
                , [applicationDetails.Proposal_Id, applicationDetails.Student_Id]);
            await db.executeQuery(`UPDATE Application
                                    SET Status = "Canceled"
                                    WHERE Proposal_Id = ? AND Student_Id != ?`,
                [applicationDetails.Proposal_Id, applicationDetails.Student_Id]);
            await db.executeQuery(`UPDATE Proposal
                                    SET Archived = 1
                                    WHERE Id = ?;`, [applicationDetails.Proposal_Id]);
        });
    },

    rejectApplication: async function (applicationId) {
        await db.executeQuery(`UPDATE Application
                        SET Status = "Rejected"
                        WHERE Application_Id = ?`, [applicationId]);
    }
}
