const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

require("dotenv").config();
const database = require("./database/config");
const { userRouter } = require("./route/User");
const { checkoutRouter } = require("./route/Checkout");
const { paymentRouter } = require("./route/Payment");

const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(
  cookieSession({
    name: "session",
    keys: ["aVeryS3cr3tK3y"],
    maxAge: 1000 * 60 * 60 * 24, // 24 Hours
    sameSite: "strict",
    httpOnly: true,
    secure: false,
  })
);

app.use("/api", userRouter);
app.use("/api", checkoutRouter);
app.use("/api", paymentRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
