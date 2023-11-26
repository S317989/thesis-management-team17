import React, { useContext, useEffect, useState } from "react";
import NewProposalForm from "../Components/ProposalsForm";
import sweetalert from "sweetalert";
import UtilitiesAPI from "../APIs/UtilitiesAPI";
import ProposalForm from "../Components/ProposalsForm";

function ProposalPage() {
    
    return (
        <>
            {
                !isLoading ?
                    <ProposalForm
                        cosupervisors={teachers}
                        degreesList={degrees}
                        keywords={keywords} />

                    : null
            }
        </>
    );
}

export default ProposalPage;