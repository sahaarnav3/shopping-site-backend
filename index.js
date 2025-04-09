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
          "Error fetching category by ID. Either no category present or some other error. Please try again.",
      });
    else res.status(200).json({ data: { category: categoryData } });
  } catch (error) {
    res.status(500).json({
      error:
        "Some error occurred with the request itself. Please check logs and try again.",
    });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});
