import "../Stylesheets/ProposalFormStyle.css"
import { Button, Container, Row, Col, Badge, OverlayTrigger, Tooltip } from "react-bootstrap"
import { UserContext } from "../Contexts"
import { useState, useEffect, useContext } from "react";
import ApplicationsAPI from "../APIs/ApplicationsAPI";
import ThesisAPI from "../APIs/ThesisAPI";
import UtilitiesAPI from "../APIs/UtilitiesAPI";
import { ApplicationFields } from "../Components/ApplicationsTable";
import { ProposalFields } from "../Components/ProposalsForm";
import { InfoCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import RequestForm from "../Components/RequestForm";
import { Slide, toast } from "react-toastify";

function StudentRequest() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [thesisData, setThesisData] = useState({
        "Supervisor_Id": '',
        "Title": '',
        "Description": '',
        "cosupervisors": [],
    });
    const [acceptedApplication, setAcceptedApplication] = useState(null);
    const [teachersData, setTeachersData] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [cosupervisorsData, setCosupervisorsData] = useState([]);
    const [selectedSupervisor, setSelectedSupervisor] = useState(null);

    const insertRequest = async () => {
        if (thesisData.Title === '' || thesisData.Supervisor_Id === '' || thesisData.Description === '') {
            toast.error('Please insert the required details!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                transition: Slide,
            });
            return;
        }

        thesisData.Student_Id = user.id;

        ThesisAPI.addOrUpdateThesisRequest(thesisData).then((response) => {
            if (response.status === 200) {
                toast.success('Request Sent', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                    transition: Slide,
                });
                navigate("/student-applications");
            } else {
                toast.error('Request Couldn\'t be sent', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                    transition: Slide,
                });
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    function setCosupervisorsForSelect(supervisor) {
        if (supervisor) {
            setCosupervisorsData(teachersData.filter(t => t.Id !== supervisor.Id).map(t => ({
                ...t, value: t.Id, label: t.Name + " " + t.Surname + " (" + t.Email + ")"
            })));
            changeThesisData('cosupervisors', thesisData.cosupervisors.filter(t => t.Id !== supervisor.Id));
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            let studentApplications = await ApplicationsAPI.getMyApplications();
            const foundAcceptedApplication = studentApplications.find(application => application.Status === "Accepted");

            if (foundAcceptedApplication) {
                foundAcceptedApplication.Proposal.cosupervisors = foundAcceptedApplication.Proposal.cosupervisors.map(t => ({
                    ...t, value: t.Id, label: t.Name + " " + t.Surname + " (" + t.Email + ")"
                }));
                foundAcceptedApplication.Proposal.Supervisor = {
                    ...foundAcceptedApplication.Proposal.Supervisor, value: foundAcceptedApplication.Proposal.Supervisor.Id, label: foundAcceptedApplication.Proposal.Supervisor.Name + " " + foundAcceptedApplication.Proposal.Supervisor.Surname + " (" + foundAcceptedApplication.Proposal.Supervisor.Email + ")"
                };

                setAcceptedApplication(foundAcceptedApplication);
            }
            const teachersResponse = (await UtilitiesAPI.getListTeacher()) || [];

            setTeachersData(teachersResponse);
            setTeachers(teachersResponse.map(t => ({
                ...t, value: t.Id, label: t.Name + " " + t.Surname + " (" + t.Email + ")"
            })));
        };

        fetchData();
    }, []);

    const changeThesisData = function (property, newValue) {
        setThesisData((old) => {
            const updatedData = { ...old };
            updatedData[property] = newValue;
            return updatedData;
        });
    }

    const copyApplicationData = function () {
        changeThesisData('Supervisor_Id', acceptedApplication[ApplicationFields.Proposal][ProposalFields.Supervisor].Id);
        setSelectedSupervisor(acceptedApplication[ApplicationFields.Proposal][ProposalFields.Supervisor]);
        setCosupervisorsForSelect(acceptedApplication[ApplicationFields.Proposal][ProposalFields.Supervisor]);
        changeThesisData('Title', acceptedApplication[ApplicationFields.Proposal][ProposalFields.Title]);
        changeThesisData('Description', acceptedApplication[ApplicationFields.Proposal][ProposalFields.Description]);
        changeThesisData('cosupervisors', acceptedApplication[ApplicationFields.Proposal][ProposalFields.cosupervisors]);
    }

    return (
        <div className="main-container">
            <Container className="form-container" fluid>
                <Row>
                    <Col>
                        <h1>Student Request</h1>
                        {user.role === "Student" && acceptedApplication
                            ? <div className="mt-3 mb-3">
                                <div className="d-flex flex-wrap align-items-center justify-content-center text-center">
                                    <Badge className="student-badge">
                                        You have an accepted Application on{' '}
                                        {acceptedApplication[ApplicationFields.Proposal][ProposalFields.Title]}
                                    </Badge>
                                    <OverlayTrigger
                                        placement="bottom"
                                        className="align-items-sm-start"
                                        overlay={<Tooltip>You can copy the data from the accepted application to the request</Tooltip>}
                                    >
                                        <InfoCircle className="ms-2 info-icon" />
                                    </OverlayTrigger>
                                </div>

                                <Button className="mt-4 action-allowed-button" onClick={copyApplicationData}>
                                    Copy Application
                                </Button>
                            </div>

                            : <></>
                        }
                    </Col>
                </Row>
                <br></br>
                <RequestForm />
                <Button className="action-allowed-button" onClick={() => insertRequest()}>Send Request</Button>
            </Container>
        </div >
    )
}

export default StudentRequest