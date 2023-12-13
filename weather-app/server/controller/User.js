const { OAuth2Client } = require("google-auth-library");
const User = require("../model/User");

const client = new OAuth2Client(
  "152826738328-2gschac9945q44ilfue2n9c6d19nt296.apps.googleusercontent.com"
);

async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience:
      "152826738328-2gschac9945q44ilfue2n9c6d19nt296.apps.googleusercontent.com",
  });
  return ticket.getPayload();
}

async function googleLogin(req, res) {
  try {
    console.log("it triggers server!");
    const { token } = req.body;
    const googleUser = await verify(token);
    console.log("User Verified:", googleUser);

    let user;

    try {
      user = await User.findOne({ email: googleUser.email });

      if (user) {
        console.log("Found user,", user);
      } else {
        user = await User.create({
          name: googleUser.name,
          email: googleUser.email,
          imageUrl: googleUser.picture,
          balance: 0,
        });

        console.log("User created!");
      }
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
      return;
    }

    res.status(200).json({ message: "User authenticated", user });
  } catch (error) {
    console.log("Authentication failed:", error);
    res.status(401).json({ message: "Authentication failed" });
  }
}

module.exports = { googleLogin };
