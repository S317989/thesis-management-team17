import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { UserContext } from "../Contexts";
import ProposalsAPI from '../APIs/ProposalsApi';

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
  const [refreshData, setRefreshData] = useState(true);

  useEffect(() => {
    // Simulate fetching data from your API
    ProposalsAPI.getMyActiveProposals.then(async (res) => {
      data = await res.json();
    }).catch((err) => console.log(err));
    setActiveProposals(activeProposalsData);
    setArchivedProposals(archivedProposalsData);
  }, [refreshData]);

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
    <Container className="mt-4">
      <Row className="mb-3">
        <Col className="text-right">
          <Button variant="primary">Insert Proposal</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="mb-4">My Active Proposals</h2>
          <Table striped bordered hover>
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
                    <Button variant="info" onClick={() => handleUpdate(proposal.id)}>
                      Update
                    </Button>{' '}
                    <Button variant="danger" onClick={() => handleDelete(proposal.id)}>
                      Delete
                    </Button>{' '}
                    <Button variant="warning" onClick={() => handleArchive(proposal.id)}>
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
          <h2 className="mb-4">My Archived Proposals</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Cosupervisors</th>
                <th>Expiration</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {archivedProposals.map((proposal) => (
                <tr key={proposal.id}>
                  <td>{proposal.title}</td>
                  <td>{proposal.cosupervisors}</td>
                  <td>{proposal.expiration}</td>
                  <td>
                    <Button variant="success" onClick={() => handleActivate(proposal.id)}>
                      Activate
                    </Button>
                  </td>
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
