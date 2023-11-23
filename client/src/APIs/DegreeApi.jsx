const parentURL = 'http://localhost:3000/api';

const DegreeAPI = {

  getListCds: function () {
    const url = new URL(parentURL + "/degree/get-all");

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

export default DegreeAPI;
