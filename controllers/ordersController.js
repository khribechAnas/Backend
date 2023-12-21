// ordersController.js
const OrderModel = require('../models/OrderModel');

class OrderController {
  async createOrder(req, res) {
    try {
      const newOrder = await OrderModel.create(req.body);
      res.status(201).json({ success: true, data: newOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }

  async getOrder(req, res) {
    try {
      const { id } = req.params;
      const order = await OrderModel.findById(id);

      if (!order) {
        return res.status(404).json({ success: false, error: 'Order not found' });
      }

      res.status(200).json({ success: true, data: order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }

  async updateOrder(req, res) {
    try {
      const { id } = req.params;
      const updatedOrder = await OrderModel.findByIdAndUpdate(id, req.body, { new: true });

      if (!updatedOrder) {
        return res.status(404).json({ success: false, error: 'Order not found' });
      }

      res.status(200).json({ success: true, data: updatedOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }

  async deleteOrder(req, res) {
    try {
      const { id } = req.params;
      const deletedOrder = await OrderModel.findByIdAndRemove(id);

      if (!deletedOrder) {
        return res.status(404).json({ success: false, error: 'Order not found' });
      }

      res.status(200).json({ success: true, message: 'Order deleted successfully', data: deletedOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }

  async getAllOrders(req, res) {
    try {
      const orders = await OrderModel.find();
      res.status(200).json({ success: true, data: orders });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }
}

// module.exports = new OrderController();
module.exports = OrderController;
