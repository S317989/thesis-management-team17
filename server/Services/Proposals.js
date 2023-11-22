'use strict';
const db = require("../Database/DAO");

module.exports = {
  getAllProposals: async function () {
    var results = await db.getData(`SELECT * FROM Proposal`, []);
    return await this.getProposalsLinkedData(results);
  },

  searchProposals: async function (searchTerm) {
    var results = await db.getData(
      `SELECT *
      FROM Proposal
      WHERE Id IN (
        SELECT ProposalId
        FROM (
          SELECT
          P.Id AS ProposalId,
          P.Title || ' ' || P.Type || ' ' || P.Description || ' ' ||
          COALESCE(P.Required_Knowledge, '') || ' ' ||
          COALESCE(P.Notes, '') || ' ' || T1.Id || ' ' || T1.Surname || ' ' || T1.Name || ' ' || T1.Email
          || ' ' || COALESCE(GROUP_CONCAT(DISTINCT D.Title_Degree) , '')
          || ' ' || COALESCE(GROUP_CONCAT(DISTINCT RG.Name) , '')
          || ' ' || COALESCE(GROUP_CONCAT(DISTINCT T2.Surname), '')
          || ' ' || COALESCE(GROUP_CONCAT(DISTINCT T2.Name), '')
          || ' ' || COALESCE(GROUP_CONCAT(DISTINCT ES.Surname) , '')
          || ' ' || COALESCE(GROUP_CONCAT(DISTINCT ES.Name) , '')
          || ' ' || COALESCE(GROUP_CONCAT(DISTINCT K.Name), '') AS SearchableFormat
          FROM
          Proposal P
          JOIN Teacher T1 ON P.Supervisor = T1.Id
          LEFT JOIN Proposal_Degrees PD ON P.Id = PD.Proposal_Id
          LEFT JOIN Degree D ON PD.Degree_Id = D.Cod_Degree
          LEFT JOIN Proposal_Groups PG ON P.Id = PG.Proposal_Id
          LEFT JOIN ResearchGroup RG ON PG.Group_Id = RG.Id
          LEFT JOIN Proposal_Internal_Cosupervisor PIC ON P.Id = PIC.Proposal_Id
          LEFT JOIN Teacher T2 ON PIC.Co_Supervisor_Id = T2.Id
          LEFT JOIN Proposal_External_Cosupervisor PEC ON P.Id = PEC.Proposal_Id
          LEFT JOIN External_Supervisor ES ON PEC.Co_Supervisor_Id = ES.Id
          LEFT JOIN Proposal_Keywords PK ON P.Id = PK.Proposal_Id
          LEFT JOIN Keyword K ON PK.Keyword_Id = K.Id
          GROUP BY P.Id
          ) 
          WHERE SearchableFormat LIKE ?
          )`
      , [`%${searchTerm}%`]);
    return await this.getProposalsLinkedData(results);
  },

  createThesisProposal: async function (data) {

  },

  getTeacherActiveProposals: async function (teacherId) {
    var results = await db.getData(`SELECT * FROM Proposal
                                    WHERE Archived == 0 AND Expiration >= date('now')
                                    AND Supervisor = ?`, [teacherId]);

    return await this.getProposalsLinkedData(results);
  },

  getTeacherArchivedProposals: async function (teacherId) {
    var results = await db.getData(`SELECT * FROM Proposal
                                    WHERE Archived == 1 OR Expiration < date('now')
                                    AND Supervisor = ?`, [teacherId]);

    return await this.getProposalsLinkedData(results);
  },

  //get data from the relation tables (Proposal_Degrees, Proposal_Innternal_Supervisor, ...)
  getProposalsLinkedData: async function (proposals) {
    for (const p of proposals) {
      p.Supervisor = (await db.getData(
        `SELECT Id, Surname, Name, Email, Cod_Group, Cod_Department
        FROM Teacher
        WHERE Id = ?`, [p.Supervisor]))[0];

      p.cosupervisors = await db.getData(
        `SELECT T.Id, T.Surname, T.Name, T.Email, T.Cod_Group, T.Cod_Department
        FROM Teacher AS T, Proposal_Internal_Cosupervisor AS C
        WHERE T.Id = C.Co_Supervisor_Id
        AND C.Proposal_Id = ?`, [p.Id]);

      p.externalCosupervisors = await db.getData(
        `SELECT T.Id, T.Surname, T.Name, T.Email
       FROM External_Supervisor AS T, Proposal_External_Cosupervisor AS C
       WHERE T.Id = C.Co_Supervisor_Id
       AND C.Proposal_Id = ?`, [p.Id]);

      p.degrees = await db.getData(
        `SELECT D.Cod_Degree AS Id, D.Title_Degree AS Title
       FROM Proposal_Degrees AS PD, Degree AS D
       WHERE PD.Degree_Id = D.Cod_Degree
       AND PD.Proposal_Id = ?`, [p.Id]);

      p.groups = await db.getData(
        `SELECT G.Id, G.Name, G.Cod_Department
       FROM Proposal_Groups AS PG, ResearchGroup AS G
       WHERE PG.Group_Id = G.Id
       AND PG.Proposal_Id = ?`, [p.Id]);

      p.keywords = await db.getData(
        `SELECT K.Id, K.Name
       FROM Proposal_Keywords AS PK, Keyword AS K
       WHERE PK.Keyword_Id = K.Id
       AND PK.Proposal_Id = ?`, [p.Id]);
    }

    return proposals;
  }
};
