const parentURL = 'http://localhost:3000/api/proposals';

const ProposalAPI = {

  newThesisProposal: function (title, supervisor, cosup, groups, keywords, type, description, knowledge, notes, expiration, level, cds) {
    const url = new URL(parentURL + "/new-proposal");

    console.log("Request received");
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        title: title,
        supervisor: supervisor,
        cosup: cosup,
        groups: groups,
        keywords: keywords,
        type: type,
        description: description,
        knowledge: knowledge,
        notes: notes,
        expiration: expiration,
        level: level,
        cds: cds,
      }),
    });
  },

  getAllProposals: function (userId) {
    const url = new URL(parentURL + '/retrieve-all');

    return fetch(url, {
      method: 'GET',
      credentials: "include"
    })
  },

  searchProposals: function (searchTerm) {
    const url = new URL(parentURL + '/search/' + searchTerm);

    console.log("Inside API");
    return fetch(url, {
      method: 'GET',
      credentials: "include"
    })
  },
};

export default ProposalAPI;
