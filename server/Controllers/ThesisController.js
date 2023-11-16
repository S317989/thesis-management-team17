const thesis = require('../Models/Thesis');

module.exports = {
    applyForProposal: async function (req, res) {
        try {
            if (req.isAuthenticated() && req.user.role === 'Student') {
                console.log(req.body);
                await thesis.applyForProposal(req.body.proposalId, req.user.id);
                return res.status(200).json({ Message: 'Application Added' });
            }
            else {
                return res.status(401).json({ errorMessage: 'Unauthorized' });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ errorMessage: err });
        }
    },

    getActiveThesisProposals: async function (req, res) {
        try {
            if (req.isAuthenticated() && req.user.role !== 'Student') {
                const result = await thesis.getThesisProposals('Active');
                return res.status(200).json(result);
            }
            else {
                return res.status(401).json({ errorMessage: 'Unauthorized' });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ errorMessage: err });
        }
    },

    getArchivedThesisProposals: async function (req, res) {
        try {
            if (req.isAuthenticated() && req.user.role !== 'Student') {
                const result = await thesis.getThesisProposals('Archived');
                return res.status(200).json(result);
            }
            else {
                return res.status(401).json({ errorMessage: 'Unauthorized' });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ errorMessage: err });
        }
    }
}