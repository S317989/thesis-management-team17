import DegreeAPI from "../APIs/DegreeApi";
import InsertProposal from "../Components/InsertProposal";
import { useState, useEffect } from "react";

function AddProposal() {

    const [degrees, setDegrees]=useState([]);



    const getAllDegrees = async () => {
        try {
          const response = await DegreeAPI.getListCds();
            console.log(response)
          if (response.ok) {
            // Assuming the response contains JSON data
            const cdsList = await response.json();
            setDegrees(cdsList);
            console.log('List of CDS:', cdsList);
          } else {
            console.error('Error fetching CDS list:', response.status);
            // Handle error, e.g., show an error message
          }
        } catch (error) {
          console.error('Error:', error);
          // Handle unexpected errors
        }
      };

      useEffect(() => {
       
    
        // Call the function to fetch the CDS list when the component mounts
        getAllDegrees();
        
      }, []);

    return(
        <>
        <InsertProposal degreeList={degrees} />
        
        </>
    );

}
export default AddProposal;