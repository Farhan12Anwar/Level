// models/NumberState.js
const mongoose = require("mongoose");

const numberStateSchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true }, // Make sure number is unique
  color: { type: String, default: "green" }, // Default color is white
});

const NumberState = mongoose.model("NumberState", numberStateSchema);

module.exports = NumberState;
