const express = require("express");
const {
  googleLogin,
  googleLogout,
  googleAuth,
  getUser,
} = require("../controller/User");

const userRouter = express
  .Router()
  .post("/google-login", googleLogin)
  .post("/google-logout", googleLogout)
  .get("/google-authorize", googleAuth)
  .get("/user/:id", getUser);

module.exports = { userRouter };
