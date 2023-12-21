const express = require('express');
const mongoose = require ('mongoose');
const dotenv = require ('dotenv');
const authRouter = require ('./routes/authRoutes.js');
const categoryRouter = require ('./routes/categoryRoutes.js');
const productRouter = require ('./routes/productRoutes.js');

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
.connect('mongodb+srv://oguernan:k8k6Wk6TSpEhLO9x@cluster0.eprqb61.mongodb.net/?retryWrites=true&w=majority')
.then(
  () => {console.log("MongoDB connected")}
).catch ((error) => {
  console.log(error)
})

