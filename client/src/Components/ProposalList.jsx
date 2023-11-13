// src/components/ProposalList.js
import React from 'react';
import ProposalItem from './ProposalItem';
import { Container, Table } from 'react-bootstrap';

const ProposalList = ({ proposals }) => {
  return (
    <Container>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Title</th>
            <th>Supervisor</th>
            {/* Add other table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {proposals.map((proposal) => (
            <ProposalItem key={proposal.id} proposal={proposal} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ProposalList;


