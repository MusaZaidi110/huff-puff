const express = require("express");
// const { AuthRequired } = require("./Middlewares/Auth");
const AuthRoute = require("./Routers/Auth.Router");
const DeviceTokenRoute = require("./Routers/DeviceToken.Router")
const Promotions = require("./Routers/Promotions.Router")
const CustomerRewardsRouter = require("./Routers/CustomerRewards.Router");
const LoyaltyPointsRouter = require("./Routers/LoyaltyPoints.Router");
const router = express.Router();

router.use("/", AuthRoute);
router.use("/device-token", DeviceTokenRoute);
router.use("/promotions", Promotions);
router.use("/customers", CustomerRewardsRouter);
router.use("/points", LoyaltyPointsRouter);

module.exports = router;
