const parentURL = 'http://localhost:3000/api';

const ProposalAPI = {
  addNewProposal: function (proposal) {
    return fetch(parentURL + '/thesis/proposal/add', {
      method: 'POST',
      credentials: "include",
      body: JSON.stringify(proposal),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
};

export default ProposalAPI;
