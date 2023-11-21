// src/components/ProposalItem.js
import React, { useEffect } from 'react';

const ProposalItem = (props) => {
  const proposal = props.proposal;

  return (
    <tr>
      <td>{proposal.Title}</td>
      <td>{proposal.SupervisorName} {' '}{proposal.SupervisorSurname}</td>
      {/* Add other table cells as needed */}
    </tr>
  );
};

export default ProposalItem;



