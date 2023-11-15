const URL = 'http://localhost:3000/api';

const SearchAPI = {
    getAllProposals: function () {
        return fetch(URL + `/proposals/${userId}`, {
            method: 'GET',
            credentials: "include"
        })
    },
    searchProposals: function (searchTerm) {
        return fetch(URL + `/proposals/search/${userId}`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ searchTerm }),
        })
    }
};

export default SearchAPI;





