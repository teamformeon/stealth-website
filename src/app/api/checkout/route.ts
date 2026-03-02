import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // @ts-ignore
    apiVersion: '2025-01-27.acacia',
});

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Stealth AI - Lifetime Access',
                            description: 'System-wide AI that adapts to you.',
                        },
                        unit_amount: 5000, // $50.00
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${req.headers.get('origin')}/?success=true`,
            cancel_url: `${req.headers.get('origin')}/?canceled=true`,
            customer_email: email,
            // We pass the email in metadata so the webhook knows who paid
            metadata: {
                user_email: email,
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (err: any) {
        console.error('Stripe Checkout Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
