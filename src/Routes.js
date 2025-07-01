const express = require("express");
// const { AuthRequired } = require("./Middlewares/Auth");
const AuthRoute = require("./Routers/Auth.Router");
const DeviceTokenRoute = require("./Routers/DeviceToken.Router")
const Promotions = require("./Routers/Promotions.Router")

const router = express.Router();

router.use("/", AuthRoute);
router.use("/device-token", DeviceTokenRoute);
router.use("/promotions", Promotions);


module.exports = router;
