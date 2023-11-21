// src/components/ProposalList.js
import React, { useEffect } from 'react';
import ProposalItem from './ProposalItem';
import { Container, Table } from 'react-bootstrap';

const ProposalList = (props) => {
  const proposals = props.proposals;

  return (
    <Container>
      <Table striped bordered hover size="sm" className="my-4">
        <thead>
          <tr>
            <th>Title</th>
            <th>Supervisor</th>
            {/* Add other table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {proposals.map((proposal, index) => (
            <ProposalItem key={index} proposal={proposal} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ProposalList;


