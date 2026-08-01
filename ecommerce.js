const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb+srv://vanisenthil140_db_user:S7SWmPs1zdHf2MTB@cluster0.v3mto3v.mongodb.net")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

// Schema
const ProductSchema = new mongoose.Schema({
  name: String,
  id: Number,
  price: Number,
  description: String,
  image: String,
});

// Model
const Product = mongoose.model("Product", ProductSchema);

// Insert Product
app.post("/getProducts", async (req, res) => {
  try {
    const { name, id, price, description, image } = req.body;

    const newProduct = new Product({
      name,
      id,
      price,
      description,
      image,
    });

    await newProduct.save();

    res.status(201).send(newProduct);
  } catch (err) {
    res.status(500).send("Error saving product");
  }
});

// Get All Products
app.get("/getProducts", async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (err) {
    res.status(500).send("Error retrieving products");
  }
});

// Get Product by MongoDB _id
app.get("/getProducts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).send("Product Not Found");
    }

    res.send(product);
  } catch (err) {
    res.status(500).send("Error retrieving product");
  }
});

// Server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});