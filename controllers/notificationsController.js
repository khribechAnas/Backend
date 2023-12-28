const NotificationsModel = require("../models/notificationsModel");

class NotificationController {
  async getAllNotifications(req, res) {
    try {
      const notifications = await NotificationsModel.find();
      res.status(200).json({ notifications });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getNotificationById(req, res) {
    try {
      const { notificationId } = req.params;
      const notification = await NotificationsModel.findById(notificationId);

      if (!notification) {
        return res.status(404).json({ error: 'Notification not found' });
      }

      res.status(200).json({ notification });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getNotificationsByUserId(req, res) {
    try {
      const { userId } = req.params;
      const notifications = await NotificationsModel.find({ userId });

      res.status(200).json({ notifications });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateNotification(req, res) {
    try {
      const { notificationId } = req.params;
      const updatedNotification = await NotificationsModel.findByIdAndUpdate(
        notificationId,
        req.body,
        { new: true }
      );

      if (!updatedNotification) {
        return res.status(404).json({ error: 'Notification not found' });
      }

      res.status(200).json({ message: 'Notification updated successfully', updatedNotification });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async addNotification(req, res) {
    try {
      const newNotification = await NotificationsModel.create(req.body);
      res.status(201).json(newNotification);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteNotification(req, res) {
    try {
      const { notificationId } = req.params;
      const removedNotification = await NotificationsModel.findByIdAndDelete(notificationId);

      if (!removedNotification) {
        return res.status(404).json({ error: 'Notification not found' });
      }

      res.status(200).json({ message: 'Notification removed successfully', removedNotification });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = NotificationController;
