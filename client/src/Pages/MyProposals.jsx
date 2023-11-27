import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { UserContext } from "../Contexts";
import ProposalsTable from '../Components/ProposalsTable'
import ProposalsAPI from "../APIs/ProposalsAPI";
import { ShowProposalsForm } from '../Components/ProposalsActions';
import ProposalsSearchForm from '../Components/ProposalsSearchForm';
import sweetalert from "sweetalert";
import AuthenticationAPI from '../APIs/AuthenticationAPI';
import { Pages } from '../APIs/AuthenticationAPI';
import { useNavigate } from 'react-router-dom';

const MyProposals = () => {
  const navigate = useNavigate();
  const [activeProposals, setActiveProposals] = useState([]);
  const [archivedProposals, setArchivedProposals] = useState([]);
  const [refresh, refreshData] = useState(false);

  const { user } = React.useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      // const activeProposalsResponse = await ProposalsAPI.getActiveProposals();
      // const archivedProposalsResponse = await ProposalsAPI.getArchivedProposals();
      // setActiveProposals(activeProposalsResponse.status === 200 ? await activeProposalsResponse.json() : []);
      // setArchivedProposals(archivedProposalsResponse.status === 200 ? await archivedProposalsResponse.json() : []);

      setActiveProposals(await ProposalsAPI.getActiveProposals() || []);
      setArchivedProposals(await ProposalsAPI.getArchivedProposals() || []);
    }
    fetchData();
  }, [refresh]);

  useEffect(() => {
    AuthenticationAPI.checkAuthenticationAPI(user.role, Pages.MY_PROPOSALS)
      ? refreshData(true)
      : sweetalert(({
        title: "You are not authorized to access this page",
        icon: "error",
        button: "Ok",
      })).then(
        navigate("/")
      )
  }, [user]);

  const requestRefresh = () => {
    refreshData(true);
  }

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col className="text-right">
          <ShowProposalsForm OnComplete={requestRefresh} EnableEditing />
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="mb-4">My Active Proposals</h2>
          <ProposalsSearchForm proposals={activeProposals} EnableEditing EnableDeleting EnableArchiving requestRefresh={requestRefresh}></ProposalsSearchForm>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="mb-4">My Archived Proposals</h2>
          <ProposalsSearchForm proposals={archivedProposals} EnableEditing EnableDeleting requestRefresh={requestRefresh}></ProposalsSearchForm>
        </Col>
      </Row>
    </Container >
  );
};

export default MyProposals;
