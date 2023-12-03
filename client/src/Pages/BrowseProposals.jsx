import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Card } from 'react-bootstrap';
import { UserContext } from "../Contexts";
import ProposalsAPI from "../APIs/ProposalsAPI";
import sweetalert from "sweetalert";
import ProposalsSearchForm from '../Components/ProposalsSearchForm';
import AuthenticationAPI from '../APIs/AuthenticationAPI';
import { Pages } from '../APIs/AuthenticationAPI';
import { useNavigate } from 'react-router-dom';
import CardManager from '../Components/CardManager';

const BrowseProposals = () => {
  const navigate = useNavigate();
  const [proposals, setProposals] = useState([]);
  const { user } = React.useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      // const response = await ProposalsAPI.getAllProposals();
      // setProposals(response.status === 200 ? await response.json() : []);
      setProposals(await ProposalsAPI.getAllProposals() || []);
    }

    AuthenticationAPI.checkAuthenticationAPI(user.role, Pages.BROWSE_PROPOSALS)
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
      <h3 className="mb-4">All Thesis Proposals</h3>
      <CardManager page={"AllProposals"} proposals={proposals} />
      {/*<ProposalsSearchForm proposals={proposals} />*/}
    </Container>
  );
};

export default BrowseProposals;
