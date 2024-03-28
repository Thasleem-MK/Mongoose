const express = require("express");
const mongoose = require("mongoose");
const body_parser = require("body-parser");

const app = express();
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

const contact=require('./Routes/Contact');
app.use('/api',contact)

//connect to MongoDB
const connectToDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/testdb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectToDb();

const port = 3000;

app.listen(port, () => {
  console.log("Server started successfully");
});
