'use strict';
const db = require("../Database/DAO");
const nodemailer = require('nodemailer');

//User_Id,Title,Message

module.exports = {
    addNotification: async function (userId, title, message) {
        await db.executeQuery(`Insert Into Notifications (User_Id, Title, Message) Values (?, ?, ?)`, [userId, title, message]);
        const userEmail = (await db.getOne(`SELECT Email FROM 
                                            (SELECT Id, Email FROM Teacher UNION SELECT Id, Email FROM Student)
                                            WHERE Id = ?`, [userId])).Email
        await this.sendEmail(userEmail, title, message);
    },

    sendEmail(email, title, message) {
        return new Promise((resolve, reject) => {
            var transporter = nodemailer.createTransport({
                service: 'hotmail',
                auth: {
                    user: 'thesis-no-reply@outlook.com',
                    pass: 'jb4eabMSduAZJmR'
                }
            });

            var mailOptions = {
                from: 'thesis-no-reply@outlook.com',
                to: email,
                subject: title,
                text: message
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    resolve(info);
                }
            });
        });
    },

    setNotificationAsRead: async function (notificationId) {
        await db.executeQuery('UPDATE Notifications SET Read=1 WHERE Id=?', [notificationId]);
    },

    getUserNotifications: async function (userId) {
        return await db.getData(`SELECT * FROM Notifications WHERE User_Id=?`, [userId]);
    },

    removeNotification: async function (notificationId) {
        await db.executeQuery('DELETE FROM Notifications WHERE Id=?', [notificationId]);
    },

    removeAllRead: async function (userId) {
        await db.executeQuery('DELETE FROM Notifications WHERE User_Id=? AND Read=1', [userId]);
    },
};