const parentURL = 'http://localhost:3000/api';

const SearchAPI = {
    getAllProposals: function (userId) {
        const url = new URL(parentURL + '/proposals/retrieve-all/' + userId);

        url.searchParams.append('userID', userId);

        return fetch(url, {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },
    searchProposals: function (userId,searchTerm) {
        const url = new URL(parentURL + '/proposals/search/' + userId + "/" + searchTerm);

        url.searchParams.append('userID', userId);
        url.searchParams.append('searchTerm', searchTerm);


        console.log("Inside API");
        return fetch(url, {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
};

export default SearchAPI;





