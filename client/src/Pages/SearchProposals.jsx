import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { UserContext } from "../Contexts";
import ProposalsAPI from "../APIs/ProposalsAPI";
import sweetAlert from "sweetalert";
import ProposalsSearchForm from '../Components/ProposalsSearchForm';
import AuthenticationAPI from '../APIs/AuthenticationAPI';
import { Pages } from '../APIs/AuthenticationAPI';
import { useNavigate } from 'react-router-dom';

const SearchProposals = () => {
  const navigate = useNavigate();
  const [proposals, setProposals] = useState([]);
  const { user } = React.useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      const response = await ProposalsAPI.getAvailableProposalsForStudent();
      setProposals(response.status === 200 ? await response.json() : []);
    }

    AuthenticationAPI.checkAuthenticationAPI(user.role, Pages.SEARCH_PROPOSALS)
      ? fetchData()
      : sweetalert(({
        title: "You are not authorized to access this page",
        icon: "error",
        button: "Ok",
      })).then(
        navigate("/")
      )
  }, [user]);


  return (
    <Container className="mt-4">
      <h1 className="mb-4">Search Thesis Proposals</h1>
      <ProposalsSearchForm proposals={proposals} />
    </Container>
  );
};

export default SearchProposals;
