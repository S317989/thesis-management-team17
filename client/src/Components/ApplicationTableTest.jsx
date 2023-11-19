import React from 'react';
import { useState } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import ApplicationAPI from '../APIs/ApplicationAPI';
import sweetalert from 'sweetalert';

const ApplicationTableTest = (props) => {
    const applications = props.applications;
    const renderApp = props.renderApp;

    const [showModal, setShowModal] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);

    const handleRowClick = (application) => {
        setSelectedApplication(application);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleAcceptApplication = (e, applicationId) => {
        e.stopPropagation();

        if (applications.find(application => application.proposal_id === applicationId).status === "Accepted") {
            sweetalert({
                title: "Application already accepted",
                icon: "warning",
                button: "Ok",
            });
        } else {
            ApplicationAPI.acceptApplication(applicationId)
                .then(async response => {
                    if (response.status === 200) {
                        sweetalert({
                            title: "Application accepted",
                            icon: "success",
                            button: "Ok",
                        });
                    } else {
                        sweetalert({
                            title: response.message,
                            icon: "error",
                            button: "Ok",
                        });
                    }
                });
            renderApp();
        }

    };

    const handleRejectApplication = (e, applicationId) => {
        e.stopPropagation();

        if (applications.find(application => application.proposal_id === applicationId).status === "Rejected") {
            sweetalert({
                title: "Application already rejected",
                icon: "warning",
                button: "Ok",
            });
        } else {
            ApplicationAPI.rejectApplication(applicationId)
                .then(async response => {
                    if (response.status === 200) {
                        sweetalert({
                            title: "Application rejected",
                            icon: "success",
                            button: "Ok",
                        });
                    } else {
                        sweetalert({
                            title: response.message,
                            icon: "error",
                            button: "Ok",
                        });
                    }
                });
            renderApp();
        }

    };

    return (
        applications.length === 0 ?
            <h1>No Applications</h1>
            :
            <>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Surname</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((application) => (
                            <tr key={application.proposal_id} onClick={() => handleRowClick(application)}>
                                <td>{application.proposal_title}</td>
                                <td>{application.student_surname}</td>
                                <td>{application.student_name}</td>
                                <td>{application.student_email}</td>
                                <td>{application.status}</td>
                                <td>
                                    <div>
                                        <Button variant='primary' onClick={(e) => handleAcceptApplication(e, application.proposal_id)}>Accept</Button>
                                        <Button variant='danger' onClick={(e) => handleRejectApplication(e, application.proposal_id)}>Reject</Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Application Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Visualizza qui le informazioni dettagliate di selectedApplication */}
                        {selectedApplication && (
                            <div>
                                <p>Id: {selectedApplication.proposal_id}</p>
                                <p>Title: {selectedApplication.proposal_title}</p>
                                <p>Supervisor: {selectedApplication.proposal_supervisor}</p>
                                <p>Surname: {selectedApplication.student_surname}</p>
                                <p>Name: {selectedApplication.student_name}</p>
                                <p>Email: {selectedApplication.student_email}</p>
                                <p>Status: {selectedApplication.status}</p>

                                {/* Altre informazioni della proposta */}
                                <p>Keywords: {selectedApplication.proposal_keywords}</p>
                                <p>Type: {selectedApplication.proposal_type}</p>
                                <p>Description: {selectedApplication.proposal_description}</p>
                                <p>Required Knowledge: {selectedApplication.proposal_requiredKnowledge}</p>
                                <p>Notes: {selectedApplication.proposal_notes}</p>
                                <p>Expiration: {selectedApplication.proposal_expiration}</p>
                                <p>Level: {selectedApplication.proposal_level}</p>

                                {/* Altre informazioni dello studente */}
                                <p>Student ID: {selectedApplication.student_id}</p>
                                <p>Gender: {selectedApplication.student_gender}</p>
                                <p>Nationality: {selectedApplication.student_nationality}</p>
                                <p>Degree: {selectedApplication.student_degree}</p>
                                <p>Year: {selectedApplication.student_year}</p>

                                {/* Altre informazioni generali */}
                                <p>Progress: {selectedApplication.progress}</p>
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
    );
};

export default ApplicationTableTest;
