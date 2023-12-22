const express = require('express');
const mongoose = require ('mongoose');
const dotenv = require ('dotenv');
const authRouter = require ('./routes/authRoutes.js');
const categoryRouter = require ('./routes/categoryRoutes.js');
const productRouter = require ('./routes/productRoutes.js');

const notificationsRouter = require('./routes/notificationsRoutes.js')
const shippingRoutes = require('./routes/shippingRoutes.js')
const transactionsRoutes = require('./routes/transactionsRoutes.js');

// const ordersRouter = require('./routes/ordersRoutes.js')

const accountRouter = require ('./routes/accountRoutes');



dotenv.config();
const PORT = process.env.PORT || 5001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/accounts", accountRouter);
app.use("/categories", categoryRouter);
app.use("/products", productRouter);
app.use("/notifications",notificationsRouter);
app.use("/shipping",shippingRoutes);
app.use("/transactions",transactionsRoutes);
// app.use("/orders", ordersRouter);




app.get("/", (req, res) => {
  res.json("App worked successfully");
});

app.listen(PORT, () => console.log(`App running on port ${PORT}`));

mongoose
.connect('mongodb+srv://khribech:root2024@eshop-database.mbh6met.mongodb.net/?retryWrites=true&w=majority')
.then(
  () => {console.log("MongoDB connected")}
).catch ((error) => {
  console.log(error)
})

