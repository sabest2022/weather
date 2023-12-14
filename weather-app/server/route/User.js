const express = require("express");
const { googleLogin, googleLogout, googleAuth } = require("../controller/User");

const userRouter = express
  .Router()
  .post("/google-login", googleLogin)
  .post("/google-logout", googleLogout)
  .get("/google-authorize", googleAuth);

module.exports = { userRouter };
