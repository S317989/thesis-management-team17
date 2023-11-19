const URL = 'http://localhost:3000/api';

const ApplicationAPI = {
    getAllApplications: function () {
        return fetch(URL + '/application/retrieve-all', {
            method: 'GET',
            credentials: "include"
        })
    },

    acceptApplication: function (application_id) {
        return fetch(URL + '/application/accept/' + application_id, {
            method: 'PUT',
            credentials: "include"
        })
    },

    rejectApplication: function (application_id) {
        return fetch(URL + '/application/reject/' + application_id, {
            method: 'PUT',
            credentials: "include"
        })
    }
}

export default ApplicationAPI;