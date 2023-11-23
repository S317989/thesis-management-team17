const parentURL = 'http://localhost:3000/api';

const KeywordsAPI = {

  getKeywordsList: function () {
    const url = new URL(parentURL + "/keywords/get-keywords");

    console.log("Request received");
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  },

  newThesisProposal: function (name) {
    const url = new URL(parentURL + "/keywords/add-keyword");

    console.log("Request received");
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name:name
      }),
    });
  },
};


export default KeywordsAPI;
