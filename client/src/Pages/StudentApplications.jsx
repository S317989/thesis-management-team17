import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../Contexts";
import ProposalsAPI from "../APIs/ProposalsAPI";
import ApplicationsAPI from "../APIs/ApplicationsAPI";
import sweetalert from "sweetalert";
import { ShowProposalsForm } from '../Components/ProposalsActions';
import ProposalsSearchForm from '../Components/ProposalsSearchForm';
import { ApplicationFields, ApplicationStatus } from '../Components/ApplicationsTable';
import { ProposalFields } from '../Components/ProposalsForm';
import ApplicationsTable from '../Components/ApplicationsTable';
import AuthenticationAPI from '../APIs/AuthenticationAPI';
import { Pages } from '../APIs/AuthenticationAPI';

const StudentApplications = () => {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [availableProposals, setAvailableProposals] = useState([]);
    const [pendingOrActiveApplication, setPendingOrActiveApplication] = useState(null)
    const { user } = React.useContext(UserContext);

    useEffect(() => {
        async function fetchData() {
            const applicationsData = await ApplicationsAPI.getMyApplications();
            setApplications(applicationsData);
            setPendingOrActiveApplication(
                applicationsData.find((p) =>
                    p[ApplicationFields.Status] === ApplicationStatus.Pending ||
                    p[ApplicationFields.Status] === ApplicationStatus.Accepted));

            setAvailableProposals((await ProposalsAPI.getAvailableProposalsForStudent()).filter(p =>
                !applicationsData.some(a => a[ApplicationFields.Proposal_Id] === p[ProposalFields.Id])
            ));
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
            {pendingOrActiveApplication ? <PendingApplicationAlert application={pendingOrActiveApplication} /> : <></>}
            <h3>Available Thesis Proposals</h3>
            <ProposalsSearchForm proposals={availableProposals} EnableApplying={!pendingOrActiveApplication} requestRefresh={fetchData} />
            <h3>Your Applications</h3>
            <ApplicationsTable applications={applications} />
        </Container>
    );
};

const PendingApplicationAlert = ({ application }) => {
    const proposal = application[ApplicationFields.Proposal];
    console.log(proposal);
    return <Card>
        <Card.Header>You have {
            application[ApplicationFields.Status] === ApplicationStatus.Pending ?
                'a pending' : 'an active'
        } application for</Card.Header>
        <Card.Body>
            <Card.Title>{proposal[ProposalFields.Title]}</Card.Title>
            <Card.Text>
                This thesis proposal is supervised by {proposal.Supervisor.Name + ' ' + proposal.Supervisor.Surname}
            </Card.Text>
            <ShowProposalsForm proposal={proposal} />
        </Card.Body>
    </Card>
}

export default StudentApplications;
