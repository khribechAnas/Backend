const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
    {
        code : {
            type: String,
            required: [true, "please enter the code"],
        },
        description : {
            type: String,
        },
        discountType : {
            type: String,
        },
        discountValue : {
            type: Number,
        },
        validForm : {
            type: Date,
        },
        validUntil : {
            type: Date,
        },
        usageLimit : {
            type: Number,
        },
        applicableProducts : {
            type: Array,
        },

        productId: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
    }
)

const offerModel = mongoose.model("offer", offerSchema)
module.exports = offerModel;