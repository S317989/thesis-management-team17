import CosupervisorAPI from "../APIs/CoSupervisorAPI";
import DegreeAPI from "../APIs/DegreeApi";
import ResearchGroupAPI from "../APIs/ResearchGroupAPI";
import TeacherAPI from "../APIs/TeacherAPI";
import InsertProposal from "../Components/InsertProposal";
import { useState, useEffect } from "react";

function AddProposal() {

    const [degrees, setDegrees]=useState([]);
    const [suplist, setSuplist]=useState([]);
    const [csvlist, setCsvlist]=useState([]);
    const [grouplist, setGrouplist]=useState([]);

    const getAllDegrees = async () => {
        try {
          const response = await DegreeAPI.getListCds();
            console.log(response)
          if (response.ok) {
            // Assuming the response contains JSON data
            const cdsList = await response.json();
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


      useEffect(() => {
       
    
        // Call the function to fetch the CDS list when the component mounts
        getAllTeacher();
        getAllDegrees();
        getAllCoSup();
        getAllResearchGroups();
        
      }, []);

    return(
        <>
        <InsertProposal degreeList={degrees} teacherList={suplist} csvlist={csvlist} grouplist={grouplist} />
        
        </>
    );

}
export default AddProposal;