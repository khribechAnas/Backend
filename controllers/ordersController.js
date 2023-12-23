// ordersController.js
const OrderModel = require('../models/orderModel');


class OrderController {
  async getAllOrders(req, res) {
    try {
      const orders = await OrderModel.find();
      res.status(200).json({ orders });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getOrderByUserId(req, res) {
    try {
      const { userId } = req.params;
      const orders = await OrderModel.find({ userId });

      res.status(200).json({ orders });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateOrder(req, res) {
    try {
      const { orderId } = req.params;
      const updatedOrder = await OrderModel.findByIdAndUpdate(orderId, req.body, { new: true });

      if (!updatedOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.status(200).json({ message: 'Order updated successfully', updatedOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async addOrder(req, res) {
    try {
      const newOrder = await OrderModel.create(req.body);
      res.status(201).json(newOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  async getOrderById(req, res) {
    try {
      const { orderId } = req.params;
      const order = await OrderModel.findById(orderId);

      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.status(200).json({ order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteOrder(req, res) {
    try {
      const { orderId } = req.params;
      const removedOrder = await OrderModel.findByIdAndDelete(orderId);

      if (!removedOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.status(200).json({ message: 'Order removed successfully', removedOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = OrderController;

