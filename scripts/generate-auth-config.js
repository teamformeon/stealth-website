/**
 * Writes public/auth/login-config.js from NEXT_PUBLIC_* env (.env.local / Cloudflare).
 * Never writes service role or other secrets.
 */
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
        '[generate-auth-config] NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is missing. Desktop auth pages will not work until these are set.'
    );
}

const outDir = path.join(__dirname, '..', 'public', 'auth');
fs.mkdirSync(outDir, { recursive: true });

const config = { supabaseUrl, supabaseAnonKey };
const outPath = path.join(outDir, 'login-config.js');
const content = `window.FORMEON_AUTH_CONFIG=${JSON.stringify(config)};\n`;

fs.writeFileSync(outPath, content, 'utf8');
console.log('[generate-auth-config] Wrote', outPath);
