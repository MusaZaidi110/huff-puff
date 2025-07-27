const LoyaltyReward = require("../../Models/LoyaltySystem/LoyaltyReward.Model");


// Get points to currency conversion
async function getPointsToCurrencyRatio() {
  try {
    const reward = await LoyaltyReward.findOne({
      attributes: ["point_to_dhram_ratio"],
      order: [["created_at", "DESC"]],
    });

    return reward ? reward.point_to_dhram_ratio : 100; // Default to 100:1 if not set
  } catch (error) {
    console.error("Error getting points ratio:", error);
    throw error;
  }
}

// Convert points to currency value
async function convertPointsToCurrency(points) {
  try {
    const ratio = await getPointsToCurrencyRatio();
    return points / ratio;
  } catch (error) {
    console.error("Error converting points:", error);
    throw error;
  }
}

// Convert currency to points
async function convertCurrencyToPoints(amount) {
  try {
    const ratio = await getPointsToCurrencyRatio();
    return Math.floor(amount * ratio);
  } catch (error) {
    console.error("Error converting currency to points:", error);
    throw error;
  }
}

module.exports = {
  getPointsToCurrencyRatio,
  convertPointsToCurrency,
  convertCurrencyToPoints,
};
