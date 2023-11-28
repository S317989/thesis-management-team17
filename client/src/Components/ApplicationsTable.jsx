// src/components/ProposalItem.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Badge } from 'react-bootstrap';
import { UserContext } from "../Contexts";
import { useNavigate } from 'react-router-dom';
import { ShowProposalsForm, Delete, Archive } from './ProposalsActions';
import { ProposalFields } from './ProposalsForm';
import { Apply, Accept, Reject } from './ApplicationsActions'

// enums
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
  Status: 'Status'
};

const ApplicationsTable = ({ applications, EnableAccept, EnableReject, requestRefresh }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>Supervisor</th>
          <th>Student</th>
          <th>Application Date</th>
          <th>Expiration Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {applications.map((application) => {
          const proposal = application[ApplicationFields.Proposal];
          return <tr key={application[ApplicationFields.Application_Id]}>
            <td>{proposal[ProposalFields.Title]}</td>
            <td>{proposal[ProposalFields.Supervisor].Name + ' ' + proposal[ProposalFields.Supervisor].Surname}</td>
            <td>{application[ApplicationFields.StudentName]}</td>
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
              <ShowProposalsForm proposal={proposal} />
              {EnableAccept && application[ApplicationFields.Status] === ApplicationStatus.Pending ?
                <Accept applicationId={application[ApplicationFields.Application_Id]} OnComplete={requestRefresh} /> : <></>}
              {EnableReject && application[ApplicationFields.Status] === ApplicationStatus.Pending ?
                <Reject applicationId={application[ApplicationFields.Application_Id]} OnComplete={requestRefresh} /> : <></>}
            </td>
          </tr>
        })}
      </tbody>
    </Table >
  );
};
export default ApplicationsTable;