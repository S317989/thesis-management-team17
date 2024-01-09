import "../Stylesheets/ApplicationTableStyle.css";
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { UserContext } from "../Contexts";
import ThesisAPI from '../APIs/ThesisAPI';
import RequestsTable from '../Components/RequestsTable';

const SecretaryRequests = () => {

    // State to store applications
    const [requests, setRequests] = useState([]);

    const { user } = React.useContext(UserContext);

    async function fetchData() {
      const data = await ThesisAPI.getTheses()
      console.log('gizem', data);
      setRequests(data);
    }

    useEffect(() => {
      fetchData();
    }, []);

   useEffect(() => {
     const checkAuthentication = async () => {
       if (!user || user.role !== 'Secretary') {
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
    <Container className="mt-4 mb-4" style={{ overflow: 'auto' }}>
      <Col>
        <Row className="mt-4 mb-4">
          <h3>Student Requests</h3>
        </Row>
        <Row>
          <div className="table-responsive">
            <RequestsTable requests={requests} requestRefresh={fetchData}/>
          </div>
        </Row>
      </Col>
    </Container>
  );
};

export default SecretaryRequests;