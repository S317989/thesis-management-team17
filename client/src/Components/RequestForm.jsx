import "../Stylesheets/ProposalFormStyle.css"
import { Container, Row, Col, Form } from "react-bootstrap"
import Select from "react-select"
import { UserContext } from "../Contexts"
import { useState, useEffect, useContext } from "react";
import ApplicationsAPI from "../APIs/ApplicationsAPI";
import ThesisAPI from "../APIs/ThesisAPI";
import sweetalert from 'sweetalert';
import UtilitiesAPI from "../APIs/UtilitiesAPI";
import { ApplicationFields } from "../Components/ApplicationsTable";
import { ProposalFields } from "../Components/ProposalsForm";
import { useNavigate } from "react-router-dom";


function RequestForm({ request }) {
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
            sweetalert({
                title: "Error!",
                text: "Please, insert the required details!",
                icon: "error",
                button: "Ok",
            });
            return;
        }

        thesisData.Student_Id = user.id;

        ThesisAPI.addOrUpdateThesisRequest(thesisData).then((response) => {
            if (response.status === 200) {
                sweetalert({
                    title: "Success!",
                    text: "Your request has been sent!",
                    icon: "success",
                    button: "Ok",
                }).then(() => {
                    navigate("/student-applications")
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
        const fetchStudentData = async () => {
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

        const fetchTeacherData = async () => {
            let supervisors = request.cosupervisors.map(t => ({
                ...t, value: t.Id, label: t.Name + " " + t.Surname + " (" + t.Email + ")"
            }));

            setThesisData({
                "Supervisor_Id": request.Supervisor_Id,
                "Title": request.Title,
                "Description": request.Description,
                "cosupervisors": supervisors,
            });

            setSelectedSupervisor({
                ...request.Supervisor, value: request.Supervisor.Id, label: request.Supervisor.Name + " " + request.Supervisor.Surname + " (" + request.Supervisor.Email + ")"
            });

            console.log(request)
        };

        user.role === "Student" ? fetchStudentData() : fetchTeacherData();
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
        <Container className="form-container" fluid>
            <Row>
                <Col xs={12} md={4}>
                    <div className="form-section">
                        <Form.Group className="input-item mb-3">
                            <Form.Label className="label-item" id="basic-addon1">Title</Form.Label>
                            <Form.Control
                                className={`field-item-${user.role !== "Student" ? 'disabled' : 'enabled'}`}
                                placeholder="Title"
                                aria-label="Title"
                                aria-describedby="basic-addon1"
                                value={thesisData.Title}
                                onChange={(e) => changeThesisData('Title', e.target.value)}
                                readOnly={user.role !== "Student"}
                            />
                        </Form.Group>

                        <Form.Group className="input-item mb-3">
                            <Form.Label className="label-item" id="basic-addon1">Supervisor</Form.Label>
                            <Select
                                className="field-item mb-3"
                                styles={{
                                    control: (baseStyle) => ({
                                        ...baseStyle,
                                        backgroundColor: user.role !== "Student" ? 'rgb(204, 197, 200)' : 'rgb(255, 220, 150)',
                                    }),
                                    multiValueLabel: (baseStyle, { data }) => ({
                                        ...baseStyle,
                                        backgroundColor: '#9fd2ff',
                                        color: 'black',
                                    }),
                                    multiValueRemove: (baseStyle, { data }) => ({
                                        ...baseStyle,
                                        backgroundColor: '#9fd2ff',
                                        color: 'black',
                                        '&:hover': {
                                            backgroundColor: '#9fd2ff',
                                        },
                                    }),
                                    singleValue: (baseStyle, { data }) => ({
                                        ...baseStyle,
                                        color: 'black',
                                    }),
                                    indicatorsContainer: (baseStyle) => ({
                                        ...baseStyle,
                                        display: user.role !== "Student" ? 'none' : null,
                                    }),

                                }}
                                placeholder="No Supervisor Selected"
                                options={teachers}
                                onChange={(newSelection) => {
                                    changeThesisData('Supervisor_Id', newSelection.Id);
                                    setSelectedSupervisor(newSelection);
                                    setCosupervisorsForSelect(newSelection);
                                }}
                                value={selectedSupervisor}
                                isDisabled={user.role !== "Student"}
                            />
                        </Form.Group>

                        <Form.Group className="input-item mb-3">
                            <Form.Label className="label-item" id="basic-addon1">Co-Supervisors</Form.Label>
                            <Select
                                className="field-item mb-3"
                                styles={{
                                    control: (baseStyle) => ({
                                        ...baseStyle,
                                        backgroundColor: 'rgb(204, 197, 200)',
                                    }),
                                    multiValueLabel: (baseStyle, { data }) => ({
                                        ...baseStyle,
                                        backgroundColor: '#E0E0E0',
                                        color: 'black',
                                    }),
                                    multiValueRemove: (baseStyle, { data }) => ({
                                        ...baseStyle,
                                        backgroundColor: '#E0E0E0',
                                        display: user.role !== "Student" ? 'none' : 'block',
                                        color: 'black',
                                        '&:hover': {
                                            backgroundColor: '#9fd2ff',
                                        },
                                    }),
                                    indicatorsContainer: (baseStyle) => ({
                                        ...baseStyle,
                                        display: user.role !== "Student" ? 'none' : null,
                                    }),
                                }}
                                isMulti
                                placeholder="No Co-Supervisor Selected (Select Supervisor First)"
                                options={cosupervisorsData}
                                onChange={(newSelection) => { changeThesisData('cosupervisors', newSelection) }}
                                value={thesisData.cosupervisors}
                                isDisabled={user.role !== "Student"}
                            />
                        </Form.Group>
                    </div>
                </Col>
                <Col xs={12} md={8}>
                    <div className="textarea-section">
                        <Form.Group className="input-item mb-3">
                            <Form.Label id="label-item basic-addon1">Description</Form.Label>
                            <Form.Control
                                className={`field-item-${user.role !== "Student" ? 'disabled' : 'enabled'}`}
                                as="textarea"
                                rows={5}
                                placeholder="Description"
                                aria-label="Description"
                                aria-describedby="basic-addon1"
                                value={thesisData.Description}
                                onChange={(e) => changeThesisData('Description', e.target.value)}
                                readOnly={user.role !== "Student"}
                            />
                        </Form.Group>
                    </div>
                </Col>
            </Row>
        </Container>

    );
}

export default RequestForm;












