
const sqlite = require('sqlite3');
const { get } = require('../Router/RouterTest');

// Open the database connection
const db = new sqlite.Database('./Database/DB.sqlite', (err) => {
    if (err) console.error(err.message);
    console.log('Teacher DAO ready.');
});


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