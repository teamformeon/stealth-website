'use client';

import { createClient } from '@/utils/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const DESKTOP_CALLBACK = 'https://formeon.org/auth/desktop-callback.html';

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [redirectUri, setRedirectUri] = useState(DESKTOP_CALLBACK);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const client = params.get('client');
        const uri = params.get('redirect_uri');

        if (client === 'desktop' || uri) {
            const target = new URL('/auth/desktop-login.html', window.location.origin);
            if (client) target.searchParams.set('client', client);
            target.searchParams.set('redirect_uri', uri || DESKTOP_CALLBACK);
            window.location.replace(target.toString());
            return;
        }

        if (uri) setRedirectUri(uri);
    }, []);

    useEffect(() => {
        const supabase = createClient();

        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                handleAppRedirect(session);
            }
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && session) {
                handleAppRedirect(session);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleAppRedirect = (session: { access_token: string; refresh_token: string }) => {
        setIsSuccess(true);
        const hash = `#access_token=${session.access_token}&refresh_token=${session.refresh_token}`;
        const url = `http://localhost:47836/auth-success.html${hash}`;

        setTimeout(() => {
            window.location.href = url;
        }, 1500);
    };

    const handleLogin = async () => {
        setLoading(true);
        setError(null);
        const supabase = createClient();

        const { error: authError } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: redirectUri,
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
            },
        });

        if (authError) {
            setError(authError.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 font-sans">
            <AnimatePresence mode="wait">
                {!isSuccess ? (
                    <motion.div
                        key="login"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="w-full max-w-[440px] bg-[#0A0A0A] border border-white/[0.05] rounded-[2.5rem] p-12 text-center shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.03] to-transparent pointer-events-none" />

                        <div className="w-16 h-16 bg-white/[0.03] border border-white/[0.05] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-inner">
                            <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.2}
                                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 3a9.99 9.99 0 00-4.512 1.076m3.993 13.26l-.12.162a.833.833 0 01-.157.194l-5.617 5.617A1 1 0 011 22V5a1 1 0 011-1h17a1 1 0 011 1v12a1 1 0 01-1 1h-11z"
                                />
                            </svg>
                        </div>

                        <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">Welcome to Formeon</h1>
                        <p className="text-white/40 mb-10 text-base font-light leading-relaxed">
                            Sign in to sync your intelligent context and unlock pro features across all devices.
                        </p>

                        {error && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs text-left"
                            >
                                {error}
                            </motion.div>
                        )}

                        <button
                            suppressHydrationWarning
                            onClick={handleLogin}
                            disabled={loading}
                            className="w-full py-4 bg-white text-black font-bold rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-4 text-base relative group overflow-hidden"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                            ) : (
                                <>
                                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                        <svg viewBox="0 0 24 24" className="w-5 h-5">
                                            <path
                                                fill="#4285F4"
                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                                            />
                                            <path
                                                fill="#34A853"
                                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            />
                                            <path
                                                fill="#FBBC05"
                                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                            />
                                            <path
                                                fill="#EA4335"
                                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            />
                                        </svg>
                                    </div>
                                    Continue with Google
                                </>
                            )}
                        </button>

                        <div className="mt-10 pt-8 border-t border-white/[0.03]">
                            <p className="text-[10px] text-white/20 font-medium tracking-[0.2em] uppercase">
                                Formeon Applied Intelligence
                            </p>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center"
                    >
                        <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', damping: 12 }}
                                className="w-10 h-10 text-blue-500"
                            >
                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </motion.div>
                            <motion.div
                                animate={{ opacity: [0, 1, 0], scale: [1, 1.5, 2] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="absolute inset-0 rounded-full border border-blue-500"
                            />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">Success!</h2>
                        <p className="text-white/40">Redirecting you back to the Formeon App...</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
