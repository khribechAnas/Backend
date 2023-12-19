import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 5001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.json("App worked successfully");
});

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
