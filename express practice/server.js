const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/products");
const bodyparser = require("body-parser");
const app = express();
const PORT = 3000;

const url =
  "mongodb+srv://12345:12345@cluster0.b4sij.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
  console.log("Server Started");
});
