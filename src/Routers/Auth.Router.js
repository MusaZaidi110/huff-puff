const express = require("express");
const router = express.Router();

// Implementation
const {
  createCustomerAuth,
} = require("../Functionality/Authentication/CreateUserAuth");
const {
  confirmRegistration,
} = require("../Functionality/Authentication/ConfirmRegistration");
const {
  loginCustomerAuth,
} = require("../Functionality/Authentication/LoginUserAuth");
const {
  forgotPassword,
} = require("../Functionality/Authentication/ForgetPassword");

// Validation
const Joi = require("joi");
const { validateRequest } = require("../Middlewares/ValidateRequest");

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const confirmRegistrationSchema = Joi.object({
  otp: Joi.number().integer().min(1000).max(9999).required(), // 4-digit integer OTP
});

router.post("/register", validateRequest(registerSchema), createCustomerAuth);

router.post(
  "/confirm-registration/:userId",
  validateRequest(confirmRegistrationSchema),
  confirmRegistration
);


router.post("/login", validateRequest(registerSchema), loginCustomerAuth);

router.post("/forget-password", forgotPassword);

module.exports = router;
