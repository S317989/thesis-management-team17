import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { UserContext } from "../Contexts";
import ProposalsAPI from "../APIs/ProposalsAPI";
import sweetAlert from "sweetalert";
import ProposalsSearchForm from '../Components/ProposalsSearchForm';

const BrowseProposals = () => {

  const [proposals, setProposals] = useState([]);

  const { user } = React.useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      // const response = await ProposalsAPI.getAllProposals();
      // setProposals(response.status === 200 ? await response.json() : []);
      setProposals(await ProposalsAPI.getAllProposals() || []);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const checkAuthentication = async () => {
      if (!user || user.role !== 'Teacher') {
        sweetAlert({
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
      <h3 className="mb-4">All Thesis Proposals</h3>
      <ProposalsSearchForm proposals={proposals} />
    </Container>
  );
};

export default BrowseProposals;
