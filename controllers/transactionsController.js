const TransactionsModel = require('../models/TransactionsModel');

class TransactionsController {
  async createTransaction(req, res) {
    try {
      const newTransaction = await TransactionsModel.create(req.body);
      res.status(201).json({
        success: true,
        message: 'Transaction created successfully',
        transaction: newTransaction,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getAllTransactions(req, res) {
    try {
      const transactions = await TransactionsModel.find();
      res.status(200).json(transactions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getTransaction(req, res) {
    try {
      const { id } = req.params;
      const transaction = await TransactionsModel.findById(id);

      if (!transaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }

      res.status(200).json(transaction);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getTransactionByOrderId(req, res) {
    try {
      const { orderId } = req.params;
      const transactions = await TransactionsModel.find({ orderId });

      res.status(200).json(transactions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getTransactionByUserId(req, res) {
    try {
      const { userId } = req.params;
      const transactions = await TransactionsModel.find({ userId });

      res.status(200).json(transactions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateTransaction(req, res) {
    try {
      const { id } = req.params;
      const updatedTransaction = await TransactionsModel.findByIdAndUpdate(id, req.body, { new: true });

      if (!updatedTransaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }

      res.status(200).json(updatedTransaction);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteTransaction(req, res) {
    try {
      const { id } = req.params;
      const deletedTransaction = await TransactionsModel.findByIdAndDelete(id);

      if (!deletedTransaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }

      res.status(200).json({ message: 'Transaction deleted successfully', deletedTransaction });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = new TransactionsController();
