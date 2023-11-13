// src/components/SearchForm.js
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import ProposalList from './ProposalList';

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [proposals, setProposals] = useState([]);
  const [showProposals, setShowProposals] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    // Make an API request to fetch the matching thesis proposals
    // and update the state with the results.
    // For now, you can set some dummy data for testing purposes.
    const dummyData = [
      { id: 1, title: 'Proposal 1', supervisor: 'John Doe' },
      { id: 2, title: 'Proposal 2', supervisor: 'Jane Doe' },
    ];
    setProposals(dummyData);
    setShowProposals(true);
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
          <Col sm={4}>
          <Button type="submit" className="w-100" style={{ backgroundColor: 'black', color: 'white' }}>
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      {showProposals && <ProposalList proposals={proposals} />}
    </Container>
  );
};

export default SearchForm;

