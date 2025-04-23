const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

const { initialiseDatabase } = require("./db/db.connect");
const Product = require("./models/product.models");
const Category = require("./models/category.models");

const corsOption = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOption));
app.use(express.json());
initialiseDatabase();

app.get("/", (req, res) => {
  res.send("<h1>Hi, Welcome to homepage of this Backend App.</h1>");
});

//Route to add a Category entry into database.
app.post("/api/categories", async (req, res) => {
  try {
    const category = new Category(req.body);
    const saveCategory = await category.save();
    if (!saveCategory)
      res.status(404).json({
        error:
          "Please check data format and try again. Check logs for more details",
      });
    else res.status(200).json({ message: "Category Added Successfully." });
  } catch (error) {
    res.status(500).json({
      error:
        "Some error occurred with the request itself or the entry is already present. Please check logs and try again.",
    });
  }
});

//Route to fetch all Categories from database.
app.get("/api/categories", async (req, res) => {
  try {
    const categoryData = await Category.find();
    if (!categoryData)
      res.status(404).json({
        error:
          "Error fetching categories. Either no category present or some other error. Please try again.",
      });
    else res.status(200).json({ data: { categories: categoryData } });
  } catch (error) {
    res.status(500).json({
      error:
        "Some error occurred with the request itself. Please check logs and try again.",
    });
  }
});

//Route to fetch a Category by its ID from database.
app.get("/api/categories/:categoryId", async (req, res) => {
  try {
    const categoryData = await Category.findById(req.params.categoryId);
    if (!categoryData)
      res.status(404).json({
        error:
          "Error fetching category by ID. Either no category present or some other error. Please try again with correct ID.",
      });
    else res.status(200).json({ data: { category: categoryData } });
  } catch (error) {
    res.status(500).json({
      error:
        "Some error occurred with the request itself. Please check logs and try again.",
    });
  }
});

//Route to add Product entry in the database.
app.post("/api/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    const saveProduct = await product.save();
    if (!saveProduct) {
      console.log(saveProduct);
      res.status(404).json({
        error:
          "Please check data format and try again. Check logs for more details",
      });
    } else res.status(200).json({ message: "Product Added Successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error:
        "Some error occurred with the request itself. Please check logs and try again.",
    });
  }
});

//Route to fetch all products from the database.
app.get("/api/products", async (req, res) => {
  try {
    // const productsData = await Product.find().populate('category');
    const productsData = await Product.find().populate(
      "category",
      "categoryName"
    );
    if (!productsData)
      res.status(404).json({
        error:
          "Error fetching Products. Either no product present or some other error. Please try again.",
      });
    else res.status(200).json({ data: { products: productsData } });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error:
        "Some error occurred with the request itself. Please check logs and try again.",
    });
  }
});

//Route to fetch Product from the database by its ID.
app.get("/api/products/:productId", async (req, res) => {
  try {
    const productData = await Product.findById(req.params.productId);
    if (!productData)
      res.status(404).json({
        error:
          "Error fetching product by ID. Either no product present or some other error. Please try again with correct ID.",
      });
    else res.status(200).json({ data: { product: productData } });
  } catch (err) {
    console.log(err);
    req.status(500).json({
      error:
        "Some error occurred with the request itself. Please check the logs and try again.",
    });
  }
});

//Route to fetch products according to category.
app.get("/api/products/by-category/:category", async (req, res) => {
  try {
    const categoryData = await Category.findOne({
      categoryName: req.params.category,
    });
    if (!categoryData)
      return res
        .status(404)
        .json({ message: `Category '${req.params.category}' not found.` });
    const productData = await Product.find({ category: categoryData._id });
    if (!productData)
      res.status(404).json({
        error:
          "Error fetching product by ID. Either no product present or some other error. Please try again with correct ID.",
      });
    else res.status(200).json({ data: { products: productData } });
  } catch (err) {
    console.log(err);
    req.status(500).json({
      error:
        "Some error occurred with the request itself. Please check the logs and try again.",
    });
  }
});

//Route to add/remove (toggle) product from wishlist with product ID.
app.patch("/api/products/toggle-wishlist/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product)
      return res
        .status(404)
        .json({ message: "Product not found. Try again with correct ID" });

    const updateObject = {
      $set: {
        addedToWishlist: !product.addedToWishlist,
      },
    };
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      updateObject,
      { new: true, runValidators: true } // new: true will return new updated object. runValidator to run and follow the rules you mention in Schema.
    );
    if (!updatedProduct)
      res.status(404).json({
        error: "Error toggling wishlist status. Try again.",
      });
    else
      res
        .status(200)
        .json({ message: "Wishlist Status Toggled Successfully." });
  } catch (err) {
    console.log(err);
    req.status(500).json({
      error:
        "Some error occurred with the request itself. Please check the logs and try again.",
    });
  }
});

//Route to fetch only those products which are present in wishlist
app.get("/api/products/wishlist-items/wishlist", async (req, res) => {
  try {
    const productData = await Product.find({ addedToWishlist: true });
    if (!productData)
      res.status(404).json({
        error:
          "Error fetching product by wishlist. Check logs and please try again.",
      });
    else res.status(200).json({ data: { product: productData } });
  } catch (error) {
    console.log(err);
    req.status(500).json({
      error:
        "Some error occurred with the request itself. Please check the logs and try again.",
    });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});
