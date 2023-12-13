const express = require("express");
const cors = require("cors");

require("dotenv").config();
const database = require("./database/config");
const { userRouter } = require("./route/User");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
