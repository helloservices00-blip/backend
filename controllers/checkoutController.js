import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const { products, success_url, cancel_url } = req.body;

    const line_items = products.map(item => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100)
      },
      quantity: item.quantity
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url,
      cancel_url,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
