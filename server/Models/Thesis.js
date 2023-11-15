const sqlite = require('sqlite3');

const db = new sqlite.Database('./Database/DB.sqlite', (err) => {
    if (err) console.error(err.message);
    else console.log('Thesis DAO connected.');
});

module.exports = {

    applyForProposal: function (proposalId, studentId) {
        return new Promise((resolve, reject) => {
            try {
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


};