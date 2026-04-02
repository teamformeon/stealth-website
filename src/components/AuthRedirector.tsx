'use client';

import { useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function AuthRedirector() {
    useEffect(() => {
        // Quick frontend check for tokens in URL hash
        if (typeof window !== 'undefined' && window.location.hash.includes('access_token')) {
            const supabase = createClient();
            
            supabase.auth.getSession().then(({ data: { session } }) => {
                if (session) {
                    redirectApp(session);
                }
            });

            const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
                if (event === 'SIGNED_IN' && session) {
                    redirectApp(session);
                }
            });

            return () => subscription.unsubscribe();
        }
    }, []);

    const redirectApp = (session: any) => {
        const hash = `#access_token=${session.access_token}&refresh_token=${session.refresh_token}`;
        const url = `http://localhost:47836/auth-success.html${hash}`;
        console.log('Redirecting to desktop app via:', url);
        // Small delay
        setTimeout(() => {
            window.location.href = url;
        }, 500);
    };

    return null;
}
