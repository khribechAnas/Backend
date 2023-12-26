const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db/connect.js");
const authRouter = require("./routes/authRoutes.js");
const categoryRouter = require("./routes/categoryRoutes.js");
const productRouter = require("./routes/productRoutes.js");
const notificationsRouter = require("./routes/notificationsRoutes.js");
const shippingRoutes = require("./routes/shippingRoutes.js");
const transactionsRoutes = require("./routes/transactionsRoutes.js");
const accountRouter = require("./routes/accountRoutes");
const ordersRouter = require("./routes/ordersRoutes.js");
const offerRouter = require("./routes/offerRoutes.js");
const authJwt = require("./middleware/secureRoute");
dotenv.config();
const PORT = process.env.PORT;

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authJwt, authRouter);
app.use("/accounts", authJwt, accountRouter);
app.use("/categories", authJwt, categoryRouter);
app.use("/products", authJwt, productRouter);
app.use("/notifications", authJwt, notificationsRouter);
app.use("/shipping", authJwt, shippingRoutes);
app.use("/transactions", authJwt, transactionsRoutes);
app.use("/orders", authJwt, ordersRouter);
app.use("/offers", authJwt, offerRouter);

app.get("/", (req, res) => {
  res.json("App worked successfully");
});

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
