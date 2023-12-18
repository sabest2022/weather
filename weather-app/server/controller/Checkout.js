const { initStripe } = require("../stripe");
const stripe = initStripe();
const CLIENT_URL = process.env.CLIENT_URL;
const User = require("../model/User");

const createCheckoutSession = async (req, res) => {
  const { product } = req.body;

  let priceId;

  switch (product) {
    case 100:
      priceId = "price_1ONJHsDTXgg9R4l7KjBeGu4n";
      break;
    case 250:
      priceId = "price_1ONLbwDTXgg9R4l7cxDijbt5";
      break;
    case 500:
      priceId = "price_1ONLcCDTXgg9R4l7HlqjLSHY";
      break;
    default:
      res.status(400).json({ error: "Invalid product" });
      return;
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
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
    const { sessionId, userId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      const user = await User.findById(userId);

      user.balance += session.amount_total;
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
