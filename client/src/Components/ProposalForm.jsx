import "../Stylesheets/ProposalFormStyle.css";
import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Col, InputGroup, ButtonGroup, Row, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts";
import sweetalert from "sweetalert";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { Input } from "@mui/material";
import ProposalAPI from "../APIs/ProposalApi";

function ProposalForm(props) {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { page } = useParams();
    const [mode, setMode] = useState("Add");
    const [title, setTitle] = React.useState("");
    const [type, setType] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [requiredKnowledge, setRequiredKnowledge] = React.useState("");
    const [notes, setNotes] = React.useState("");
    const [ExpirationDate, setExpirationDate] = React.useState("");
    const [level, setLevel] = React.useState("Bachelor");
    const [keywordsList, setKeywordsList] = React.useState([]);
    const [externalSupervisorList, setExternalSupervisorList] = React.useState([]);
    const [degreesList, setDegreesList] = React.useState([]);

    const cosupervisors = props.cosupervisors.map((cosupervisor) => {
        return {
            value: cosupervisor.id,
            label: cosupervisor.name + " " + cosupervisor.surname + " (" + cosupervisor.email + ")",
            group: cosupervisor.groupName
        };
    });

    const degrees = props.degreesList.map((degree) => {
        return {
            value: degree.id, label: degree.degree
        };
    });

    const keywords = props.keywords.map((keyword) => {
        return { value: keyword.id, label: keyword.name };

    });

    const handleCreateSupervisor = (inputValue) => {
        const newSupervisor = {
            value: inputValue,
            label: inputValue,
        };
        setExternalSupervisorList((prevSupervisors) => [...prevSupervisors, newSupervisor]);
    };

    const handleSupervisorChange = (newValue) => {
        setExternalSupervisorList(newValue);
    };

    const handleLevelChange = (value) => {
        setLevel(value);
    };

    const handleCreateKeyword = (inputValue) => {
        const newKeyword = {
            value: inputValue,
            label: inputValue,
        };
        setKeywordsList((prevKeywords) => [...prevKeywords, newKeyword]);
    };

    const handleKeywordChange = (newValue) => {
        setKeywordsList(newValue);
    };

    const handleCDSChange = (newValue) => {
        setDegreesList(newValue);
    };

    const handleInsertProposal = async () => {
        let research_group_list = externalSupervisorList
            .filter((supervisor, index, self) => self.findIndex(s => s.group === supervisor.group) === index && supervisor.group != null)
            .map(supervisor => supervisor.group);


        ProposalAPI.addNewProposal({
            title: title,
            supervisor: user.id,
            type: type,
            description: description,
            required_knowledge: requiredKnowledge,
            notes: notes,
            expiration: ExpirationDate,
            level: level,
            keywords: keywordsList.map((keyword) => keyword.label),
            external_supervisors: externalSupervisorList.map((supervisor) => supervisor.value),
            degrees: degreesList.map((degree) => degree.label),
            research_group: research_group_list
        }).then((response) => {
            if (response.status === 200) {
                sweetalert({
                    title: "Proposal Inserted",
                    icon: "success",
                    button: "Ok",
                });
            } else {
                sweetalert({
                    title: "Proposal Not Inserted",
                    icon: "error",
                    button: "Ok",
                });
            }
        }).catch((error) => {
            console.log(error);
        });
    };


    useEffect(() => {
        if (page) {
            setMode("Edit");
        } else {
            setMode("Add");
        }

    }, [navigate]);

    return (
        <>
            <h1>Insert a new Proposal</h1>
            <div className="main-container">
                <div className="container">
                    <Row>
                        <Col className="form-section">
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
                                <Form.Control
                                    placeholder="Title"
                                    aria-label="Title"
                                    aria-describedby="basic-addon1"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">Type</InputGroup.Text>
                                <Form.Control
                                    placeholder="Type"
                                    aria-label="Type"
                                    aria-describedby="basic-addon1"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">Expiration Date</InputGroup.Text>
                                <Form.Control
                                    type="date"
                                    placeholder="Expiration Date"
                                    aria-label="Expiration Date"
                                    aria-describedby="basic-addon1"
                                    value={ExpirationDate}
                                    onChange={(e) => setExpirationDate(e.target.value)}
                                />
                            </InputGroup>

                            <Select
                                isMulti
                                placeholder="Co-Supervisor"
                                options={cosupervisors}
                                onChange={handleSupervisorChange}
                                //onCreateOption={handleCreateSupervisor}
                                value={externalSupervisorList} />

                            <CreatableSelect
                                isMulti
                                placeholder="Keywords"
                                options={keywords}
                                onChange={handleKeywordChange}
                                onCreateOption={handleCreateKeyword}
                                value={keywordsList} />

                            <CreatableSelect
                                isMulti
                                placeholder="CDS"
                                options={degrees}
                                onChange={handleCDSChange}
                                value={degreesList} />
                        </Col>
                        <Col className="textarea-section">
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">Description</InputGroup.Text>
                                <Form.Control
                                    as="textarea"
                                    placeholder="Description"
                                    aria-label="Description"
                                    aria-describedby="basic-addon1"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">Required Knowledge</InputGroup.Text>
                                <Form.Control
                                    as="textarea"
                                    placeholder="Required Knowledge"
                                    aria-label="Required Knowledge"
                                    aria-describedby="basic-addon1"
                                    value={requiredKnowledge}
                                    onChange={(e) => setRequiredKnowledge(e.target.value)}
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">Notes</InputGroup.Text>
                                <Form.Control
                                    as="textarea"
                                    placeholder="Notes"
                                    aria-label="Notes"
                                    aria-describedby="basic-addon1"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <div className="button-div">
                            <ButtonGroup className="button-group">
                                <Form.Check
                                    type="radio"
                                    label="Bachelor"
                                    name="switchOptions"
                                    id="bachelorSwitch"
                                    checked={level === "Bachelor"}
                                    onChange={() => handleLevelChange("Bachelor")}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Master"
                                    name="switchOptions"
                                    id="masterSwitch"
                                    checked={level === "Master"}
                                    onChange={() => handleLevelChange("master")}
                                />
                            </ButtonGroup>
                        </div>

                        <div className="insert-proposal-div">
                            <Button className="insert-proposal-button" variant="primary" onClick={handleInsertProposal}>
                                {
                                    mode === "Add" ? "Insert" : "Update"
                                }
                            </Button>
                        </div>


                    </Row>
                </div>
            </div >
        </>
    );
}


export default ProposalForm;