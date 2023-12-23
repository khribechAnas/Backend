const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/notificationsController');

const notificationController = new NotificationController();

router.get('/', notificationController.getAllNotifications);
router.get('/:notificationId', notificationController.getNotificationById);
router.get('/getByUserId/:userId', notificationController.getNotificationsByUserId);
router.put('/update/:notificationId', notificationController.updateNotification);
router.post('/add', notificationController.addNotification);
router.delete('/delete/:notificationId', notificationController.deleteNotification);

module.exports = router;
