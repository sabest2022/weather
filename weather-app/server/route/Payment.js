const express = require("express");
const { providePaidService } = require("../controller/Payment");
const userRouter = express
    .Router()
    .get("/paid-service", providePaidService);
module.exports = { paymentRouter };