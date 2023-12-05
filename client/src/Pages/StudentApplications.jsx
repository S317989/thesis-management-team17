import "../Stylesheets/StudentApplicationStyle.css";
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Card, Accordion, Badge } from 'react-bootstrap';
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
import CardManager from '../Components/CardManager';
import CustomCard from "../Components/CustomCard";

const StudentApplications = () => {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [availableProposals, setAvailableProposals] = useState([]);
    const [pendingOrActiveApplication, setPendingOrActiveApplication] = useState(null)
    const { user } = React.useContext(UserContext);
    const [applicationStatus, setApplicationStatus] = useState("");

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

    useEffect(() => {
        if (pendingOrActiveApplication)
            pendingOrActiveApplication[ApplicationFields.Status] === ApplicationStatus.Pending
                ? setApplicationStatus("Pending")
                : setApplicationStatus("Active");

    }, [pendingOrActiveApplication]);

    useEffect(() => {
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
            {
                pendingOrActiveApplication ?
                    (
                        <>
                            <Row className="mt-4 mb-4">
                                <PendingApplicationAlert application={pendingOrActiveApplication} applicationStatus={applicationStatus} />
                            </Row>
                            <Row className="mt-4 mb-4">
                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header className="text-center"><h4>Available Proposals</h4> </Accordion.Header>
                                        <Accordion.Body>
                                            <CardManager page={"AvailableProposals"} proposals={availableProposals} EnableApplying={!pendingOrActiveApplication} requestRefresh={fetchData} />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Row>
                        </>
                    )
                    : (
                        <>
                            <Row className="mt-4 mb-4">
                                <h3>Available Proposals</h3>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <CardManager page={"AvailableProposals"} proposals={availableProposals} EnableApplying={!pendingOrActiveApplication} requestRefresh={fetchData} />
                                </Col>
                            </Row>
                        </>
                    )
            }
            <Row className="mt-4 mb-4">
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Col>
                            <Accordion.Header className="text-center"><h4>Old Applications</h4> </Accordion.Header>
                            <Accordion.Body>
                                <ApplicationsTable applications={applications} />
                            </Accordion.Body>
                        </Col>
                    </Accordion.Item>
                </Accordion>
            </Row>
        </Container>
    );
};

const PendingApplicationAlert = ({ application, applicationStatus }) => {
    const proposal = application[ApplicationFields.Proposal];
    return (
        <Container className={`parent-pending-card-container-${applicationStatus}`}>
            <div className="child-pending-card-container">
                <h4>{applicationStatus} Application</h4>
                <CustomCard
                    id="student-application-card"
                    proposal={proposal}
                    OnComplete={() => { }}
                />
            </div>
        </Container>
    );
}

export default StudentApplications;
