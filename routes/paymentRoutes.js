const express = require("express");
const app = express();
const router = express.Router();
require("dotenv").config();
// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_KEY);
app.use(express.static("public"));

router.post("/create-checkout-session", async (req, res) => {
  try {
    
    const products = req.body.products.map((product) => {
        return {
          price_data: {
            currency: "mad",
            product_data: {
              name: product.name,
              description: product.desc,
            },
            unit_amount: parseInt(product.amount) * 100,
          },
          quantity: product.quantity,
        }
    })

    const session = await stripe.checkout.sessions.create({
      currency: "mad",
      line_items: products,
      mode: "payment",
      success_url: "http://localhost:5001",
      cancel_url: "http://localhost:5001"
    });

    res.status(202).json({
        status: "success",
        session,
    });

  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
