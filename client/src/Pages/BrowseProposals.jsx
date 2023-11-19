import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';

const BrowseProposals = () => {
  // Sample data, replace with actual data fetched from your API
  const proposalsData = [
    {
      id: 1,
      title: 'Exploring AI in Healthcare',
      supervisor: 'John Doe',
      expiration: '2023-12-31',
    },
    // Add more proposal data as needed
  ];

  // State to store proposals
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    // Simulate fetching data from your API
    setProposals(proposalsData);
  }, []);

  return (
    <Container className="mt-4">
      <h1 className="mb-4">All Thesis Proposals</h1>
      <Row>
        <Col>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Title</th>
                <th>Supervisor</th>
                <th>Expiration</th>
              </tr>
            </thead>
            <tbody>
              {proposals.map((proposal) => (
                <tr key={proposal.id}>
                  <td>{proposal.title}</td>
                  <td>{proposal.supervisor}</td>
                  <td>{proposal.expiration}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default BrowseProposals;
