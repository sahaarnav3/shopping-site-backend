const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGODB;

const initialiseDatabase = () => {
  mongoose
    .connect(mongoUri)
    .then(() => console.log("MongoDB Connected Successfully."))
    .catch(error => console.log("Error Connecting to Database:", error));
};

module.exports = { initialiseDatabase };