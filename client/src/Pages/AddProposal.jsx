import CosupervisorAPI from "../APIs/ExternalSupervisorAPI";
import DegreeAPI from "../APIs/DegreeAPI";
import KeywordsAPI from "../APIs/KeywordsAPI";
import ResearchGroupAPI from "../APIs/ResearchGroupAPI";
import TeacherAPI from "../APIs/TeacherAPI";
import InsertProposal from "../Components/InsertProposal";
import { useState, useEffect } from "react";
import { UserContext } from "../Contexts";

function AddProposal() {

  const [degrees, setDegrees] = useState([]);
  const [suplist, setSuplist] = useState([]);
  const [csvlist, setCsvlist] = useState([]);
  const [grouplist, setGrouplist] = useState([]);
  const [keywordsList, setKeywordsList] = useState([]);

  const { user } = React.useContext(UserContext);

  const getAllDegrees = async () => {
    try {
      const response = await DegreeAPI.getListCds();
      console.log(response)
      if (response.ok) {
        // Assuming the response contains JSON data
        const cdsList = await response.json();
        console.log(cdsList)
        setDegrees(cdsList);

      } else {
        console.error('Error fetching CDS list:', response.status);
        // Handle error, e.g., show an error message
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle unexpected errors
    }
  };

  const getAllResearchGroups = async () => {
    try {
      const response = await ResearchGroupAPI.getAllGroups();
      console.log(response)
      if (response.ok) {
        // Assuming the response contains JSON data
        const glist = await response.json();
        console.log(glist)
        setGrouplist(glist);

      } else {
        console.error('Error fetching group of research list:', response.status);
        // Handle error, e.g., show an error message
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle unexpected errors
    }
  };

  const getAllTeacher = async () => {
    try {
      const response = await TeacherAPI.getListTeacher();
      console.log(response)
      if (response.ok) {
        // Assuming the response contains JSON data
        const teacherList = await response.json();
        console.log(teacherList)
        setSuplist(teacherList);

      } else {
        console.error('Error fetching Teacher list:', response.status);
        // Handle error, e.g., show an error message
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle unexpected errors
    }
  };

  const getAllCoSup = async () => {
    try {
      const response = await CosupervisorAPI.getCoSupList();
      console.log(response)
      if (response.ok) {
        // Assuming the response contains JSON data
        const cosupList = await response.json();
        console.log(cosupList)
        setCsvlist(cosupList);

      } else {
        console.error('Error fetching CoSupervisor list:', response.status);
        // Handle error, e.g., show an error message
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle unexpected errors
    }
  };

  const getAllKeywords = async () => {
    try {
      const response = await KeywordsAPI.getKeywordsList();
      console.log(response)
      if (response.ok) {
        // Assuming the response contains JSON data
        const keywordsList = await response.json();
        console.log(keywordsList)
        setKeywordsList(keywordsList);

      } else {
        console.error('Error fetching Keywords list:', response.status);
        // Handle error, e.g., show an error message
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle unexpected errors
    }
  };


  useEffect(() => {


    // Call the function to fetch the CDS list when the component mounts
    getAllTeacher(); //academic ones
    getAllDegrees();
    getAllCoSup(); //external supervisors
    getAllResearchGroups();
    getAllKeywords();



  }, []);

  useEffect(() => {
    const checkAuthentication = async () => {
      if (!user || user.role !== 'Teacher') {
        sweetalert({
          title: "You are not authorized to access this page",
          icon: "error",
          button: "Ok",
        }).then(() => {
          window.location.href = "http://localhost:3000/login";
        });
      }
    };

    checkAuthentication();

  }, [user]);


  return (
    <>
      <InsertProposal degreeList={degrees} teacherList={suplist} csvlist={csvlist} grouplist={grouplist} keywordsList={keywordsList} />

    </>
  );

}
export default AddProposal;