const parentURL = 'http://localhost:3000/api';

const TeacherAPI = {

  getListTeacher: function () {
    const url = new URL(parentURL + "/teacher/get-all");

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

export default TeacherAPI;
