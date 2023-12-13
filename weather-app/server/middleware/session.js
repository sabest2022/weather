const session = require("express-session");

const session = session({
  secret: "your-secret-key",
  resave: false,
  saveUninitialized: true,
});

module.exports = session;
