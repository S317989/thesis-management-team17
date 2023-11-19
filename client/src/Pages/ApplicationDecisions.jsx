import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';

const ApplicationDecisions = () => {
  // Sample data, replace with actual data fetched from your API
  const acceptedApplicationsData = [
    {
      id: 1,
      title: 'Accepted Proposal 1',
      supervisor: 'Dr. Smith',
    },
    // Add more accepted application data as needed
  ];

  const pendingApplicationsData = [
    {
      id: '',
      title: '',
      supervisor: '',
    },
    // Add more pending application data as needed
  ];

  const rejectedApplicationsData = [
    {
      id: 3,
      title: 'Rejected Proposal 1',
      supervisor: 'Dr. Brown',
    },
    // Add more rejected application data as needed
  ];

  // State to store applications
  const [acceptedApplications, setAcceptedApplications] = useState([]);
  const [pendingApplications, setPendingApplications] = useState([]);
  const [rejectedApplications, setRejectedApplications] = useState([]);

  useEffect(() => {
    // Simulate fetching data from your API
    setAcceptedApplications(acceptedApplicationsData);
    setPendingApplications(pendingApplicationsData);
    setRejectedApplications(rejectedApplicationsData);
  }, []);

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2 className="mb-4">Accepted Applications</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Supervisor</th>
              </tr>
            </thead>
            <tbody>
              {acceptedApplications.map((application) => (
                <tr key={application.id}>
                  <td>{application.title}</td>
                  <td>{application.supervisor}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="mb-4">Pending Applications</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Supervisor</th>
              </tr>
            </thead>
            <tbody>
              {pendingApplications.map((application) => (
                <tr key={application.id}>
                  <td>{application.title}</td>
                  <td>{application.supervisor}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="mb-4">Rejected Applications</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Supervisor</th>
              </tr>
            </thead>
            <tbody>
              {rejectedApplications.map((application) => (
                <tr key={application.id}>
                  <td>{application.title}</td>
                  <td>{application.supervisor}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default ApplicationDecisions;
