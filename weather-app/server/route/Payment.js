const express = require("express");
const { providePaidService } = require("../controller/Payment");

const paymentRouter = express
  .Router()
  .post("/paid-service/:id", providePaidService);

module.exports = { paymentRouter };
