const TransactionsModel = require("../models/TransactionsModel");

class TransactionsController {
  async createTransaction(req, res) {
    try {
      const newTransaction = await TransactionsModel.create(req.body);
      res.status(201).json({
        success: true,
        message: "Transaction created successfully",
        transaction: newTransaction,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAllTransactions(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 3;
      const itemsPerPage = parseInt(req.query.itemsPerPage) || 2;
      const totalItems = pageSize * itemsPerPage;
      const skip = (page - 1) * totalItems;

      // Filters
      const filters = {};
      if (req.query.paymentMethod) {
        filters.paymentMethod = req.query.paymentMethod;
      }
      if (req.query.status) {
        filters.status = req.query.status;
      }

      const transactions = await TransactionsModel.find(filters)
        .skip(skip)
        .limit(totalItems);

      // Pagination
      const paginatedTransactions = [];
      for (let i = 0; i < totalItems; i += itemsPerPage) {
        paginatedTransactions.push(transactions.slice(i, i + itemsPerPage));
        return res.status(200).json({ paginatedTransactions });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getTransaction(req, res) {
    try {
      const { id } = req.params;
      const transaction = await TransactionsModel.findById(id);

      if (!transaction) {
        return res.status(404).json({ error: "Transaction not found" });
      }

      res.status(200).json(transaction);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getTransactionByOrderId(req, res) {
    try {
      const { orderId } = req.params;
      const transactions = await TransactionsModel.find({ orderId });

      res.status(200).json(transactions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getTransactionByUserId(req, res) {
    try {
      const { userId } = req.params;
      const transactions = await TransactionsModel.find({ userId });

      res.status(200).json(transactions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateTransaction(req, res) {
    try {
      const { id } = req.params;
      const updatedTransaction = await TransactionsModel.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );

      if (!updatedTransaction) {
        return res.status(404).json({ error: "Transaction not found" });
      }

      res.status(200).json(updatedTransaction);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteTransaction(req, res) {
    try {
      const { id } = req.params;
      const deletedTransaction = await TransactionsModel.findByIdAndDelete(id);

      if (!deletedTransaction) {
        return res.status(404).json({ error: "Transaction not found" });
      }

      res.status(200).json({
        message: "Transaction deleted successfully",
        deletedTransaction,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new TransactionsController();
