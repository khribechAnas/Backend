const NotificationsModel = require("../models/notificationsModel");

class NotificationController {
  async getAllNotifications(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 3;
      const itemsPerPage = parseInt(req.query.itemsPerPage) || 2;
      const totalItems = pageSize * itemsPerPage;
      const skip = (page - 1) * totalItems;
      //Filters
      const filters = {};
      if (req.query.status) {
        filters.status = req.query.status;
      }
      const notifications = await NotificationsModel.find(filters)
        .skip(skip)
        .limit(totalItems);
      //pagination
      const paginatedNotifications = [];
      for (let i = 0; i < totalItems; i += itemsPerPage) {
        paginatedNotifications.push(notifications.slice(i, i + itemsPerPage));
        return res.status(200).json({ paginatedNotifications });
      }
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
