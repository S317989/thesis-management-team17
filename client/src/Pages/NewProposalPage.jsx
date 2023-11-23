import CosupervisorAPI from "../APIs/ExternalSupervisorAPI.jsx";
import DegreeAPI from "../APIs/DegreeAPI.jsx";
import KeywordsAPI from "../APIs/KeywordsAPI";
import ResearchGroupAPI from "../APIs/ResearchGroupAPI";
import TeacherAPI from "../APIs/TeacherAPI";
import InsertProposal from "../Components/InsertProposal";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../Contexts.js";
import sweetalert from "sweetalert";

function NewProposalPage() {
  const { user } = useContext(UserContext);
  const [degrees, setDegrees] = useState([]);
  const [supervisorList, setSupervisorList] = useState([]);
  const [externalCosupervisorList, setExternalCosupervisorList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [keywordsList, setKeywordsList] = useState([]);

  const getAllDegrees = async () => {
    try {
      const response = await DegreeAPI.getListCds();
      if (response.status === 200) {
        const degreeList = await response.json();
        setDegrees(degreeList);
      } else {
        console.error('Error fetching Degrees list:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getAllResearchGroups = async () => {
    try {
      const response = await ResearchGroupAPI.getAllGroups();
      if (response.status === 200) {
        const researchGroupList = await response.json();
        setGroupList(researchGroupList);

      } else {
        console.error('Error fetching group of research list:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getAllTeacher = async () => {
    try {
      const response = await TeacherAPI.getListTeacher();
      if (response.status === 200) {
        const teacherList = await response.json();
        setSupervisorList(teacherList);
      } else {
        console.error('Error fetching Teacher list:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getAllExternalSupervisors = async () => {
    try {
      const response = await CosupervisorAPI.getExternalCosupervisorList();
      if (response.status === 200) {
        const externalCosupervisorList = await response.json();
        setExternalCosupervisorList(externalCosupervisorList);
      } else {
        console.error('Error fetching CoSupervisor list:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getAllKeywords = async () => {
    try {
      const response = await KeywordsAPI.getKeywordsList();
      if (response.status === 200) {
        const keywordsList = await response.json();
        setKeywordsList(keywordsList);
      } else {
        console.error('Error fetching Keywords list:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  useEffect(() => {
    const checkAuthentication = async () => {
      if (!user || user.role !== "teacher") {
        sweetalert({
          title: "You are not authorized to access this page",
          icon: "error",
          button: "Ok",
        }).then(() => {
          window.location.href = "http://localhost:3000/login";
        });
      } else {
        getAllTeacher();
        getAllDegrees();
        getAllExternalSupervisors();
        getAllResearchGroups();
        getAllKeywords();
      }
    };

    checkAuthentication();

  }, [user]);

  return (
    <>
      <InsertProposal degreeList={degrees} supervisorList={supervisorList} externalCosupervisorList={externalCosupervisorList} groupList={groupList} keywordsList={keywordsList} />
    </>
  );

}
export default NewProposalPage;