const { initStripe } = require("../stripe");
const stripe = initStripe();
const CLIENT_URL = process.env.CLIENT_URL;
const User = require("../model/User");

const createCheckoutSession = async (req, res) => {
  const { amount, userId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: "price_1ONJHsDTXgg9R4l7KjBeGu4n",
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${CLIENT_URL}/confirmation`,
      cancel_url: `${CLIENT_URL}`,
    });

    res.json({ url: session.url, sessionId: session.id, session: session });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Create session failed", message: error.message });
  }
};

const verifySession = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      const userId = "657a087463e46863af742a27";
      const user = await User.findById(userId);

      user.balance += session.amount_total;
      console.log(user);
      await user.save();
    }

    res.status(200).json({ verified: true });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Payment verification failed", message: error.message });
  }
};

module.exports = { createCheckoutSession, verifySession };
