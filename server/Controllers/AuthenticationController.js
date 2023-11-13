'use strict';

const passport = require('passport');

module.exports = {
    /*login: function (req, res) {
        passport.authenticate('local', (err, user, info) => {
            if (err) return res.status(500).json({ message: err.message });
            else if (!user) return res.status(401).json({ message: info.message });
            else req.login(user, (err) => {
                if (err) res.status(500).json({ message: err.message });
                else res.status(200).json(user);
            }
            );
        })(req, res);
    },*/

    session: (req, res) => {
        req.isAuthenticated() ? res.status(200).json({
            id: req.user.id, username: req.user.email
        }) : res.status(401).json({ errorMessage: 'Unauthorized' });
    },

    logout: (req, res) => {
        req.isAuthenticated() ? req.logout(() => {
            res.status(200).json({ message: 'Logout successful' });
        }) : res.status(401).json({ message: 'Forbidden' });
    }
}