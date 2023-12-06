import "../Stylesheets/StudentApplicationStyle.css";
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Card, Accordion, Badge, Alert } from 'react-bootstrap';
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
        <div className="parent-container">
            <Row className="child-container">
                {
                    pendingOrActiveApplication ?
                        <Col md={2} className="pending-card-column">
                            <PendingApplicationAlert application={pendingOrActiveApplication} applicationStatus={applicationStatus} />
                        </Col>
                        : <></>
                }

                <Col md={pendingOrActiveApplication ? 9 : 12}>
                    <Row className="accordion-card-column mb-3">
                        {
                            pendingOrActiveApplication ?
                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header className="text-center"><h4>Available Proposals</h4> </Accordion.Header>
                                        <Accordion.Body>
                                            <CardManager page={"AvailableProposals"} proposals={availableProposals} EnableApplying={!pendingOrActiveApplication} requestRefresh={fetchData} />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                                :
                                <CardManager page={"AvailableProposals"} proposals={availableProposals} EnableApplying={!pendingOrActiveApplication} requestRefresh={fetchData} />
                        }
                    </Row>

                    <Row className="accordion-card-column">
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
                </Col>
            </Row>
        </div>
    );
};

const PendingApplicationAlert = ({ application, applicationStatus }) => {
    if (!application)
        return null;

    const proposal = application[ApplicationFields.Proposal];
    return (
        <div className={`parent-pending-card-container`}>
            <Badge className={`me-1 badge-item-${applicationStatus}`}>{applicationStatus} Application</Badge>
            <Card className="pending-card-item">
                <Card.Header className={`pending-card-header-${applicationStatus}`} > {proposal[ProposalFields.Title]}</Card.Header>
                <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">{proposal[ProposalFields.Type]}</Card.Subtitle>
                    <Card.Text>
                        {proposal[ProposalFields.Description]}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    {
                        proposal[ProposalFields.keywords].map((keyword) => (
                            <Badge key={keyword.Id} bg="rgb(252, 122, 8)" className="me-1 badge-item">{keyword.Name}</Badge>
                        ))
                    }
                </Card.Footer>
            </Card>
        </div >
    );
}

export default StudentApplications;
