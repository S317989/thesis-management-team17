const parentURL = 'http://localhost:3000/api/utilities';

const UtilitesAPI = {

  getListCds: function () {
    const url = new URL(parentURL + "/degrees");

    
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  },

  getExternalCosupervisorList: function () {
    const url = new URL(parentURL + "/external-cosupervisors");

    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  },

  addExternal: function (surname, name, email) {
    const url = new URL(parentURL + "/external-cosupervisors");

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

  getKeywordsList: function () {
    const url = new URL(parentURL + "/keywords");

    
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  },

  newThesisProposal: function (name) {
    const url = new URL(parentURL + "/keywords");

    
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

  getAllGroups: function () {
    const url = new URL(parentURL + "/groups");

    
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

    
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  },
};

export default UtilitesAPI;