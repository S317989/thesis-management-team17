// src/components/ProposalItem.js
import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Table, Button, Badge } from 'react-bootstrap';
import { UserContext } from "../Contexts";
import { useNavigate } from 'react-router-dom';
import { ShowRequestForm, ProfApprove, SecApprove, RejectRequest, RequestChange } from './RequestActions';

// enums
export const RequestStatus = {
  Pending: 'Pending',
  Accepted: 'Accepted',
  Rejected: 'Rejected',
  ChangeRequested: 'ChangeRequested',
  SecretaryAccepted: 'SecretaryAccepted'

};
export const RequestFields = {
  Id: 'Id',
  Student_Id: 'Student_Id',
  Supervisor_Id: 'Supervisor_Id',
  Title: 'Title',
  Description: 'Description',
  Status: 'Status',
  Date: 'Date'
};

// const Thesis = {
//   Id: '1',
//   Student_Id: '319976',
//   Supervisor_Id: '12571',
//   StudentName:'Gizem Irmak',
//   SupervisorName:'Mario Rossi',
//   Title: 'Dummy Request',
//   Description: 'Dummy Description',
//   Status: 'Pending',
//   Date: '2024-01-05'
// }

const RequestsTable = ({ requests, requestRefresh }) => {
  const { user } = useContext(UserContext);

  return (
    <Table striped bordered hover id='applications-table'>
      <thead>
        <tr>
          <th>Title</th>
          {
            user.role === 'Secretary' ?
              <th>Supervisor</th> : null
          }
          <th>Student</th> 
          <th>Request Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((request) => {
          return <tr key={request[RequestFields.Id]}>
            <td>{request[RequestFields.Title]}</td>
            {
              user.role === 'Secretary' ?
                <td>{request[RequestFields.Supervisor_Id]}</td>
                : null
            }
            <td>{request[RequestFields.Student_Id]}</td>     
            <td>{request[RequestFields.Date]}</td>
            <td>{(
              (() => {
                switch (request[RequestFields.Status]) {
                  case RequestStatus.Accepted:
                    return <Badge bg="success">Approved</Badge>;
                  case RequestStatus.Pending:
                    return <Badge bg="warning" text="dark">Pending</Badge>;
                  case RequestStatus.Rejected:
                    return <Badge bg="danger">Rejected</Badge>;
                  case RequestStatus.ChangeRequested:
                    return <Badge bg="secondary">Change Requested</Badge>;
                  case RequestStatus.SecretaryAccepted:
                    return <Badge bg="primary">Secretary Approved</Badge>;
                  default:
                    return <Badge bg="secondary">---</Badge>;
                }
              })()
            )}</td>
            <td>
              <ShowRequestForm request={request}/>
              {user.role === 'Teacher' && request[RequestFields.Status] === RequestStatus.SecretaryAccepted ?
                <ProfApprove requestId={request[RequestFields.Id]} requestStatus={request[RequestFields.Status]} OnComplete={requestRefresh} /> : <></>}
              {user.role === 'Teacher' && request[RequestFields.Status] === RequestStatus.SecretaryAccepted ?
                <RejectRequest requestId={request[RequestFields.Id]} requestStatus={request[RequestFields.Status]} OnComplete={requestRefresh} /> : <></>}
              {user.role === 'Teacher' && request[RequestFields.Status] === RequestStatus.SecretaryAccepted ?
                <RequestChange requestId={request[RequestFields.Id]} requestStatus={request[RequestFields.Status]} OnComplete={requestRefresh} /> : <></>}
              {user.role === 'Secretary' && request[RequestFields.Status] === RequestStatus.Pending ?
                <SecApprove requestId={request[RequestFields.Id]} requestStatus={request[RequestFields.Status]} OnComplete={requestRefresh} /> : <></>}
              {user.role === 'Secretary' && request[RequestFields.Status] === RequestStatus.Pending ?
                <RejectRequest requestId={request[RequestFields.Id]} requestStatus={request[RequestFields.Status]} OnComplete={requestRefresh} /> : <></>}              
            </td>
          </tr>
        })}
      </tbody>
      
    </Table >
  );
};
export default RequestsTable;