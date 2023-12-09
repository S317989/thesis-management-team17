import React, { useContext, useState } from 'react';
import { Table, Button, Badge, Modal } from 'react-bootstrap';
import { UserContext } from "../Contexts";
import { ShowProposalsForm, Delete, Archive } from './ProposalsActions';
import { ProposalFields } from './ProposalsForm';
import { Apply, Accept, Reject } from './ApplicationsActions';

export const ApplicationStatus = {
  Pending: 'Pending',
  Accepted: 'Accepted',
  Rejected: 'Rejected',
  Canceled: 'Canceled'
};

export const ApplicationFields = {
  Application_Id: 'Application_Id',
  Student_Id: 'Student_Id',
  Proposal_Id: 'Proposal_Id',
  Proposal: 'Proposal',
  StudentName: 'StudentName',
  Title: 'Title',
  Supervisor: 'Supervisor',
  Date: 'Date',
  Status: 'Status',
  CV: 'CV' // New field for storing CV data
};

const ApplicationsTable = ({ applications, EnableAccept, EnableReject, requestRefresh }) => {
  const { user } = useContext(UserContext);
  const [selectedCV, setSelectedCV] = useState(null);

  const handleViewCV = (cvData) => {
    // Handle opening the CV modal or redirecting to a CV page
    setSelectedCV(cvData);
  };

  const handleCloseCVModal = () => {
    // Handle closing the CV modal
    setSelectedCV(null);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            {
              user.role === 'Student' ?
                <th>Supervisor</th> : null
            }
            {
              user.role === 'Teacher' ?
                <th>Student</th> : null
            }
            <th>Application Date</th>
            <th>Expiration Date</th>
            <th>Status</th>
            <th>CV</th> {/* New column for CV */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => {
            const proposal = application[ApplicationFields.Proposal];
            const cvData = application[ApplicationFields.CV]; // Assuming CV data is available in the application object

            return <tr key={application[ApplicationFields.Application_Id]}>
              <td>{proposal[ProposalFields.Title]}</td>
              {
                user.role === 'Student' ?
                  <td>{proposal[ProposalFields.Supervisor].Name + ' ' + proposal[ProposalFields.Supervisor].Surname}</td>
                  : null
              }
              {
                user.role === 'Teacher' ?
                  <td>{application[ApplicationFields.StudentName]}</td>
                  : null
              }
              <td>{application[ApplicationFields.Date]}</td>
              <td>{proposal[ProposalFields.Expiration]}</td>
              <td>{(
                (() => {
                  switch (application[ApplicationFields.Status]) {
                    case ApplicationStatus.Accepted:
                      return <Badge bg="success">Accepted</Badge>;
                    case ApplicationStatus.Pending:
                      return <Badge bg="warning" text="dark">Pending</Badge>;
                    case ApplicationStatus.Rejected:
                      return <Badge bg="danger">Rejected</Badge>;
                    case ApplicationStatus.Canceled:
                      return <Badge bg="danger">Canceled</Badge>;
                    default:
                      return <Badge bg="secondary">---</Badge>;
                  }
                })()
              )}</td>
              <td>
                {/* Button or link to view CV */}
                {cvData && (
                  <Button variant="primary" onClick={() => handleViewCV(cvData)}>
                    View CV
                  </Button>
                )}
              </td>
              <td>
                <ShowProposalsForm proposal={proposal} />
                {EnableAccept && application[ApplicationFields.Status] === ApplicationStatus.Pending ?
                  <Accept applicationId={application[ApplicationFields.Application_Id]} OnComplete={requestRefresh} /> : <></>}
                {EnableReject && application[ApplicationFields.Status] === ApplicationStatus.Pending ?
                  <Reject applicationId={application[ApplicationFields.Application_Id]} OnComplete={requestRefresh} /> : <></>}
              </td>
            </tr>;
          })}
        </tbody>
      </Table >

      {/* Modal for displaying CV */}
      <Modal show={selectedCV !== null} onHide={handleCloseCVModal}>
        <Modal.Header closeButton>
          <Modal.Title>CV</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Render the CV content here */}
          {selectedCV && <p>{selectedCV}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCVModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ApplicationsTable;
