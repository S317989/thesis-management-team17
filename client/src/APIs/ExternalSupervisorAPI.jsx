const parentURL = 'http://localhost:3000/api';

const ExternalSupervisorAPI = {

  getExternalCosupervisorList: function () {
    const url = new URL(parentURL + "/cosupervisor/get-all-external");

    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  },

  addExternal: function (surname, name, email) {
    const url = new URL(parentURL + "/cosupervisor/add-external");

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        surname: surname,
        name: name,
        email: email
      }),
    });
  },
};

export default ExternalSupervisorAPI;
