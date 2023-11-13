// src/components/ProposalItem.js
import React from 'react';

const ProposalItem = ({ proposal }) => {
  return (
    <tr>
      <td>{proposal.title}</td>
      <td>{proposal.supervisor}</td>
      {/* Add other table cells as needed */}
    </tr>
  );
};

export default ProposalItem;



