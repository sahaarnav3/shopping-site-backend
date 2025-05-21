const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

const { initialiseDatabase } = require("./db/db.connect");
const Product = require("./models/product.models");
const Category = require("./models/category.models");
const Address = require("./models/address.models");
const Order = require("./models/order.models");

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

//To add a product with particular specification ( could be size or anything else) in cart
app.post("/api/products/add-to-cart/:productId/:specs", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product)
      return res
        .status(404)
        .json({ message: "Product not found. Try again with correct ID" });

    const updateObject = {
      $set: {
        addedToCart: [...product.addedToCart, req.params.specs],
      },
    };
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      updateObject,
      { new: true, runValidators: true } // new: true will return new updated object. runValidator to run and follow the rules you mention in Schema.
    );
    if (!updatedProduct)
      res.status(404).json({
        error: "Error adding product to cart. Please try again.",
      });
    else res.status(200).json({ message: "Item Added To Cart Successfully." });
  } catch (err) {
    console.log(err);
    req.status(500).json({
      error:
        "Some error occurred with the request itself. Please check the logs and try again.",
    });
  }
});

//To remove a product with particular specification ( could be size or anything else) from cart
app.post(
  "/api/products/remove-from-cart/:productId/:specs",
  async (req, res) => {
    try {
      const product = await Product.findById(req.params.productId);
      if (!product)
        return res
          .status(404)
          .json({ message: "Product not found. Try again with correct ID" });

      const updateObject = {
        $set: {
          addedToCart: product.addedToCart.filter(
            (size) => size != req.params.specs
          ),
        },
      };
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.productId,
        updateObject,
        { new: true, runValidators: true } // new: true will return new updated object. runValidator to run and follow the rules you mention in Schema.
      );
      if (!updatedProduct)
        res.status(404).json({
          error: "Error removing product from cart. Please try again.",
        });
      else
        res
          .status(200)
          .json({ message: "Item Removed From Cart Successfully." });
    } catch (err) {
      console.log(err);
      req.status(500).json({
        error:
          "Some error occurred with the request itself. Please check the logs and try again.",
      });
    }
  }
);

//Route to remove all items from cart.

//Route to fetch all products present in cart.
app.get("/api/products/get-cart-items/cart", async (req, res) => {
  try {
    const productsInCart = await Product.find({
      addedToCart: { $exists: true }, // Optional: Ensure the field exists
      $expr: {
        $gt: [{ $size: "$addedToCart" }, 0],
      },
    });
    if (!productsInCart)
      res.status(404).json({
        error: "Error fetching items in cart. Please try again.",
      });
    else res.status(200).json({ cartItems: productsInCart });
  } catch (error) {
    console.log(error);
    req.status(500).json({
      error:
        "Some error occurred with the request itself. Please check the logs and try again.",
    });
  }
});

//Route to add new address
app.post("/api/address/add-new-address", async (req, res) => {
  try {
    const address = new Address(req.body);
    const saveAddress = await address.save();
    if (!saveAddress)
      res.status(404).json({
        error:
          "Please check data format and try again. Check logs for more details",
      });
    else res.status(200).json({ message: "Address Added Successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error:
        "Some error occurred with the request itself or some entry is missing. Please check logs and try again.",
    });
  }
});

//Route to fetch all addresses
app.get("/api/address/get-all-address", async (req, res) => {
  try {
    const addressData = await Address.find();
    if (!addressData)
      res.status(404).json({
        error:
          "Error fetching Addresses. Either no Address present or some other error. Please try again.",
      });
    else res.status(200).json({ addresses: addressData });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error:
        "Some error occurred with the request itself. Please check logs and try again.",
    });
  }
});

//Route to delete address
app.delete("/api/address/delete-address/:addressID", async (req, res) => {
  try {
    const addressData = await Address.findByIdAndDelete(req.params.addressID);
    if (!addressData)
      res.status(404).json({
        error:
          "Error deleting Addresses. Either no Address present or some other error. Please try again.",
      });
    else res.status(200).json({ message: "Address Deleted Successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error:
        "Some error occurred with the request itself. Please check logs and try again.",
    });
  }
});

//Route to change default address.
app.patch("/api/address/edit-default/:addressID", async (req, res) => {
  try {
    const existingDefault = await Address.findOneAndUpdate(
      { defaultAddress: true },
      { defaultAddress: false }
    );
    const newDefault = await Address.findByIdAndUpdate(
      req.params.addressID,
      { defaultAddress: true }, //include other fields in the update as well if needed
      { new: true } // Return the updated document
    );
    if (!newDefault) {
      res.status(400).json({
        message:
          "Given address not found or some other error occurred. Check logs.",
      });
    } else
      res
        .status(200)
        .json({ message: "Default Address Updated Successfully." });
  } catch (error) {
    console.error("Error setting default address:", error);
    res.status(500).json({
      error:
        "Some error occurred with the request itself. Please check logs and try again.",
    });
  }
});

//Route to fetch the default address.
app.get("/api/address/fetch-default-address", async (req, res) => {
  try {
    const addressData = await Address.findOne({ defaultAddress: true });
    if (!addressData)
      res.status(404).json({
        error:
          "Error fetching Default Addresses. Either no Address present or some other error. Please try again.",
      });
    else res.status(200).json({ addresses: addressData });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error:
        "Some error occurred with the request itself. Please check logs and try again.",
    });
  }
});

//Route to create a new Order Entry
app.post("/api/orders/create-new-order", async (req, res) => {
  try {
    const order = new Order(req.body);
    const saveOrder = await order.save();
    if (!saveOrder)
      res.status(404).json({
        error:
          "Please check data format and try again. Check logs for more details",
      });
    else res.status(200).json({ message: "Order Added Successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error:
        "Some error occurred with the request itself or some entry is missing. Please check logs and try again.",
    });
  }
});

//Route to Fetch all past orders.
app.get("/api/orders/get-all-orders", async(req, res) => {
  try {
    const orderData = await Order.find();
    if (!orderData)
      res.status(404).json({
        error:
          "Error fetching Orders. Either no Order present or some other error. Please try again.",
      });
    else res.status(200).json({ orders: orderData });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error:
        "Some error occurred with the request itself. Please check logs and try again.",
    });
  }
})

app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});
