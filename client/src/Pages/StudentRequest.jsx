import "../Stylesheets/ProposalFormStyle.css"
import { Button, InputGroup, Container, Row, Col, FormControl, Dropdown, Form } from "react-bootstrap"
import Select, { components } from "react-select"
import { UserContext } from "../Contexts"
import { useState, useEffect, useContext } from "react";
import ProposalsAPI from "../APIs/ProposalsAPI";
import ApplicationsAPI from "../APIs/ApplicationsAPI";
import ThesisAPI from "../APIs/ThesisAPI";
import sweetalert from 'sweetalert';
import UtilitiesAPI from "../APIs/UtilitiesAPI";
import { ApplicationFields } from "../Components/ApplicationsTable";
import { ProposalFields } from "../Components/ProposalsForm";

function StudentRequest(props) {
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
    const [selectedSupervisor, setSelectedSupervisor] = useState({});

    const insertRequest = async () => {
        if (thesisData.Title === '' || thesisData.Supervisor_Id === '' || thesisData.Description === '') {
            sweetalert({
                title: "Error!",
                text: "Please, insert the required details!",
                icon: "error",
                button: "Ok",
            });
            return;
        }

        thesisData.Student_Id = user.id;
        console.log(thesisData);

        ThesisAPI.addOrUpdateThesisRequest(thesisData).then((response) => {
            if (response.status === 200) {
                sweetalert({
                    title: "Success!",
                    text: "Your request has been sent!",
                    icon: "success",
                    button: "Ok",
                }).then(() => {
                    props.history.push("/student");
                });
            } else {
                sweetalert({
                    title: "Error!",
                    text: "Something went wrong!",
                    icon: "error",
                    button: "Ok",
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
            foundAcceptedApplication.Proposal.cosupervisors = foundAcceptedApplication.Proposal.cosupervisors.map(t => ({
                ...t, value: t.Id, label: t.Name + " " + t.Surname + " (" + t.Email + ")"
            }));
            foundAcceptedApplication.Proposal.Supervisor = {
                ...foundAcceptedApplication.Proposal.Supervisor, value: foundAcceptedApplication.Proposal.Supervisor.Id, label: foundAcceptedApplication.Proposal.Supervisor.Name + " " + foundAcceptedApplication.Proposal.Supervisor.Surname + " (" + foundAcceptedApplication.Proposal.Supervisor.Email + ")"
            };
            console.log(foundAcceptedApplication);
            setAcceptedApplication(foundAcceptedApplication);
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
                        {acceptedApplication ? <p>You have an accepted Application on
                            {acceptedApplication[ApplicationFields.Proposal][ProposalFields.Title]}<br></br>
                            If you would like to copy it's data to make the Request please click "Copy Accepted Application Data"<br></br>
                            <Button onClick={copyApplicationData}>Copy Accepted Application Data</Button></p> : <></>}
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col xs={12} md={4}>
                        <div className="form-section">
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
                                <Form.Control
                                    placeholder="Title"
                                    aria-label="Title"
                                    aria-describedby="basic-addon1"
                                    value={thesisData.Title}
                                    onChange={(e) => changeThesisData('Title', e.target.value)}
                                />
                            </InputGroup>
                            <Select
                                className="mb-3"
                                placeholder="No Supervisor Selected"
                                options={teachers}
                                onChange={(newSelection) => {
                                    changeThesisData('Supervisor_Id', newSelection.Id);
                                    setSelectedSupervisor(newSelection);
                                    setCosupervisorsForSelect(newSelection);
                                }}
                                value={selectedSupervisor} />
                            <Select
                                className="mb-3"
                                isMulti
                                placeholder="No Co-Supervisor Selected (Select Supervisor First)"
                                options={cosupervisorsData}
                                onChange={(newSelection) => { changeThesisData('cosupervisors', newSelection) }}
                                value={thesisData.cosupervisors}
                            />
                        </div>
                    </Col>
                    <Col xs={12} md={8}>
                        <div className="textarea-section">
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">Description</InputGroup.Text>
                                <Form.Control
                                    as="textarea"
                                    placeholder="Description"
                                    aria-label="Description"
                                    aria-describedby="basic-addon1"
                                    value={thesisData.Description}
                                    onChange={(e) => changeThesisData('Description', e.target.value)}
                                />
                            </InputGroup>
                        </div>
                    </Col>
                </Row>
                <Button className="action-allowed-button" onClick={() => insertRequest()}>Send Request</Button>
            </Container>
        </div>
    )
}

export default StudentRequest