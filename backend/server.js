// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const numbersRouter = require("./routes/numbers");

const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Routes
app.use("/api/numbers", numbersRouter);

// Start server
const PORT = 5000;
app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
