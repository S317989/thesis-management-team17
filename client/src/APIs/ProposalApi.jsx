const parentURL = 'http://localhost:3000/api';

const ProposalAPI = {

  addNewService: function (title, supervisor, cosup, groups, keywords, type, description, knowledge, notes, expiration, level, cds) {
    const url = new URL(parentURL + "/thesis/newproposal");

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
};
