/***********
Tabella External_Supervisor per le info dei supervisor esterni id, name surname, email, cod group
*************/

import db from "../Database/DAO";

// get all teacher
exports.getAllCoSupervisor = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT Id, Surname, Name, Email, Cod_Group, Name FROM External_Supervisor JOIN ResearchGroup ON ResearchGroup.Id=ExternalSupervisor.Cod_Group';
      db.all(sql, [], (err, rows) => {
        
        if (err) {
          reject(err);
          return;
        }
        const cosup = rows.map((e) => ({ id: e.Id, surname: e.Surname, name: e.Name, email: e.Email, codGroup: e.Cod_Group, groupname: e.Name })); //serve il codGroup nella tabella di external supervisor perchè il gruppo dei co supervisor aggiunge gruppi alla proposal insieme a quello del supervisor
        console.log(cosup) 
        resolve(cosup);
      });
    });
  };

// get all degrees
exports.getAllDegrees = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Degree';
      db.all(sql, [], (err, rows) => {
        console.log(rows)
        if (err) {
          reject(err);
          return;
        }
        const cdsList = rows.map((e) => ({ id: e.Id, degree: e.Title_Degree }));
        console.log(cdsList)
        resolve(cdsList);
      });
    });
  };


// get all groups
exports.getAllGroups = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM ResearchGroup';
      db.all(sql, [], (err, rows) => {
        console.log(rows)
        if (err) {
          reject(err);
          return;
        }
        const groupList = rows.map((e) => ({ id: e.Id, name: e.Name }));
        console.log(groupList)
        resolve(groupList);
      });
    });
  };

// get all teacher
exports.getAllTeacher = () => {
    return new Promise((resolve, reject) => { //JOIN per avere il nome del gruppo direttamente dal codice
      const sql = 'SELECT Id, Surname, Name, Email, Cod_Group, Cod_Department, Name FROM Teacher JOIN ResearchGroup ON Teacher.Cod_Group=ResearchGroup.Id'
      db.all(sql, [], (err, rows) => {
        
        if (err) {
          reject(err);
          return;
        }
        const teacherList = rows.map((e) => ({ id: e.Id, surname: e.Surname, name: e.Name, email: e.Email, codGroup: e.Cod_Group, codDepartment: e.Cod_Department, groupname: e.Name  }));
        console.log(teacherList)
        resolve(teacherList);
      });
    });
  };
