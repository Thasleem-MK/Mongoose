const mongoose = require("mongoose");
const contactSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "firtName is required"],
    minLength: 6,
    maxLength: 20,
    trim: true,
    validate: {
      validator: function (value) {
        const nameRegex = /^[a-zA-Z\s]*$/;
        return nameRegex.test(value);
      },
      message: "FirstName must contain only alphebetic characters!",
    },
  },
  lastName: {
    type: String,
    required: [true, "lastName is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    // unique: true,
  },
  age: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model("contact", contactSchema);
