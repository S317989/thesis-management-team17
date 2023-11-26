// src/components/ProposalItem.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Badge } from 'react-bootstrap';
import { UserContext } from "../Contexts";
import { useNavigate } from 'react-router-dom';
import { ShowProposalsForm, Delete, Archive } from './ProposalsActions';

const ProposalsTable = ({ proposals, EnableEditing, EnableArchiving, EnableDeleting, requestRefresh }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>Supervisor</th>
          <th>Cosupervisors</th>
          <th>Expiration</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {proposals.map((proposal) => (
          <tr key={proposal.Id}>
            <td>{proposal.Title}</td>
            <td>{proposal.Supervisor.Name + ' ' + proposal.Supervisor.Surname}</td>
            <td>{proposal.cosupervisors.map(c => <Badge key={c.Id} bg="secondary">{c.Name + ' ' + c.Surname}</Badge>)}</td>
            <td>{proposal.Expiration}</td>
            <td>
              <ShowProposalsForm EnableEditing={EnableEditing} EnableArchiving={EnableArchiving}
                EnableDeleting={EnableDeleting} proposal={proposal} OnComplete={requestRefresh} />

              {EnableArchiving ? <Archive proposalId={proposal.Id} OnComplete={requestRefresh} /> : <></>}

              {EnableDeleting ? <Delete proposalId={proposal.Id} OnComplete={requestRefresh} /> : <></>}
            </td>
          </tr>
        ))}
      </tbody>
    </Table >
  );
};
export default ProposalsTable;