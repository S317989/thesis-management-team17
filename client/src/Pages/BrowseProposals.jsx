import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { UserContext } from "../Contexts";

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

  const { user } = React.useContext(UserContext);

  useEffect(() => {
    // Simulate fetching data from your API
    setProposals(proposalsData);
  }, []);

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
      <h2 className="mb-4">All Thesis Proposals</h2>
      <Row>
        <Col>
          <Table striped bordered hover className="my-4" size="sm">
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
