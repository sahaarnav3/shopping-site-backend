const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

const { initialiseDatabase } = require("./db/db.connect");
const Product = require("./models/product.models");
const Category = require("./models/category.models");

const corsOption = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOption));
app.use(express.json());
initialiseDatabase();

app.get("/", (req, res) => {
    res.send("<h1>Hi, Welcome to homepage of this Backend App.</h1>");
})


app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
})