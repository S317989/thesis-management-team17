const URL = 'http://localhost:3000/api';

const AuthenticationAPI = {
    getSessionAPI: function () {
        return fetch(URL + '/auth/session', {
            method: 'GET',
            credentials: "include"
        })
    }
}

export default AuthenticationAPI;