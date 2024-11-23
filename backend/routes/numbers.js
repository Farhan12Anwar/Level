// routes/numbers.js
const express = require("express");
const router = express.Router();
const NumberState = require("../models/NumberState");

// Get all number states
router.get("/", async (req, res) => {
  try {
    const states = await NumberState.find();
    res.json(states); // Send the data as JSON
  } catch (err) {
    console.error("Error fetching number states:", err);
    res.status(500).json({ error: "Failed to fetch number states." });
  }
});

// Update or create a number state
router.post("/", async (req, res) => {
  const { number, color } = req.body;

  if (!number || !color) {
    return res
      .status(400)
      .json({ error: "Both number and color are required." });
  }

  try {
    let state = await NumberState.findOne({ number });

    if (state) {
      // Update existing number state
      state.color = color;
      await state.save();
      res.json({ message: "Updated color", state });
    } else {
      // Create new number state
      state = new NumberState({ number, color });
      await state.save();
      res.status(201).json({ message: "Created new number state", state });
    }
  } catch (err) {
    console.error("Error updating or creating number state:", err);
    res.status(500).json({ error: "Failed to update or create number state." });
  }
});

module.exports = router;
