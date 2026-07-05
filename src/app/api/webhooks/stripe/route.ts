import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getStripe } from "@/lib/stripe";

let supabaseAdmin: SupabaseClient | null = null;

function getSupabaseAdmin() {
  if (!supabaseAdmin) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      throw new Error("Supabase admin credentials are not configured");
    }
    supabaseAdmin = createClient(url, key);
  }
  return supabaseAdmin;
}

export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json(
      { error: "STRIPE_WEBHOOK_SECRET is not configured" },
      { status: 500 }
    );
  }

  const body = await req.text();
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown webhook error";
    console.error(`Webhook signature verification failed: ${message}`);
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userEmail =
      session.metadata?.user_email || session.customer_details?.email;

    if (userEmail) {
      console.log(`Payment succeeded for: ${userEmail}`);

      const { error } = await getSupabaseAdmin()
        .from("profiles")
        .upsert({ email: userEmail, is_paid: true }, { onConflict: "email" });

      if (error) {
        console.error("Error updating supabase profile:", error);
        return NextResponse.json({ error: "Database update failed" }, { status: 500 });
      }

      console.log(`User ${userEmail} marked as paid`);
    }
  }

  return NextResponse.json({ received: true });
}
