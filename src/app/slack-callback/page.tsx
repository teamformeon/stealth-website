'use client';

import { useEffect, useState } from 'react';

export default function SlackCallbackPage() {
  const [showManualLink, setShowManualLink] = useState(false);
  const [deepLink, setDeepLink] = useState('#');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const error = params.get('error');
    const state = params.get('state');

    const qs = new URLSearchParams();
    if (code) qs.set('code', code);
    if (error) qs.set('error', error);
    if (state) qs.set('state', state);

    const link = `stealth://slack-callback?${qs.toString()}`;
    setDeepLink(link);
    window.location.replace(link);

    const timer = setTimeout(() => setShowManualLink(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0b0c] text-[#f5f5f5] font-sans px-4">
      <div className="max-w-md text-center">
        <div
          className="w-8 h-8 mx-auto mb-6 rounded-full border-[3px] border-[#2a2a2e] border-t-[#6aa3ff] animate-spin"
          aria-hidden
        />
        <h1 className="text-lg font-semibold mb-2">Connecting Slack to Formeon</h1>
        <p className="text-sm text-[#a8a8ad]">Returning you to the desktop app…</p>
        {showManualLink && (
          <p className="text-sm text-[#a8a8ad] mt-4">
            If nothing happens,{' '}
            <a href={deepLink} className="text-[#6aa3ff] hover:underline">
              click here
            </a>{' '}
            to finish.
          </p>
        )}
      </div>
    </div>
  );
}
