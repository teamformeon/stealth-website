import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-01-27.acacia' as Stripe.LatestApiVersion,
});

const DOWNLOAD_URL = 'https://github.com/alakhjagtap/stealthpublicreleases/releases/latest/download/Stealth-Setup-1.0.0.exe';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { session_id: sessionId } = body as { session_id?: string };

        if (!sessionId) {
            return NextResponse.json(
                { error: 'A checkout session_id is required to verify purchase.' },
                { status: 400 }
            );
        }

        try {
            const session = await stripe.checkout.sessions.retrieve(sessionId);
            if (session.payment_status === 'paid') {
                return NextResponse.json({ success: true, url: DOWNLOAD_URL });
            }

            return NextResponse.json(
                { error: 'Payment has not been completed for this session.' },
                { status: 403 }
            );
        } catch (error: unknown) {
            console.error('Error retrieving Stripe session:', error);
            return NextResponse.json(
                { error: 'Invalid or expired session ID.' },
                { status: 400 }
            );
        }
    } catch (error: unknown) {
        console.error('Purchase verification error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
