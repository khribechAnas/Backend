const AccountModel = require("../models/AccountModel");

class AccountController {
  async getAllAccount(req, res) {
    try {
      const accounts = await AccountModel.find({});
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
