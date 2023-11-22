const URL = 'http://localhost:3000/api/applications';

const ApplicationAPI = {
    getAllApplications: function () {
        return fetch(URL + '/retrieve-all', {
            method: 'GET',
            credentials: "include"
        })
    },

    acceptApplication: function (proposalId, studentId) {
        return fetch(URL + '/accept', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                proposalId: proposalId,
                studentId: studentId
            }),
        })
    },

    rejectApplication: function (proposalId, studentId) {
        return fetch(URL + '/reject', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                proposalId: proposalId,
                studentId: studentId
            }),
        })
    },

    getMyApplications: function () {
        return fetch(URL + '/retrieve-my-all', {
            method: 'GET',
            credentials: "include"
        })
    },

    createApplication: function (proposalId) {
        return fetch(URL + '/apply', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                proposalId: proposalId,
            }),
        })
    },

}

export default ApplicationAPI;