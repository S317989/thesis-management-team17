import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { UserContext } from "../Contexts";
import ProposalsTable from '../Components/ProposalsTable'
import ProposalsAPI from "../APIs/ProposalsAPI";
import { ShowProposalsForm } from '../Components/ProposalsActions';
import ProposalsSearchForm from '../Components/ProposalsSearchForm';
import sweetAlert from "sweetalert";

const MyProposals = () => {

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
