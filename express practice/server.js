const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/products");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 3000;

const mongoUser = process.env.MONGO_USER;
const mongoHost = process.env.MONGO_HOST; 
const mongoPass = process.env.MONGO_PASS;
const mongoOptions =
  process.env.MONGO_OPTIONS || "?retryWrites=true&w=majority&appName=Cluster0";

const url =
  process.env.MONGO_URL ||
  `mongodb+srv://${mongoUser}:${mongoPass}@${mongoHost}/${mongoOptions}`;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("err", err);
  });

// Body-parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/add-product", async (req, res) => {
  console.log("data", req.body);
  try {
    const { name, price, description, category } = req.body;
    const product = new Product({ name, price, description, category });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`);
});
