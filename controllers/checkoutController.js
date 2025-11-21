import Stripe from "stripe";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const { items } = req.body; // items = [{ productId, qty }]

    const line_items = await Promise.all(items.map(async (i) => {
      const product = await Product.findById(i.productId);
      return {
        price_data: {
          currency: "inr",
          product_data: { name: product.name },
          unit_amount: product.price * 100, // in paise
        },
        quantity: i.qty,
      };
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

