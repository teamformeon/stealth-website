import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Detects if a string is likely gibberish (random characters, no spaces, etc.)
 */
function isGibberish(text: string): boolean {
  if (!text) return false;

  // 1. Long sequences of characters without spaces (e.g. "asdfasdfasdfasdfasdf")
  const longUnbrokenSequence = /[^ \n\r\t]{25,}/;
  if (longUnbrokenSequence.test(text)) return true;

  // 2. Extremely low vowel ratio in long words
  const words = text.split(/\s+/);
  for (const word of words) {
    if (word.length > 8) {
      const vowels = word.match(/[aeiouy]/gi);
      if (!vowels || vowels.length / word.length < 0.1) return true;
    }
  }

  // 3. Repeating patterns (e.g. "aaaaaa", "qwertyqwerty")
  const repeatingPattern = /(.)\1{5,}/;
  if (repeatingPattern.test(text)) return true;

  return false;
}

/**
 * Filter for "bullshit" leads
 */
function isBullshit(data: { firstName: string; lastName: string; email: string; company?: string; message?: string }): boolean {
  const { firstName, lastName, email, company, message } = data;

  // 1. Minimal length checks
  if (firstName.length < 2 || lastName.length < 2) return true;

  // 2. Common junk patterns
  const junkEmails = [/test@test\.com/i, /asdf@/i, /abc@/i, /example@example\.com/i, /none@/i];
  if (junkEmails.some(p => p.test(email))) return true;

  const junkWords = [/asdf/i, /qwerty/i, /testing/i, /bullshit/i, /ghgh/i];
  if (junkWords.some(p => p.test(firstName) || p.test(lastName))) return true;

  // 3. Gibberish checks
  if (isGibberish(firstName) || isGibberish(lastName)) return true;
  if (company && isGibberish(company)) return true;
  if (message && message.length > 5 && isGibberish(message)) return true;

  return false;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, company, message } = body;

    // --- Bullshit Filter ---
    if (isBullshit(body)) {
      console.log('--- BULLSHIT DETECTED (Silent Drop) ---');
      console.log(`Name: ${firstName} ${lastName}`);
      console.log(`Email: ${email}`);
      console.log(`Message: ${message}`);
      // Return 200 success to the user, but don't call Resend
      return NextResponse.json({ data: { id: 'filtered_spam_prevention', filtered: true } });
    }

    const { data, error } = await resend.emails.send({
      from: `Stealth Demo <${process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'}>`,
      to: [process.env.RESEND_TO_EMAIL || 'stealthassistant1@gmail.com'],
      subject: `New Demo Request: ${firstName} ${lastName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
          <h2 style="color: #1e293b; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; margin-bottom: 20px;">New Demo Request</h2>
          
          <div style="margin-bottom: 24px;">
            <p style="margin: 4px 0; color: #64748b; font-size: 14px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em;">Contact Information</p>
            <p style="margin: 8px 0; font-size: 18px; color: #0f172a;"><strong>${firstName} ${lastName}</strong></p>
            <p style="margin: 4px 0; color: #3b82f6;"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></p>
          </div>

          <div style="margin-bottom: 24px;">
            <p style="margin: 4px 0; color: #64748b; font-size: 14px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em;">Company</p>
            <p style="margin: 8px 0; font-size: 16px; color: #0f172a;">${company || 'Not specified'}</p>
          </div>

          <div style="margin-bottom: 24px;">
            <p style="margin: 4px 0; color: #64748b; font-size: 14px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em;">Message</p>
            <div style="margin: 8px 0; padding: 16px; background-color: #f8fafc; border-radius: 8px; color: #334155; font-style: italic; line-height: 1.6;">
              ${message ? message.replace(/\n/g, '<br/>') : 'No message provided.'}
            </div>
          </div>

          <p style="font-size: 12px; color: #94a3b8; margin-top: 40px; text-align: center; border-top: 1px solid #f1f5f9; pt-20">
            This request was sent from the Stealth website demo form.
          </p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
