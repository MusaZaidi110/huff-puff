const express = require("express");
const router = express.Router();
const {
  createLoyaltyReward,
  getActiveLoyaltyRewards,
  updateLoyaltyReward,
  deleteLoyaltyReward,
} = require("../Functionality/LoyaltyPoints/LoyaltyRewards");

// Create a new loyalty reward (Admin only)
router.post("/rewards", async (req, res) => {
  try {
    const reward = await createLoyaltyReward(req.body);
    res.status(201).json(reward);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all active loyalty rewards
router.get("/rewards", async (req, res) => {
  try {
    const rewards = await getActiveLoyaltyRewards();
    res.json(rewards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a loyalty reward (Admin only)
router.put("/rewards/:id", async (req, res) => {
  try {
    const reward = await updateLoyaltyReward(req.params.id, req.body);
    res.json(reward);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a loyalty reward (Admin only)
router.delete("/rewards/:id", async (req, res) => {
  try {
    await deleteLoyaltyReward(req.params.id);
    res.json({ message: "Reward deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;