import React, { useEffect } from "react";
import NewProposalPage from "../Pages/NewProposalPage";
import BrowseApplicationTest from "./BrowseApplicationTest";
import { Container, Card } from 'react-bootstrap';
import ProposalButtonTest from "../Components/ProposalsButtonTest";
import { UserContext } from "../Contexts";
import sweetalert from "sweetalert";
import ProposalPage from "./ProposalPage";
import { useNavigate } from "react-router-dom";

function ProposalPageTest(props) {
    const navigate = useNavigate();
    const { user } = React.useContext(UserContext);


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
        <Container className="mt-5 text-center">
            <h1>Choose a Page</h1>
            <ProposalButtonTest label="New Proposal" onClick={() => navigate("/proposal-page/add")} />
            <ProposalButtonTest label="Browse Application Page" onClick={() => navigate("/browse-application")} />
        </Container>
    );
}

export default ProposalPageTest;