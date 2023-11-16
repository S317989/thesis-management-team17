const parentURL = 'http://localhost:3000/api';

const CosupervisorAPI = {

  getCoSupList: function () {
    const url = new URL(parentURL + "/cosupervisor/get-all");

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

export default CosupervisorAPI;
