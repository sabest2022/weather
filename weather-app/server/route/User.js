const express = require("express");
const { googleLogin } = require("../controller/User");

const userRouter = express.Router().post("/google-login", googleLogin);

module.exports = { userRouter };
