const parentURL = 'http://localhost:3000/api';

const ResearchGroupAPI = {

  getAllGroups: function () {
    const url = new URL(parentURL + "/groups/get-all");

    console.log("Request received");
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  },
};

export default ResearchGroupAPI;