import "../Stylesheets/ProposalFormStyle.css";
import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Col, InputGroup, ButtonGroup, Row, ToggleButton, ToggleButtonGroup, Container } from "react-bootstrap";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../Contexts";
import sweetalert from "sweetalert";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { Input } from "@mui/material";
import ProposalsAPI from "../APIs/ProposalsAPI";
import UtilitiesAPI from "../APIs/UtilitiesAPI";
import { Delete, Archive } from './ProposalsActions';

// Enums
const Levels = { Bachelor: "Bachelor", Master: "Master" };
const ProposalFields = {
    Id: "Id",
    Title: "Title",
    Supervisor: "Supervisor",
    Type: "Type",
    Description: "Description",
    Required_Knowledge: "Required_Knowledge",
    Notes: "Notes",
    Expiration: "Expiration",
    Level: "Level",
    Archived: "Archived",
    cosupervisors: "cosupervisors",
    externalCosupervisors: "externalCosupervisors",
    degrees: "degrees",
    groups: "groups",
    keywords: "keywords"
}

function ProposalForm({ proposal, EnableEditing, EnableArchiving, EnableDeleting, OnComplete }) {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const location = useLocation();
    const { page } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    // Here are the default data for a new proposal
    const [proposalData, setProposalData] = useState({
        [ProposalFields.Title]: "",
        [ProposalFields.Type]: "",
        [ProposalFields.Description]: "",
        [ProposalFields.Required_Knowledge]: "",
        [ProposalFields.Notes]: "",
        [ProposalFields.Expiration]: "",
        [ProposalFields.cosupervisors]: [],
        [ProposalFields.externalCosupervisors]: [],
        [ProposalFields.degrees]: [],
        [ProposalFields.groups]: [],
        [ProposalFields.keywords]: [],
        [ProposalFields.Supervisor]: user,
        [ProposalFields.Level]: Levels.Bachelor,
    });

    const [teachers, setTeachers] = useState([]);
    const [externalCosupervisors, setExternalCosupervisors] = useState([]);
    const [degrees, setDegrees] = useState([]);
    const [keywords, setKeywords] = useState([]);

    useEffect(() => {
        const fetchOptionsData = async () => {
            try {
                const teachersResponse = await UtilitiesAPI.getListTeacher();
                const externalSupervisorsResponse = await UtilitiesAPI.getExternalCosupervisorList();
                const degreesResponse = await UtilitiesAPI.getListCds();
                const keywordsResponse = await UtilitiesAPI.getKeywordsList();

                setTeachers(teachersResponse.status === 200 ?
                    (await teachersResponse.json()).map(t => ({
                        ...t, value: t.Id, label: t.Name + " " + t.Surname + " (" + t.Email + ")"
                    })).filter(t => t.Id !== user.id) : []);
                setExternalCosupervisors(externalSupervisorsResponse.status === 200 ?
                    (await externalSupervisorsResponse.json()).map(t => ({
                        ...t, value: t.Id, label: t.Name + " " + t.Surname + " (" + t.Email + ")"
                    })) : []);
                setDegrees(degreesResponse.status === 200 ?
                    (await degreesResponse.json()).map(d => ({
                        ...d, value: d.Cod_Degree, label: d.Title_Degree
                    })) : []);
                setKeywords(keywordsResponse.status === 200 ?
                    (await keywordsResponse.json()).map(k => ({
                        ...k, value: k.Id, label: k.Name
                    })) : []);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchOptionsData();
        // check if data was recieved means we are editing
        if (proposal) {
            const pd = { ...proposal };

            pd.cosupervisors = pd.cosupervisors.map(t => ({ ...t, value: t.Id, label: t.Name + " " + t.Surname + " (" + t.Email + ")" }));
            pd.externalCosupervisors = pd.externalCosupervisors.map(t => ({ ...t, value: t.Id, label: t.Name + " " + t.Surname + " (" + t.Email + ")" }));
            pd.degrees = pd.degrees.map(d => ({ ...d, value: d.Cod_Degree, label: d.Title_Degree }));
            pd.keywords = pd.keywords.map(k => ({ ...k, value: k.Id, label: k.Name }));

            setProposalData(pd);
        }
    }, []);

    const handleCreateKeyword = (inputValue) => {
        const newKeyword = {
            value: inputValue,
            label: inputValue,
            Name: inputValue
        };
        changeProposalData(ProposalFields.keywords, [...proposalData.keywords, newKeyword]);
    };

    const changeProposalData = function (property, newValue) {
        setProposalData((old) => {
            const updatedData = { ...old };
            updatedData[property] = newValue;
            return updatedData;
        });
    }

    const handleInsertOrUpdateProposal = async () => {
        // groups depend on the supervisor and the internal supervisors
        const readyProposalData = { ...proposalData };
        readyProposalData.groups = [{ Id: readyProposalData.Supervisor.Cod_Group || readyProposalData.Supervisor.cod_group },
        ...(readyProposalData.cosupervisors ?
            readyProposalData.cosupervisors.map(c => ({ Id: c.Cod_Group })) : [])];
        readyProposalData.Supervisor = readyProposalData.Supervisor.id || readyProposalData.Supervisor.Id;


        ProposalsAPI.addOrUpdateProposal(readyProposalData).then((response) => {
            if (response.status === 200) {
                sweetalert({
                    title: "Proposal Saved",
                    icon: "success",
                    button: "Ok",
                }).then(() => {
                    OnComplete();
                });
            } else {
                sweetalert({
                    title: "Proposal Not Saved",
                    icon: "error",
                    button: "Ok",
                });
            }
        }).catch((error) => {

        });
    };

    return (
        <>
            <div className="main-container">
                <div className="container">
                    <Col>
                        <Row>
                            <Col className="form-section">
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
                                    <Form.Control
                                        readOnly={!EnableEditing}
                                        placeholder="Title"
                                        aria-label="Title"
                                        aria-describedby="basic-addon1"
                                        value={proposalData.Title}
                                        onChange={(e) => changeProposalData(ProposalFields.Title, e.target.value)}
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">Type</InputGroup.Text>
                                    <Form.Control
                                        readOnly={!EnableEditing}
                                        placeholder="Type"
                                        aria-label="Type"
                                        aria-describedby="basic-addon1"
                                        value={proposalData.Type}
                                        onChange={(e) => changeProposalData(ProposalFields.Type, e.target.value)}
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">Expiration Date</InputGroup.Text>
                                    <Form.Control
                                        readOnly={!EnableEditing}
                                        type="date"
                                        placeholder="Expiration Date"
                                        aria-label="Expiration Date"
                                        aria-describedby="basic-addon1"
                                        value={proposalData.Expiration}
                                        onChange={(e) => changeProposalData(ProposalFields.Expiration, e.target.value)}
                                    />
                                </InputGroup>
                                <Select
                                    isDisabled={!EnableEditing}
                                    className="mb-3"
                                    isMulti
                                    placeholder="No Co-Supervisor Selected"
                                    options={teachers}
                                    onChange={(newSelection) => changeProposalData(ProposalFields.cosupervisors, newSelection)}
                                    //onCreateOption={handleCreateSupervisor}
                                    value={proposalData.cosupervisors}
                                />
                                <Select
                                    isDisabled={!EnableEditing}
                                    className="mb-3"
                                    isMulti
                                    placeholder="No External Co-Supervisor Selected"
                                    options={externalCosupervisors}
                                    onChange={(newSelection) => changeProposalData(ProposalFields.externalCosupervisors, newSelection)}
                                    //onCreateOption={handleCreateSupervisor}
                                    value={proposalData.externalCosupervisors}
                                />
                                <CreatableSelect
                                    isDisabled={!EnableEditing}
                                    className="mb-3"
                                    isMulti
                                    placeholder="No Keywords Selected"
                                    options={keywords}
                                    onChange={(newSelection) => changeProposalData(ProposalFields.keywords, newSelection)}
                                    onCreateOption={handleCreateKeyword}
                                    value={proposalData.keywords} />
                                <Select
                                    isDisabled={!EnableEditing}
                                    className="mb-3"
                                    isMulti
                                    placeholder="No CDS Selected"
                                    options={degrees}
                                    onChange={(newSelection) => changeProposalData(ProposalFields.degrees, newSelection)}
                                    value={proposalData.degrees} />
                            </Col>
                            <Col className="textarea-section">
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">Description</InputGroup.Text>
                                    <Form.Control
                                        readOnly={!EnableEditing}
                                        as="textarea"
                                        placeholder="Description"
                                        aria-label="Description"
                                        aria-describedby="basic-addon1"
                                        value={proposalData.Description}
                                        onChange={(e) => changeProposalData(ProposalFields.Description, e.target.value)}
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">Required Knowledge</InputGroup.Text>
                                    <Form.Control
                                        readOnly={!EnableEditing}
                                        as="textarea"
                                        placeholder="Required Knowledge"
                                        aria-label="Required Knowledge"
                                        aria-describedby="basic-addon1"
                                        value={proposalData.Required_Knowledge}
                                        onChange={(e) => changeProposalData(ProposalFields.Required_Knowledge, e.target.value)}
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">Notes</InputGroup.Text>
                                    <Form.Control
                                        readOnly={!EnableEditing}
                                        as="textarea"
                                        placeholder="Notes"
                                        aria-label="Notes"
                                        aria-describedby="basic-addon1"
                                        value={proposalData.Notes}
                                        onChange={(e) => changeProposalData(ProposalFields.Notes, e.target.value)}
                                    />
                                </InputGroup>
                                <div className="button-div">
                                    <ButtonGroup className="button-group">
                                        {Object.keys(Levels).map((l) => {
                                            return <Form.Check
                                                disabled={!EnableEditing}
                                                className="mb-3"
                                                key={l}
                                                type="radio"
                                                label={l}
                                                name="switchOptions"
                                                id={l}
                                                checked={proposalData.Level === l}
                                                onChange={() => changeProposalData(ProposalFields.Level, l)}
                                            />
                                        })
                                        }
                                    </ButtonGroup>{' '}
                                </div>
                            </Col>
                        </Row>
                        {EnableEditing ?
                            <>
                                {proposalData.Id ? <>
                                    {EnableArchiving ? <Archive proposalId={proposalData.Id} OnComplete={OnComplete} /> : <></>}
                                    {EnableDeleting ? <Delete proposalId={proposalData.Id} OnComplete={OnComplete} /> : <></>}
                                </> : <></>}
                                <Button
                                    variant="primary" onClick={handleInsertOrUpdateProposal}>
                                    Save
                                </Button>
                            </> : <></>}
                    </Col>
                </div>
            </div >
        </>
    );
}

export default ProposalForm;