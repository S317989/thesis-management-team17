'use strict';
const db = require("../Database/DAO");

module.exports = {
    /* 
        I AM ONLY RETURNING BASIC INFOS.
        FOR MORE INFO ABOUT THE STUDENT/PROPOSAL THE USER WILL CLICK ANOTHER
        BUTTON TO SHOW MORE, AND IT WILL BE MADE ANOTHER REQUEST TO BRING PROPOSAL/STUDENT DATA
    */
    getAllApplications: async function () {
        return await db.getData(`SELECT A.Application_Id, A.Student_Id, S.Surname|| " " || S.name AS StudentName,
                            A.Proposal_Id, P.Title, T.Surname|| " " || T.name AS Supervisor, A.date, A.Status
                            FROM Application AS A, Student AS S,  Proposal AS P, Teacher AS T
                            WHERE A.Student_Id = S.Id AND A.Proposal_Id = P.Id AND T.Id = P.Supervisor`, []);
    },

    getStudentApplications: async function (studentId) {
        return await db.getData(`SELECT A.Application_Id, A.Student_Id, S.Surname|| " " || S.name AS StudentName,
                                A.Proposal_Id, P.Title, T.Surname|| " " || T.name AS Supervisor, A.date, A.Status
                                FROM Application AS A, Student AS S,  Proposal AS P, Teacher AS T
                                WHERE A.Student_Id = S.Id AND A.Proposal_Id = P.Id AND T.Id = P.Supervisor
                                AND A.Student_Id = ?`, [studentId]);
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

    acceptApplication: async function (proposalId, studentId) {
        await db.executeQuery(`UPDATE Application
                                SET Status = "Accepted"
                                WHERE Proposal_Id = $proposalId AND Student_Id = $studentId;`,
            {
                $proposalId: proposalId,
                $studentId: studentId
            });
        await db.executeQuery(`UPDATE Application
                                SET Status = "Rejected"
                                WHERE Proposal_Id != $proposalId AND Student_Id = $studentId;`,
            {
                $proposalId: proposalId,
                $studentId: studentId
            });
        await db.executeQuery(`UPDATE Application
                                SET Status = "Canceled"
                                WHERE Proposal_Id = $proposalId AND Student_Id != $studentId;`,
            {
                $proposalId: proposalId,
                $studentId: studentId
            });
        await db.executeQuery(`UPDATE Proposal
                                SET Archived = 1
                                WHERE Id = $proposalId;`,
            {
                $proposalId: proposalId
            });
    },

    rejectApplication: async function (proposalId, studentId) {
        await db.executeQuery(`UPDATE Application
                        SET Status = "Rejected"
                        WHERE Proposal_Id = $proposalId AND Student_Id = $studentId`,
            {
                $proposalId: proposalId,
                $studentId: studentId
            });
    }
}
