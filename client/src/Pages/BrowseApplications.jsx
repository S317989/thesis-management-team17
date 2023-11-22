import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { UserContext } from "../Contexts";

const BrowseApplications = () => {
  // Sample data, replace with actual data fetched from your API
  const pendingApplicationsData = [
    {
      id: 1,
      title: 'Exploring AI in Healthcare',
      surname: 'Irmak',
      name: 'Gizem',
      email: 's314140@studenti.polito.it',
      status: 'Pending',
    },
    // Add more pending application data as needed
  ];

  const acceptedApplicationsData = [
    {
      id: 2,
      title: 'Another Application',
      surname: 'Doe',
      name: 'John',
      email: 'john.doe@example.com',
      status: 'Accepted',
    },
    // Add more accepted application data as needed
  ];

  const rejectedApplicationsData = [
    {
      id: 3,
      title: 'Yet Another Application',
      surname: 'Smith',
      name: 'Jane',
      email: 'jane.smith@example.com',
      status: 'Rejected',
    },
    // Add more rejected application data as needed
  ];

  // State to store applications
  const [pendingApplications, setPendingApplications] = useState([]);
  const [acceptedApplications, setAcceptedApplications] = useState([]);
  const [rejectedApplications, setRejectedApplications] = useState([]);

  const { user } = React.useContext(UserContext);

  useEffect(() => {
    // Simulate fetching data from your API
    setPendingApplications(pendingApplicationsData);
    setAcceptedApplications(acceptedApplicationsData);
    setRejectedApplications(rejectedApplicationsData);
  }, []);

  const handleAccept = (id) => {
    // Handle accept action
    console.log(`Accept application with ID ${id}`);
  };

  const handleReject = (id) => {
    // Handle reject action
    console.log(`Reject application with ID ${id}`);
  };

  useEffect(() => {
    const checkAuthentication = async () => {
        if (!user || user.role !== 'Teacher') {
            sweetalert({
                title: "You are not authorized to access this page",
                icon: "error",
                button: "Ok",
            }).then(() => {
                window.location.href = "http://localhost:3000/login";
            });
        }
    };

    checkAuthentication();

}, [user]);

  return (
    <Container className="mt-5 mb-5">
    <h2 className="mb-4">Thesis Applications</h2>
      <Row>
        <Col>
        <h4 className="mt-3 mb-2 text-start">Pending Applications</h4>
        <Table striped bordered hover size="sm" className="my-4">
            <thead>
              <tr>
                <th>Title</th>
                <th>Surname</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingApplications.map((application) => (
                <tr key={application.id}>
                  <td>{application.title}</td>
                  <td>{application.surname}</td>
                  <td>{application.name}</td>
                  <td>{application.email}</td>
                  <td>
                    <Button variant="success" className="me-2" onClick={() => handleAccept(application.id)}>
                      Accept
                    </Button>{' '}
                    <Button variant="danger" className="me-2" onClick={() => handleReject(application.id)}>
                      Reject
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col >
        <h4 className="mt-2 mb-3 text-start">Accepted Applications</h4>
        <Table striped bordered hover size="sm" className="my-4">
            <thead>
              <tr>
                <th>Title</th>
                <th>Surname</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {acceptedApplications.map((application) => (
                <tr key={application.id}>
                  <td>{application.title}</td>
                  <td>{application.surname}</td>
                  <td>{application.name}</td>
                  <td>{application.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
        <h4 className="mt-2 mb-3 text-start">Rejected Applications</h4>
        <Table striped bordered hover size="sm" className="my-4">
            <thead>
              <tr>
                <th>Title</th>
                <th>Surname</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {rejectedApplications.map((application) => (
                <tr key={application.id}>
                  <td>{application.title}</td>
                  <td>{application.surname}</td>
                  <td>{application.name}</td>
                  <td>{application.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default BrowseApplications;
