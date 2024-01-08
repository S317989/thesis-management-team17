// src/components/ProposalItem.js
import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Table, Button, Badge } from 'react-bootstrap';
import { UserContext } from "../Contexts";
import { useNavigate } from 'react-router-dom';
import { ShowRequestForm, ProfApprove, SecApprove, RejectRequest, RequestChange } from './RequestActions';

const Thesis = {
  Id: '1',
  Student_Id: '319976',
  Supervisor_Id: '12571',
  StudentName:'Gizem Irmak',
  SupervisorName:'Mario Rossi',
  Title: 'Dummy Request',
  Description: 'Dummy Description',
  Status: 'Pending',
  Date: '2024-01-05'
}

const RequestsTable = () => {
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
         <tr>
            <td>{Thesis.Title}</td>
            {
              user.role === 'Secretary' ?
                <td>{Thesis.SupervisorName}</td>
                : null
            }         
            <td>{Thesis.StudentName}</td>        
            <td>{Thesis.Date}</td>
            <td>{Thesis.Status}</td>
            <td>
              <ShowRequestForm/> 
              {user.role ==='Secretary' ? <SecApprove/> : <ProfApprove/>}
              {user.role ==='Teacher' ?   <RequestChange/> : <></>}
              <RejectRequest/>               
            </td>
          </tr>
      
      </tbody>
    </Table >
  );
};
export default RequestsTable;