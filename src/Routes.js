const express = require("express");
// const { AuthRequired } = require("./Middlewares/Auth");
const AuthRoute = require("./Routers/Auth.Router");
const DeviceTokenRoute = require("./Routers/DeviceToken.Router")
const Promotions = require("./Routers/Promotions.Router")
const CustomerRewardsRouter = require("./Routers/CustomerRewards.Router");
const LoyaltyPointsRouter = require("./Routers/LoyaltyPoints.Router");
const BranchesRouter = require("./Routers/Branches.Router");
const BranchDealsRouter = require("./Routers/BranchDeals.Router");
const BranchMenuRouter = require("./Routers/BranchMenu.Router");
const DealsRouter = require("./Routers/Deals.Router");
const router = express.Router();

router.use("/", AuthRoute);
router.use("/device-token", DeviceTokenRoute);
router.use("/promotions", Promotions);
router.use("/customers", CustomerRewardsRouter);
router.use("/points", LoyaltyPointsRouter);
router.use("/branches", BranchesRouter);
router.use("/branch-deals", BranchDealsRouter);
router.use("/branch-menu", BranchMenuRouter);
router.use("/deals", DealsRouter);

module.exports = router;
