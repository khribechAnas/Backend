const AccountModel = require("../models/AccountModel");

class AccountController {
  async getAllAccount(req, res) {
    try {
      //pagination
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 5;
      const skip = (page - 1) * pageSize;
      // const accounts = await AccountModel.find().skip(skip).limit(pageSize);
      // Filters
      const filters = {};
      if (req.query.fullname) {
        filters.fullname = req.query.fullname;
      }
  
      if (req.query.email) {
        filters.email = req.query.email;
      }
  
      if (req.query.role) {
        filters.role = req.query.role;
      }

      const accounts = await AccountModel.find(filters)
        .skip(skip)
        .limit(pageSize);
      res.status(200).json(accounts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAccount(req, res) {
    try {
      const { id } = req.params;
      const account = await AccountModel.findById(id);
      res.status(200).json(account);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteAccount(req, res) {
    try {
      const { id } = req.params;
      const account = await AccountModel.findOneAndDelete(id);

      res.status(200).json("account deleted succefuly");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateAccount(req, res) {
    try {
      const { id } = req.params;
      const account = await AccountModel.findByIdAndUpdate(
        id,
        { ...req.body, password: await bcrypt.hash(req.body.password, 10) },
        { new: true }
      ); //new true afficher les donnees avant la mise ajour
      res.status(200).json(account);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = AccountController;
