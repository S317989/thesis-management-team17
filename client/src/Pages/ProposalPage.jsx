import React, { useContext, useEffect, useState } from "react";
import NewProposalForm from "../Components/ProposalForm";
import { UserContext } from "../Contexts";
import sweetalert from "sweetalert";
import TeacherAPI from "../APIs/TeacherAPI";
import DegreeAPI from "../APIs/DegreeAPI";
import ExternalSupervisorAPI from "../APIs/ExternalSupervisorAPI";
import ResearchGroupAPI from "../APIs/ResearchGroupAPI";
import KeywordsAPI from "../APIs/KeywordsAPI";
import ProposalForm from "../Components/ProposalForm";

function ProposalPage() {
    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [cosupervisors, setCosupervisors] = useState([]);
    const [degrees, setDegrees] = useState([]);
    const [keywords, setKeywords] = useState([]);

    const fetchData = async () => {
        try {
            const teachersResponse = TeacherAPI.getListTeacher();
            const degreesResponse = DegreeAPI.getListCds();
            const externalSupervisorsResponse = ExternalSupervisorAPI.getExternalCosupervisorList();
            const keywordsResponse = KeywordsAPI.getKeywordsList();

            const [teachersData, degreesData, externalSupervisorsData, keywordsData] = await Promise.all([
                teachersResponse,
                degreesResponse,
                externalSupervisorsResponse,
                keywordsResponse
            ]);

            setDegrees(degreesData.status === 200 ? await degreesData.json() : []);
            setKeywords(keywordsData.status === 200 ? await keywordsData.json() : []);

            const externalSupervisorsArray = await externalSupervisorsData.json();
            const teachersArray = await teachersData.json();

            const mergedArray = teachersArray.concat(externalSupervisorsArray);

            setCosupervisors(
                externalSupervisorsData.status === 200 && teachersData.status === 200
                    ? mergedArray
                    : []);

            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [

    ]);
    return (
        <>
            {
                !isLoading ?
                    <ProposalForm
                        cosupervisors={cosupervisors}
                        degreesList={degrees}
                        keywords={keywords} />

                    : null
            }
        </>
    );
}

export default ProposalPage;