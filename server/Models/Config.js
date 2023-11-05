module.exports = {
    getConfig: () => {
        return new Promise((resolve, reject) => {
            const fs = require('fs');
            const keycloakConfig = JSON.parse(fs.readFileSync('keycloak.json', 'utf8'));

            resolve(keycloakConfig);
        });
    },
};
