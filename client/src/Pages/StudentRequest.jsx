import "../Stylesheets/ProposalFormStyle.css"
import { Button, InputGroup, Container, Row, Col, FormControl, Dropdown, Form } from "react-bootstrap"
import Select, { components } from "react-select"
import { UserContext } from "../Contexts"
import { useState, useEffect, useContext } from "react";
import ProposalsAPI from "../APIs/ProposalsAPI";
import ApplicationsAPI from "../APIs/ApplicationsAPI";
import ThesisAPI from "../APIs/ThesisAPI";
import sweetalert from 'sweetalert';

function StudentRequest(props) {
    const { user } = useContext(UserContext);
    const [acceptedProposals, setAcceptedProposals] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [supervisor, setSupervisor] = useState("");
    const [supervisorId, setSupervisorId] = useState(0);
    const [cosupervisor, setCosupervisor] = useState([]);
    const [acceptedApplicationDate, setAcceptedApplicationDate] = useState("");

    const selectApplication = (index) => {
        setTitle(acceptedProposals[index].Proposal.Title);
        setDescription(acceptedProposals[index].Proposal.Description);
        setSupervisor(acceptedProposals[index].Proposal.Supervisor.Id + " " + acceptedProposals[index].Proposal.Supervisor.Surname + " " + acceptedProposals[index].Proposal.Supervisor.Name);
        setSupervisorId(acceptedProposals[index].Proposal.Supervisor.Id);
        setCosupervisor(acceptedProposals[index].Proposal.CoSupervisor || []);
        setAcceptedApplicationDate(new Date(acceptedProposals[index].Date).toISOString().split('T')[0]);
    }

    const insertRequest = async () => {
        if (title === "" || description === "" || supervisor === "" || approvalDate === "") {
            sweetalert({
                title: "Error!",
                text: "Please, choose a proposal!",
                icon: "error",
                button: "Ok",
            });
            return;
        }

        let thesisObj = {
            "Student_Id": user.id,
            "Supervisor_Id": supervisorId,
            "Title": title,
            "Description": description,
            "cosupervisors": cosupervisor,
        };

        ThesisAPI.addOrUpdateThesisRequest(thesisObj).then((response) => {
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

    useEffect(() => {
        const fetchProposals = async () => {
            let acceptedProposals = await ApplicationsAPI.getMyApplications();

            setAcceptedProposals(acceptedProposals.filter(proposal => proposal.Status === "Accepted"));
        };

        fetchProposals();
    }, []);

    return (
        <div className="main-container">
            <Container className="form-container" fluid>
                <Row>
                    <Col>
                        <h1>Student Request</h1>
                        <Dropdown className="mb-3" drop="down-centered">
                            <Dropdown.Toggle className="action-allowed-button">
                                Select Proposal
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {
                                    acceptedProposals.map((proposal, index) => {
                                        return (
                                            <Dropdown.Item key={index} onClick={() => selectApplication(index)}>
                                                {proposal.Proposal.Title + " - [" +
                                                    (
                                                        proposal.Proposal.degrees.length === 1
                                                            ? proposal.Proposal.degrees[0].Title_Degree
                                                            : proposal.Proposal.degrees.map((degree, degreeIndex) => degreeIndex === 0 ? degree.Title_Degree : " - " + degree.Title_Degree).join('')
                                                    )
                                                    + "]"}
                                            </Dropdown.Item>
                                        )
                                    })
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={4}>
                        <div className="form-section">
                            <Form.Group className="input-item">
                                <Form.Label className="label-item">Title</Form.Label>
                                <FormControl
                                    className="field-item-disabled"
                                    placeholder="Title"
                                    value={title}
                                    readOnly
                                />
                            </Form.Group>

                            <Form.Group className="input-item">
                                <Form.Label className="label-item">Supervisor</Form.Label>
                                <FormControl
                                    className="field-item-disabled"
                                    placeholder="Supervisor"
                                    value={supervisor}
                                    readOnly
                                />
                            </Form.Group>

                            <Form.Group className="input-item">
                                <Form.Label className="label-item">Co-Supervisor</Form.Label>
                                <FormControl
                                    className="field-item-disabled"
                                    placeholder="Co-Supervisors"
                                    value={cosupervisor.length > 0
                                        ? cosupervisor.map(cosupervisor => cosupervisor.Surname + " " + cosupervisor.Name)
                                        : "No Co-Supervisor"}
                                    readOnly
                                />
                            </Form.Group>
                        </div>
                    </Col>
                    <Col xs={12} md={8}>
                        <div className="textarea-section">
                            <Form.Group className="input-item">
                                <Form.Label className="label-item">Description</Form.Label>
                                <FormControl
                                    className="field-item-disabled"
                                    placeholder="Description"
                                    as="textarea"
                                    rows={3}
                                    value={description}
                                    readOnly
                                />
                            </Form.Group>

                            <Form.Group className="input-item">
                                <Form.Label className="label-item">Accepted Application Date</Form.Label>
                                <FormControl
                                    className="field-item-disabled"
                                    placeholder="Accepted Application Date"
                                    type="date"
                                    readOnly
                                    value={acceptedApplicationDate}
                                />
                            </Form.Group>
                        </div>
                    </Col>
                </Row>
                <Button className="action-allowed-button" onClick={() => insertRequest()}>Send Request</Button>
            </Container>
        </div>
    )
}

export default StudentRequest