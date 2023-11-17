const URL = 'http://localhost:3000/api';

const ApplicationAPI = {
    getAllApplications: function () {
        return fetch(URL + '/application/retrieve-all', {
            method: 'GET',
            credentials: "include"
        })
    }
}

export default ApplicationAPI;