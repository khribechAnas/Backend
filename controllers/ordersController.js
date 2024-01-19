// ordersController.js
const OrderModel = require("../models/orderModel");
const stripe = require("stripe")(process.env.STRIPE_KEY);
class OrderController {
  async getAllOrders(req, res) {
    try {
      const orders = await OrderModel.find();
      res.status(200).json({ orders });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getOrderByUserId(req, res) {
    try {
      const { userId } = req.params;
      const orders = await OrderModel.find({ userId });

      res.status(200).json({ orders });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateOrder(req, res) {
    try {
      const { orderId } = req.params;
      const updatedOrder = await OrderModel.findByIdAndUpdate(
        orderId,
        req.body,
        { new: true }
      );

      if (!updatedOrder) {
        return res.status(404).json({ error: "Order not found" });
      }

      res
        .status(200)
        .json({ message: "Order updated successfully", updatedOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async addOrder(req, res) {
    try {
      const newOrder = await OrderModel.create(req.body);
      res.status(201).json(newOrder);

      ///
      // const session = await stripe.checkout.sessions.create({
      //   line_items: [
      //     {
      //       // name: req.user.name,
      //       // price: cart.cartItems[0]._id,
      //       // currency: "mad",
      //       // quantity: 1,
      //       price_data: {
      //         currency: "mad",
      //         product_data: {
      //           name: "req.body.userId",
      //         },
      //         unit_amount: 100 * 100,
      //       },
      //       quantity: 1,
      //     },
      //   ],
      //   mode: "payment",
      //   success_url: `${req.protocol}://${req.get("host")}/orders`,
      //   cancel_url: `${req.protocol}://${req.get("host")}/cart`,
      //   // customer_email: req.user.email,
      //   // client_reference_id: req.params.cartId,
      //   // metadata: req.body.shippingAddress,
      // });
      ///
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getOrderById(req, res) {
    try {
      const { orderId } = req.params;
      const order = await OrderModel.findById(orderId);

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      res.status(200).json({ order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteOrder(req, res) {
    try {
      const { orderId } = req.params;
      const removedOrder = await OrderModel.findByIdAndDelete(orderId);

      if (!removedOrder) {
        return res.status(404).json({ error: "Order not found" });
      }

      res
        .status(200)
        .json({ message: "Order removed successfully", removedOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = OrderController;
