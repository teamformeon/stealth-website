import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';

const WINDOWS_DOWNLOAD_URL = 'https://github.com/alakhjagtap/stealthpublicreleases/releases/download/v10/Formeon-Setup-1.0.19.exe';
const MAC_DOWNLOAD_URL = 'https://github.com/alakhjagtap/stealthpublicreleases/releases/latest/download/Stealth-1.0.11-arm64.dmg';

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
            const session = await getStripe().checkout.sessions.retrieve(sessionId);
            if (session.payment_status === 'paid') {
                return NextResponse.json({
                    success: true,
                    urls: {
                        windows: WINDOWS_DOWNLOAD_URL,
                        mac: MAC_DOWNLOAD_URL
                    }
                });
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
