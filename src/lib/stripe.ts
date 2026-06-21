import Stripe from "stripe";

// ponytail: singleton — one client for the process lifetime
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
});
