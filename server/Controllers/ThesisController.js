const thesis = require('../Models/Thesis');

module.exports = {
    applyForProposal: async function (req, res) {
        try {
            if (req.isAuthenticated() && req.user.role === 'Student') {
                await thesis.applyForProposal('1', req.user.id);
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
}