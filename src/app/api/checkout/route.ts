import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { CHARMS, BASES } from "@/lib/charms";

export async function POST(req: NextRequest) {
  try {
    const { baseId, charmIds } = await req.json() as {
      baseId: string;
      charmIds: string[];
    };

    const base = BASES.find((b) => b.id === baseId);
    if (!base) return NextResponse.json({ error: "Invalid base." }, { status: 400 });

    // Reject rather than silently drop: a customer must never be charged for a
    // different set of charms than the one they built.
    if (!Array.isArray(charmIds) || charmIds.length === 0 || charmIds.length > base.maxCharms) {
      return NextResponse.json({ error: "Invalid charm selection." }, { status: 400 });
    }
    const charms = charmIds.map((id) => CHARMS.find((c) => c.id === id));
    if (charms.some((c) => !c)) {
      return NextResponse.json({ error: "Unknown charm in selection." }, { status: 400 });
    }

    const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: base.price * 100,
            product_data: {
              name: base.name,
              description: base.description,
            },
          },
          quantity: 1,
        },
        ...charms.map((charm) => ({
          price_data: {
            currency: "usd",
            unit_amount: charm!.price * 100,
            product_data: {
              name: charm!.name,
              description: charm!.description,
            },
          },
          quantity: 1,
        })),
      ],
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      metadata: {
        baseId,
        charmIds: charmIds.join(","),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout]", err);
    return NextResponse.json({ error: "Failed to create checkout session." }, { status: 500 });
  }
}
