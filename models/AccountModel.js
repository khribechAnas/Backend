const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
      fullname : {
        type : String,
        required : [true, "please enter the fullname"]
      },
      email : {
        type : String,
        required : [true, "please enter the email"]
      },
      password : {
        type : String,
        required : [true, "please enter the password"]
      },
      phoneNumber : {
        type : String,
        required : [true, "please enter the phone"]
      },
      address : {
        type : String,
        required : [true, "please enter the address"]
      },
      isAdmin : {
        type : Boolean,
        default : false
      },
      lastLogin : {
        type : Date,
        default : Date.now
      },
      wishlist : {
        type : Array,
        default : []
      },
      resetPasswordToken : {
        type : String,
        required : [true, "please enter the reserPasswordToken"]
      },
      resetPasswordExpires : {
        type : Date,
        default : Date.now
      }
},  
    {timestamps: true}
);

const AccountModel = mongoose.model('Account', accountSchema);

module.exports = AccountModel;
