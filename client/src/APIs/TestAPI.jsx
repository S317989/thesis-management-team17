const URL = 'http://localhost:3000/api';

const TestAPI = {
    getTest: function () {
        return fetch(URL + '/test', {
            method: 'GET',
            credentials: "include"
        })
    },
    postTest: function () {
        return fetch(URL + '/test', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ test: 'test' }),
        })
    }
};

export default TestAPI;