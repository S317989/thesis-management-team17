'use strict';
const db = require("../Database/DAO");

//User_Id,Title,Message

module.exports = {
    addNotification: async function (userId, title, message) {
        await db.executeQuery(`Insert Into Notifications (User_Id, Title, Message) Values (?, ?, ?)`, [userId, title, message]);
    },

    setNotificationAsRead: async function (notificationId) {
        await db.executeQuery('UPDATE Notifications SET Read=1 WHERE Id=?', [notificationId]);
    },

    getUserNotifications: async function (userId) {
        var results = await db.getData(`SELECT * FROM Notifications WHERE User_Id=?`, [userId]);
        return await this.getThesesLinkedData(results);
    },

    removeNotification: async function (notificationId) {
        await db.executeQuery('DELETE FROM Notifications WHERE Id=?', [notificationId]);
    },

    removeAllRead: async function (userId) {
        await db.executeQuery('DELETE FROM Notifications WHERE User_Id=? AND Read=1', [userId]);
    },
};