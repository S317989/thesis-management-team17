// src/components/ProposalItem.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Badge } from 'react-bootstrap';
import { UserContext } from "../Contexts";
import { useNavigate } from 'react-router-dom';
import { ShowProposalsForm, Delete, Archive } from './ProposalsActions';
import { Apply } from './ApplicationsActions';
import { ProposalFields } from './ProposalsForm';

const ProposalsTable = ({
  proposals, EnableEditing, EnableArchiving, EnableDeleting, EnableApplying, requestRefresh
}) => {
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
          <tr key={proposal[ProposalFields.Id]}>
            <td>{proposal[ProposalFields.Title]}</td>
            <td>{proposal[ProposalFields.Supervisor].Name + ' ' + proposal[ProposalFields.Supervisor].Surname}</td>
            <td>{proposal[ProposalFields.cosupervisors].map(c => <Badge key={c.Id} bg="secondary">{c.Name + ' ' + c.Surname}</Badge>)}</td>
            <td>{proposal[ProposalFields.Expiration]}</td>
            <td>
              <ShowProposalsForm EnableEditing={EnableEditing} EnableArchiving={EnableArchiving}
                EnableDeleting={EnableDeleting} proposal={proposal} OnComplete={requestRefresh} />
              {EnableArchiving ? <Archive proposalId={proposal[ProposalFields.Id]} OnComplete={requestRefresh} /> : <></>}
              {EnableDeleting ? <Delete proposalId={proposal[ProposalFields.Id]} OnComplete={requestRefresh} /> : <></>}
              {EnableApplying ? <Apply proposalId={proposal[ProposalFields.Id]} OnComplete={requestRefresh} /> : <></>}
            </td>
          </tr>
        ))}
      </tbody>
    </Table >
  );
};
export default ProposalsTable;