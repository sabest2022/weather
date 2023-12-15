const User = require("../model/User");

async function providePaidService(req, res) {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.balance <= 0) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    user.balance -= 100;
    await user.save();

    res.status(200).json({ message: "Service provided" });
  } catch (error) {
    res
      .status(401)
      .json({ error: "Pay service failed", message: error.message });
  }
}
module.exports = { providePaidService };
