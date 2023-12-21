const NotificationsModel = require('../models/notificationsModel');

exports.createNotification = async (req, res) => {
  try {
    const notification = await NotificationsModel.create(req.body);
    res.status(201).json({ success: true, data: notification });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await NotificationsModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!notification) {
      return res.status(404).json({ success: false, error: 'Notification not found' });
    }

    res.status(200).json({ success: true, data: notification });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
