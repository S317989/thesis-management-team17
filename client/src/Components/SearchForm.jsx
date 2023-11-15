import React, { useState, useEffect, useContext } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import ProposalList from './ProposalList';
import SearchAPI from '../APIs/SearchAPI';
import { UserContext } from '../Contexts.js'; 

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [proposals, setProposals] = useState([]);
  const [showProposals, setShowProposals] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    // Simulate an API call to retrieve all proposals
    fetchAllProposals();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleSearch = (e) => {
    e.preventDefault();
    // Simulate an API call to search for proposals
    setLoading(true);
    SearchAPI.searchProposals(user.id, searchTerm)
  .then((proposals) => {
    setProposals(proposals);
    setShowProposals(true);
  })
  .catch((error) => {
    console.error("Error fetching proposals:", error);
  })
  .finally(() => setLoading(false));

  };

  const fetchAllProposals = () => {
    // Simulate an API call to retrieve all proposals
    setLoading(true);
    SearchAPI.getAllProposals(user.id)
      .then((proposals) => {
        setProposals(proposals);
        setShowProposals(true);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Container>
      <h1 className="mt-4">Thesis Proposal Search</h1>
      <Form onSubmit={handleSearch} className="mb-4">
        <Row>
          <Col sm={8}>
            <Form.Control
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, supervisor, etc."
            />
          </Col>
          <Col sm={2}>
            <Button type="submit" className="w-100" style={{ backgroundColor: 'black', color: 'white' }}>
              Search
            </Button>
          </Col>
          <Col sm={2}>
            <Button onClick={fetchAllProposals} className="w-100" variant="secondary">
              Refresh
            </Button>
          </Col>
        </Row>
      </Form>

      {loading ? (
        <p>Retrieving all proposals...</p>
      ) : (
        showProposals && <ProposalList proposals={proposals} />
      )}
    </Container>
  );
};

export default Search;

