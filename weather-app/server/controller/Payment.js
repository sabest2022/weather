const User = require("../model/User");

async function providePaidService(req, res) {
    if (!req.session || !req.session.user) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    const user = await User.findById(req.session.user._id);

    if (user.balance < COST_OF_SERVICE) {
        return res.status(400).json({ error: 'Insufficient balance' });
    }

    user.balance -= COST_OF_SERVICE;
    await user.save();

    // Provide the service here
    res.json({ message: 'Service provided' });
};
module.exports = { providePaidService };