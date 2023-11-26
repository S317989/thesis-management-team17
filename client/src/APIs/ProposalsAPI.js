const parentURL = 'http://localhost:3000/api/proposals';

const ProposalsAPI = {
  addOrUpdateProposal: function (proposal) {
    return fetch(parentURL + '/edit', {
      method: 'POST',
      credentials: "include",
      body: JSON.stringify(proposal),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },

  deleteProposal: function (proposalId) {
    return fetch(parentURL + '/delete', {
      method: 'DELETE',
      credentials: "include",
      body: JSON.stringify({ proposalId: proposalId }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },

  archiveProposal: function (proposalId) {
    return fetch(parentURL + '/archive', {
      method: 'POST',
      credentials: "include",
      body: JSON.stringify({ proposalId: proposalId }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },

  getAllProposals: function () {
    const url = new URL(parentURL + '/all');
    return fetch(url, {
      method: 'GET',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },

  getActiveProposals: function () {
    const url = new URL(parentURL + '/my-active');
    return fetch(url, {
      method: 'GET',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },

  getArchivedProposals: function () {
    const url = new URL(parentURL + '/my-archived');
    return fetch(url, {
      method: 'GET',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },

  searchProposals: function (searchTerm) {
    const url = new URL(parentURL + '/search/' + searchTerm);
    return fetch(url, {
      method: 'GET',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },


};

export default ProposalsAPI;





