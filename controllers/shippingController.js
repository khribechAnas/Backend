// shippingController.js
const ShippingModel = require('../models/ShippingModel');

class ShippingController {
  async createShipping(req, res) {
    try {
      const newShipping = await ShippingModel.create(req.body);
      res.status(201).json({ success: true, data: newShipping });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }

  async getShipping(req, res) {
    try {
      const { id } = req.params;
      const shipping = await ShippingModel.findById(id);

      if (!shipping) {
        return res.status(404).json({ success: false, error: 'Shipping not found' });
      }

      res.status(200).json({ success: true, data: shipping });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }
  async getShippingByOrderId(req, res) {
    try {
      const { orderId } = req.params;
      const shipping = await ShippingModel.findOne({ orderId });

      if (!shipping) {
        return res.status(404).json({ success: false, error: 'Shipping not found for the specified order ID' });
      }

      res.status(200).json({ success: true, data: shipping });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }

  async updateShipping(req, res) {
    try {
      const { id } = req.params;
      const updatedShipping = await ShippingModel.findByIdAndUpdate(id, req.body, { new: true });

      if (!updatedShipping) {
        return res.status(404).json({ success: false, error: 'Shipping not found' });
      }

      res.status(200).json({ success: true, data: updatedShipping });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }

  async deleteShipping(req, res) {
    try {
      const { id } = req.params;
      const deletedShipping = await ShippingModel.findByIdAndDelete(id);

      if (!deletedShipping) {
        return res.status(404).json({ success: false, error: 'Shipping not found' });
      }

      res.status(200).json({ success: true, message: 'Shipping deleted successfully', data: deletedShipping });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }

  async getAllShippings(req, res) {
    try {
      const shippings = await ShippingModel.find();
      res.status(200).json({ success: true, data: shippings });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }
}

module.exports = new ShippingController();
