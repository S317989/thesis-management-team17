import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../Contexts";
import ProposalsAPI from "../APIs/ProposalsAPI";
import ApplicationsAPI from "../APIs/ApplicationsAPI";
import sweetalert from "sweetalert";
import { ShowProposalsForm } from '../Components/ProposalsActions';
import ProposalsSearchForm from '../Components/ProposalsSearchForm';
import AuthenticationAPI from '../APIs/AuthenticationAPI';
import { Pages } from '../APIs/AuthenticationAPI';

const StudentApplications = () => {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [proposals, setProposals] = useState([]);
    const [pendingOrActiveProposal, setPendingOrActiveProposal] = useState({})
    const { user } = React.useContext(UserContext);

    useEffect(() => {
        async function fetchData() {
            const availableProposals = await ProposalsAPI.getAvailableProposalsForStudent();
            const appliedProposals = await ProposalsAPI.getStudentApplicationsProposals();
            console.log(availableProposals, appliedProposals);
            var uniqueProposals = [...availableProposals, ...appliedProposals];
            uniqueProposals = uniqueProposals.filter((proposal, index, self) =>
                index === self.findIndex((p) => (
                    p.Id === proposal.Id
                ))
            )
            setProposals(uniqueProposals);

            setApplications(await ApplicationsAPI.getMyApplications());
        }

        AuthenticationAPI.checkAuthenticationAPI(user.role, Pages.STUDENT_APPLICATIONS)
            ? fetchData()
            : sweetalert(({
                title: "You are not authorized to access this page",
                icon: "error",
                button: "Ok",
            })).then(
                navigate("/")
            )
    }, [user]);

    return (
        <Container className="mt-4">
            {/* <PendingApplicationAlert proposal={null} /> */}
            <ProposalsSearchForm proposals={proposals} />
        </Container>
    );
};

const PendingApplicationAlert = ({ proposal }) => {
    return <Card>
        <Card.Header>You have a pending application for</Card.Header>
        <Card.Body>
            <Card.Title>{proposal.Title}</Card.Title>
            <Card.Text>
                This thesis proposal is supervised by {proposal.Supervisor.Name + ' ' + proposal.Supervisor.Surname}
            </Card.Text>
            <ShowProposalsForm proposal={proposal} />
        </Card.Body>
    </Card>
}

export default StudentApplications;
