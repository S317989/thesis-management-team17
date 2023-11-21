import React, { useState, useEffect, useContext } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import ProposalList from './ProposalList';
import SearchAPI from '../APIs/SearchAPI';
import { UserContext } from '../Contexts';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [proposals, setProposals] = useState([]);
  const [showProposals, setShowProposals] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  const handleSearch = (e) => {
    e.preventDefault();
    // Simulate an API call to search for proposals
    setLoading(true);
    SearchAPI.searchProposals(user.id, searchTerm)
      .then(async (response) => {
        const data = await response.json()
        setProposals(data);
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
      .then(async (response) => {

        const data = await response.json();

        setProposals(data);
        setLoading(false);
        setShowProposals(true);
      })
      .finally(() => setLoading(false));
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    setSearchTerm('');
    fetchAllProposals();
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
      } else
        fetchAllProposals();
    };
    checkAuthentication();
  }, [user])

  return (
    user ? (
      <Container>
        <h2 className="mt-4 mb-4">Thesis Proposal Search</h2>
        <Form onSubmit={handleSearch} className="mb-4">
          <Row className="mt-3 mb-3">
            <Col sm={8}>
              <Form.Control
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, supervisor, etc."
              />
            </Col>
            <Col sm={4} className="d-flex align-items-start">
              <Button type="submit" className="primary w-50 me-3" >
                Search
              </Button>
              <Button type="button" variant="dark" className="w-50" onClick={handleResetSubmit}>
                Reset
              </Button>
            </Col>
          </Row>
        </Form>
        
        {!proposals ? (
          <p>Retrieving all proposals...</p>
        ) : (
          <ProposalList proposals={proposals} />
        )}
      </Container>
    ) : null
  );
  
};

export default Search;
