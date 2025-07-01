const express = require("express");
const router = express.Router();
const {getActivePromotions} = require("../Functionality/Promotions/ActivePromotions");

router.route("/").get(getActivePromotions);

module.exports = router;