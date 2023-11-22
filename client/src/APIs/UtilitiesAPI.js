const parentURL = 'http://localhost:3000/api/utilities';

const utilitiesAPI = {

  getCoSupList: function () {
    const url = new URL(parentURL + "/cosupervisors");

    console.log("Request received");
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  },

  getListCds: function () {
    const url = new URL(parentURL + "/degrees");

    console.log("Request received");
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  },

  getAllGroups: function () {
    const url = new URL(parentURL + "/groups");

    console.log("Request received");
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  },

  getListTeacher: function () {
    const url = new URL(parentURL + "/teachers");

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

export default utilitiesAPI;

