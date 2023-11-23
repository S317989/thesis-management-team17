const sqlite = require('sqlite3');

// Open the database connection
const db = new sqlite.Database('./Database/DB.sqlite', (err) => {
    if (err) console.error(err.message);
    console.log('DAO ready.');
});

module.exports = {
    getData: function (query, params) {
        return new Promise((resolve, reject) => {
            db.all(query, params, (err, results) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    getOne: function(query, params){
        return new Promise((resolve, reject) => {
            db.get(query, params, (err, results) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    console.log(results);
                    resolve(results);
                }
            });
        });
    },

    executeQuery: function (query, params) {
        return new Promise((resolve, reject) => {
            db.run(query, params, (err) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}