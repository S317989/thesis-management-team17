const sqlite = require('sqlite3');
const { get } = require('../Router/RouterTest');

// Open the database connection
const db = new sqlite.Database('./Database/DB.sqlite', (err) => {
    if (err) console.error(err.message);
    console.log('CoSupervisor External DAO ready.');
});

/***********
Tabella External_Supervisor per le info dei supervisor esterni id, name surname, email, cod group
*************/

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