// Auto-Apply Promotions in Orders
module.exports = applyPromotionIfAvailable = async (order) => {
  const now = new Date();
  const activePromotions = await Promotion.findAll({
    where: {
      isActive: true,
      startDate: { [Op.lte]: now },
      endDate: { [Op.gte]: now },
    },
  });

  if (activePromotions.length > 0) {
    const promo = activePromotions[0]; // You can refine logic if multiple
    if (promo.type === "discount") {
      order.totalAmount -= (order.totalAmount * promo.value) / 100;
    }
    if (promo.type === "free_delivery") {
      order.deliveryFee = 0;
    }
    order.appliedPromotionId = promo.id;
  }

  return order;
};



