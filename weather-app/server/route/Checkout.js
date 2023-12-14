const express = require("express");
const {
  createCheckoutSession,
  verifySession,
} = require("../controller/Checkout");

const checkoutRouter = express
  .Router()
  .post("/checkout", createCheckoutSession)
  .post("/verify", verifySession);

module.exports = { checkoutRouter };
