import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Contexts";
import { Button, Container, Modal, Row, Col, Table } from "react-bootstrap";
import sweetalert from "sweetalert";
import ApplicationAPI from "../APIs/ApplicationAPI";

function ApplicationDecisions() {
    
    const { user } = useContext(UserContext);

    const [myApplications, setMyApplications] = useState(null);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [showModal, setShowModal] = useState(false);
  
    const renderApplications = () => {
      ApplicationAPI.getMyApplications(user.id)
        .then(async (response) => {
          if (response.status === 200) {
            const data = await response.json();
            setMyApplications(data.applications);
            console.log('user' , user.id);
          }
        });
    };
  
    const handleViewDetails = (application) => {
      setSelectedApplication(application);
      setShowModal(true);
    };
  
    useEffect(() => {
      const checkAuthentication = async () => {
        if (!user || user.role !== 'Student') {
          sweetalert({
            title: "You are not authorized to access this page",
            icon: "error",
            button: "Ok",
          }).then(() => {
            window.location.href = "http://localhost:3000/login";
          });
        } else {
          renderApplications();
        }
      };
  
      checkAuthentication();
    }, [user]);
  
    return (
      <>
        {user && user.role === 'Student' ? (
          <>
            <h1>My Applications</h1>
  
            {myApplications ? (
              <>
                <Container>
                  <Row>
                    <Col>
                      <h2>Accepted Applications</h2>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>Supervisor</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {myApplications
                            .filter((application) => application.status === 'Accepted')
                            .map((application) => (
                              <tr key={application.proposal_id}>
                                <td>{application.proposal_title}</td>
                                <td>{application.proposal_supervisor}</td>
                                <td>
                                  <Button variant="primary" onClick={() => handleViewDetails(application)}>
                                    View Details
                                  </Button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h2>Pending Applications</h2>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>Supervisor</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {myApplications
                            .filter((application) => application.status === 'Pending')
                            .map((application) => (
                              <tr key={application.proposal_id}>
                                <td>{application.proposal_title}</td>
                                <td>{application.proposal_supervisor}</td>
                                <td>
                                  <Button variant="primary" onClick={() => handleViewDetails(application)}>
                                    View Details
                                  </Button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h2>Rejected Applications</h2>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>Supervisor</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {myApplications
                            .filter((application) => application.status === 'Rejected')
                            .map((application) => (
                              <tr key={application.proposal_id}>
                                <td>{application.proposal_title}</td>
                                <td>{application.proposal_supervisor}</td>
                                <td>
                                  <Button variant="primary" onClick={() => handleViewDetails(application)}>
                                    View Details
                                  </Button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </Container>
  
                {/* Details Modal */}
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Application Details</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {selectedApplication && (
                      <>
                        <p>Proposal ID: {selectedApplication.proposal_id}</p>
                        <p>Title: {selectedApplication.proposal_title}</p>
                        <p>Supervisor: {selectedApplication.proposal_supervisor}</p>
                        <p>Keywords: {selectedApplication.proposal_keywords}</p>
                        <p>Type: {selectedApplication.proposal_type}</p>
                        <p>Description: {selectedApplication.proposal_description}</p>
                        <p>Required Knowledge: {selectedApplication.proposal_requiredKnowledge}</p>
                        <p>Notes: {selectedApplication.proposal_notes}</p>
                        <p>Expiration: {selectedApplication.proposal_expiration}</p>
                        <p>Level: {selectedApplication.proposal_level}</p>
                      </>
                    )}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            ) : null}
          </>
        ) : (
          <h1>Please, log in to visualize your information</h1>
        )}
      </>
    );
  }
  
  export default ApplicationDecisions;
  
