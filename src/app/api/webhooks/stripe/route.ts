import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // @ts-ignore
    apiVersion: '2025-01-27.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Supabase Admin client (using Service Role Key to bypass RLS)
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature')!;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        const userEmail = session.metadata?.user_email;

        if (userEmail) {
            console.log(`💰 Payment succeeded for: ${userEmail}`);

            // Update the user's profile to is_paid = true
            const { error } = await supabaseAdmin
                .from('profiles')
                .update({ is_paid: true })
                .eq('email', userEmail);

            if (error) {
                console.error('Error updating supabase profile:', error);
                return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
            }

            console.log(`✅ User ${userEmail} marked as paid!`);
        }
    }

    return NextResponse.json({ received: true });
}
