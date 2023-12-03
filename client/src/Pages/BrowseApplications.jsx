import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { UserContext } from "../Contexts";
import ApplicationsAPI from '../APIs/ApplicationsAPI';
import ApplicationsTable from '../Components/ApplicationsTable';

const BrowseApplications = () => {

  // State to store applications
  const [applications, setApplications] = useState([]);

  const { user } = React.useContext(UserContext);

  async function fetchData() {
    setApplications(await ApplicationsAPI.getApplicationsByTeacherProposals());
  }

  useEffect(() => {
    fetchData();
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
    <Container className="mt-4 mb-4">
      <Col>
        <Row className="mt-4 mb-4">
          <h3>Applications Management</h3>
        </Row>
        <Row>
          <ApplicationsTable EnableAccept EnableReject
            applications={applications} requestRefresh={fetchData} />
        </Row>
      </Col>
    </Container>
  );
};

export default BrowseApplications;
