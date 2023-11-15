const URL = 'http://localhost:3000/api';

const SearchAPI = {
    getAllProposals: function (userId) {
        return fetch(URL + `/proposals`, {
            method: 'GET',
            credentials: "include"
        })
    },
    searchProposals: function (userId,searchTerm) {
        return fetch(URL + `/proposals/search`, {
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





