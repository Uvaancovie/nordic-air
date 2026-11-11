import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Vercel Serverless Function — POST /api/brevo/contacts
 *
 * Syncs a contact to Brevo List #10 (nordic-air).
 * Requires VITE_BREVO_API_KEY (xkeysib-...) in Vercel env vars.
 * If only an SMTP key (xsmtpsib-...) is present, skips gracefully —
 * email dispatch via SMTP still works fine without contact sync.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, api-key');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.VITE_BREVO_API_KEY || '';

  // Skip gracefully — SMTP key cannot be used for REST API contacts endpoint
  if (!apiKey || apiKey.startsWith('xsmtpsib-')) {
    return res.status(200).json({
      status: 'skipped',
      message:
        'Contact sync skipped: requires a v3 REST API key (xkeysib-...). Email dispatched via SMTP.',
    });
  }

  const payload = req.body;
  if (!payload) return res.status(400).json({ error: 'Missing request body' });

  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.text();
    return res.status(response.status).send(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[Brevo Contacts] Error:', message);
    return res.status(500).json({ error: message });
  }
}
