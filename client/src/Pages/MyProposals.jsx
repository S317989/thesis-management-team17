import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { UserContext } from "../Contexts";

const MyProposals = () => {
  // Sample data, replace with actual data fetched from your API
  const activeProposalsData = [
    {
      id: 1,
      title: 'Exploring AI in Healthcare',
      cosupervisors: 'John Doe, Jane Smith',
      expiration: '2023-12-31',
    },
    // Add more active proposal data as needed
  ];

  const archivedProposalsData = [
    {
      id: 2,
      title: 'Another Proposal',
      cosupervisors: 'Alice Johnson, Bob Anderson',
      expiration: '2022-10-15',
    },
    // Add more archived proposal data as needed
  ];

  // State to store proposals
  const [activeProposals, setActiveProposals] = useState([]);
  const [archivedProposals, setArchivedProposals] = useState([]);

  const { user } = React.useContext(UserContext);

  useEffect(() => {
    // Simulate fetching data from your API
    setActiveProposals(activeProposalsData);
    setArchivedProposals(archivedProposalsData);
  }, []);

  const handleUpdate = (id) => {
    // Handle update action
    console.log(`Update proposal with ID ${id}`);
  };

  const handleDelete = (id) => {
    // Handle delete action
    console.log(`Delete proposal with ID ${id}`);
  };

  const handleArchive = (id) => {
    // Handle archive action
    console.log(`Archive proposal with ID ${id}`);
  };

  const handleActivate = (id) => {
    // Handle activate action
    console.log(`Activate proposal with ID ${id}`);
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
      <h2 className="mb-3">My Thesis Proposals</h2>
      <Row className="mb-3 mt-3">
      <Col xs={3}>
        {/* Empty column to take up space */}
      </Col>
      <Col xs={9} className="text-end">
        <Button variant="primary" size='lg' className="mt-3 mb-2">Insert Proposal</Button>
      </Col>
    </Row>
      <Row>
        <Col>
        <h4 className="mt-3 mb-3 text-start">My Active Proposals</h4>
        <Table striped bordered hover size="sm" className="my-4">
            <thead>
              <tr>
                <th>Title</th>
                <th>Cosupervisors</th>
                <th>Expiration</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {activeProposals.map((proposal) => (
                <tr key={proposal.id}>
                  <td>{proposal.title}</td>
                  <td>{proposal.cosupervisors}</td>
                  <td>{proposal.expiration}</td>
                  <td>
                    <Button variant="info"  className="me-2"  onClick={() => handleUpdate(proposal.id)}>
                      Update
                    </Button>{' '}
                    <Button variant="danger" className="me-2"  onClick={() => handleDelete(proposal.id)}>
                      Delete
                    </Button>{' '}
                    <Button variant="warning"  className="me-2"  onClick={() => handleArchive(proposal.id)}>
                      Archive
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
        <h4 className="mt-3 mb-3 text-start">My Archived Proposals</h4>
        <Table striped bordered hover className="my-4">
            <thead>
              <tr>
                <th>Title</th>
                <th>Cosupervisors</th>
                <th>Expiration</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>
            <tbody>
              {archivedProposals.map((proposal) => (
                <tr key={proposal.id}>
                  <td>{proposal.title}</td>
                  <td>{proposal.cosupervisors}</td>
                  <td>{proposal.expiration}</td>
                  {/* <td>
                    <Button variant="success" className="me-2" onClick={() => handleActivate(proposal.id)}>
                      Activate
                    </Button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default MyProposals;
