const { Promotion, Item } = require('../../Models');


const getActivePromotions = async () =>  {
  const now = new Date();
  
  return await Promotion.findAll({
    where: {
      isActive: true,
      startDate: { [Op.lte]: now },
      endDate: { [Op.gte]: now }
    },
    include: [{
      model: Item,
      as: 'items',
      attributes: ['id', 'name', 'image_url'],
      through: { attributes: [] }
    }],
    order: [['createdAt', 'DESC']]
  });
}


module.exports = {getActivePromotions}