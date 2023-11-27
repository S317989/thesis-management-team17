import FetchAPIs from "./FetchAPIs";
const subParentURL = '/utilities';

const UtilitesAPI = {

  getListCds: async () => await FetchAPIs.get(subParentURL + '/degrees'),
  // function () {
  //   const url = new URL(subParentURL + "/degrees");


  //   return fetch(url, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     credentials: "include",
  //   });
  // },

  getExternalCosupervisorList: async () => await FetchAPIs.get(subParentURL + '/external-cosupervisors'),
  // function () {
  //   const url = new URL(subParentURL + "/external-cosupervisors");

  //   return fetch(url, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     credentials: "include",
  //   });
  // },

  addExternal: async (surname, name, email) => await FetchAPIs.post(subParentURL + '/archive', { Surname: surname, Name: name, Email: email }),
  // function (surname, name, email) {
  //   const url = new URL(subParentURL + "/external-cosupervisors");

  //   return fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     credentials: "include",
  //     body: JSON.stringify({
  //       surname: surname,
  //       name: name,
  //       email: email
  //     }),
  //   });
  // },

  getKeywordsList: async () => await FetchAPIs.get(subParentURL + '/keywords'),
  // function () {
  //   const url = new URL(subParentURL + "/keywords");


  //   return fetch(url, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     credentials: "include",
  //   });
  // },

  // newThesisProposal: function (name) {
  //   const url = new URL(subParentURL + "/keywords");


  //   return fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     credentials: "include",
  //     body: JSON.stringify({
  //       name:name
  //     }),
  //   });
  // },

  getAllGroups: async () => await FetchAPIs.get(subParentURL + '/groups'),
  // function () {
  //   const url = new URL(subParentURL + "/groups");


  //   return fetch(url, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     credentials: "include",
  //   });
  // },

  getListTeacher: async () => await FetchAPIs.get(subParentURL + '/teachers'),
  // function () {
  //   const url = new URL(subParentURL + "/teachers");


  //   return fetch(url, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     credentials: "include",
  //   });
  // },
};

export default UtilitesAPI;