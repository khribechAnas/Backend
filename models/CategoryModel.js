const mongoose = require ('mongoose');

const accountSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
  },
  parentCategory: String,
  isActive: Boolean
} ,
{timestamps: true}
);

const AccountModel = mongoose.model('Account', accountSchema);

module.exports = AccountModel;