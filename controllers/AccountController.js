const AccountModel = require('../models/AccountModel');
const jwt = require('jsonwebtoken');
const secretKey = 'mao_digital'; 

class AccountController {
    async register(req, res) {
      try {
      const newAccount = await AccountModel.create(req.body);
      res.status(201).json(newAccount);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
    }

    async login(req, res) {
        try {
          const { email, password } = req.body;
          const account = await AccountModel.findOne({ email, password });
    
          if (!account) {
            return res.status(401).json({ error: 'Invalid email or password' });
          }
    
          // Generate a JWT token
          const token = jwt.sign({ accountId: account._id }, secretKey, { expiresIn: '1h' });
    
          // Update last login timestamp
          account.lastLogin = new Date();
          await account.save();
    
          // Send the token and account details in the response
          res.status(200).json({ token, account });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
      
      async logout(req, res) {
        try {
          const { token } = req.body;
          const decoded = jwt.verify(token, secretKey);
          const { accountId } = decoded;
          const account = await AccountModel.findById(accountId);
          account.lastLogin = new Date();
          await account.save();
          res.status(200).json({ message: 'Successfully logged out' });
          
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
        }
        
        async resetPassword(req, res) {
            try {
                const { token } = req.body;
                const decoded = jwt.verify(token, secretKey);
                const { accountId } = decoded;
                const account = await AccountModel.findById(accountId);
                account.resetPasswordToken = "";
                account.resetPasswordExpires = Date.now() + 3600000; // 1 hour
                await account.save();
                res.status(200).json({ message: 'Successfully reset password' });
                
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
            }
}
module.exports = AccountController;
