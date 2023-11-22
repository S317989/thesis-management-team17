'use strict';
const db = require("../Database/DAO");

module.exports = {
  getAllProposals: function (userId) {
    return new Promise((resolve, reject) => {
      const sql = `
            SELECT
                Proposal.Id AS ProposalId,
                Proposal.Title,
                Proposal.Supervisor,
                Proposal.Type,
                Proposal.Description,
                Proposal.Required_Knowledge,
                Proposal.Notes,
                Proposal.Expiration,
                Proposal.Level,
                Proposal.Archived,
                Proposal_Degrees.Degree_Id,
                Keyword.Name AS KeywordName,
                Teacher.Surname AS SupervisorSurname,
                Teacher.Name AS SupervisorName,
                Teacher.Email AS SupervisorEmail
            FROM
                Proposal
            JOIN Proposal_Degrees ON Proposal.Id = Proposal_Degrees.Proposal_Id
            JOIN Teacher ON Proposal.Supervisor = Teacher.Id
            JOIN Student ON Proposal_Degrees.Degree_Id = Student.Cod_Degree
            LEFT JOIN Proposal_Keywords ON Proposal.Id = Proposal_Keywords.Proposal_Id
            LEFT JOIN Keyword ON Proposal_Keywords.Keyword_Id = Keyword.Id
            WHERE Proposal.Archived = 0 and Student.Id= ?
        `;

      db.all(sql, [userId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  searchProposals: function (userId, searchTerm) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT
            Proposal.Id AS ProposalId,
            Proposal.Title,
            Proposal.Supervisor,
            Proposal.Type,
            Proposal.Description,
            Proposal.Required_Knowledge,
            Proposal.Notes,
            Proposal.Expiration,
            Proposal.Level,
            Proposal.Archived,
            Proposal_Degrees.Degree_Id,
            Keyword.Name AS KeywordName,
            Teacher.Surname AS SupervisorSurname,
            Teacher.Name AS SupervisorName,
            Teacher.Email AS SupervisorEmail
        FROM
        Proposal
        JOIN Proposal_Degrees ON Proposal.Id = Proposal_Degrees.Proposal_Id
        JOIN Teacher ON Proposal.Supervisor = Teacher.Id
        JOIN Student ON Proposal_Degrees.Degree_Id = Student.Cod_Degree
        LEFT JOIN Proposal_Keywords ON Proposal.Id = Proposal_Keywords.Proposal_Id
        LEFT JOIN Keyword ON Proposal_Keywords.Keyword_Id = Keyword.Id
        WHERE Proposal.Archived = 0 and Student.Id= ?
        AND (
            Proposal.Title LIKE ?
            OR Proposal.Description LIKE ?
            OR Proposal.Required_Knowledge LIKE ?
            OR Proposal.Notes LIKE ?
            OR Keyword.Name LIKE ?
            OR Teacher.Surname LIKE ?
            OR Teacher.Name LIKE ?
            OR Teacher.Email LIKE ?
            OR Proposal.Type LIKE ?
        );
            `;

      const params = Array(9).fill(`%${searchTerm}%`);

      db.all(sql, [userId, ...params], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  createThesisProposal: function (title, supervisor, cosup, groups, keywords, type, description, knowledge, notes, expiration, level, cds) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO Thesis_Proposal(Title, Supervisor, CoSupervisor, Groups, Keywords, Type, Description, Required_Knowledge, Notes, Expiration, Level, CDS) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      // 
      db.run(sql, [title, supervisor, cosup, groups, keywords, type, description, knowledge, notes, expiration, level, cds], function (err) {
        if (err) {
          console.log(err)
          reject(err);
          return;
        }
        resolve(this.lastID); //returns last id element created
      });
    });
  },


};
