const URL = 'http://localhost:3000/api';

const AuthenticationAPI = {
    getSessionAPI: function () {
        return fetch(URL + '/auth/session', {
            method: 'GET',
            credentials: "include"
        })
    },

    loginAPI: function (username, password) {
        return fetch(URL + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({ username, password })
        })
    },

    logoutAPI: function () {
        return fetch(URL + '/auth/logout', {
            method: 'DELETE',
            credentials: "include"
        }
        );
    }
}

export default AuthenticationAPI;