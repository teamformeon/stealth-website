import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';

type CheckoutRequest = {
    email?: string;
};

export async function POST(req: Request) {
    try {
        let payload: CheckoutRequest = {};

        try {
            payload = (await req.json()) as CheckoutRequest;
        } catch {
            payload = {};
        }

        const email = typeof payload.email === 'string' ? payload.email.trim() : '';
        const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

        const session = await getStripe().checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Formeon AI - 1 Month Access',
                            description: 'Full access to Formeon AI for 30 days.',
                        },
                        unit_amount: 2500,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${origin}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/?canceled=true`,
            customer_email: email || undefined,
            metadata: email ? { user_email: email } : undefined,
            allow_promotion_codes: true,
        });

        return NextResponse.json({ url: session.url });
    } catch (error: unknown) {
        console.error('Stripe Checkout Error:', error);
        return NextResponse.json({ error: 'Unable to start checkout.' }, { status: 500 });
    }
}
