'use strict';

const notificationsServices = require('../Services/Notifications');

module.exports = {
    setNotificationAsRead: async function (req, res) {
        await thesisServices
            .setNotificationAsRead(req.body.notificationId)
            .then(() => {
                return res.status(200).json('status updated');
            })
            .catch((err) => {
                return res.status(500).json({ message: err.message });
            });
    },

    getUserNotifications: async function (req, res) {
        try {
            const results = await thesisServices.getUserNotifications(req.user.id);
            res.status(200).json(results);
        } catch (error) {
            return res.status(500);
        }
    },

    removeNotification: async function (req, res) {
        await notificationsServices
            .removeNotification(req.body.notificationId)
            .then(() => {
                return res.status(200).json('deleted');
            })
            .catch((err) => {
                return res.status(500).json({ message: err.message });
            });
    },

    removeAllRead: async function (req, res) {
        await notificationsServices
            .removeAllRead(req.body.notificationId)
            .then(() => {
                return res.status(200).json('deleted');
            })
            .catch((err) => {
                return res.status(500).json({ message: err.message });
            });
    },
};