import Stripe from "stripe";

// ponytail: singleton — one client for the process lifetime.
// No apiVersion pin: the SDK uses the version bundled with the installed
// stripe release, so fresh installs can't drift from the literal type.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
