const URL = 'http://localhost:3000/api';

const ConfigAPI = {
    getConfig: function () {
        return fetch(URL + '/config', {
            method: 'GET',
            credentials: "include"
        })
    },
};

export default ConfigAPI;