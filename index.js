const express = require('express');
const mongoose = require ('mongoose');
const dotenv = require ('dotenv');
const authRouter = require ('./routes/authRoutes.js');
const categoryRouter = require ('./routes/categoryRoutes');
const productRouter = require ('./routes/productRoutes');

dotenv.config();
const PORT = process.env.PORT || 5001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/categories", categoryRouter);
app.use("/products", productRouter);


app.get("/", (req, res) => {
  res.json("App worked successfully");
});

app.listen(PORT, () => console.log(`App running on port ${PORT}`));

mongoose
.connect('mongodb+srv://oguernan:othmane123@cluster0.xf0uh4u.mongodb.net/Data_ecom')
.then(
  () => {console.log("MongoDB connected")}
).catch ((error) => {
  console.log(error)
})

