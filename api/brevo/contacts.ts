import type { IncomingMessage, ServerResponse } from 'node:http';

// Vercel Serverless Function — POST /api/brevo/contacts
// Syncs a contact to Brevo List #10 (nordic-air) using the REST API v3.
// Requires VITE_BREVO_API_KEY (xkeysib-...) in Vercel env vars.
// If only BREVO_SMTP_PASS (xsmtpsib-...) is present, skips gracefully.

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, api-key');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  const apiKey = process.env.VITE_BREVO_API_KEY || '';

  // If no v3 REST key, skip gracefully (SMTP key can't do contacts REST API)
  if (!apiKey || apiKey.startsWith('xsmtpsib-')) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        status: 'skipped',
        message: 'Contact sync requires a v3 REST API key (xkeysib-...). Email was dispatched via SMTP.',
      })
    );
    return;
  }

  let rawBody = '';
  await new Promise<void>((resolve, reject) => {
    req.on('data', (chunk: Buffer) => { rawBody += chunk.toString(); });
    req.on('end', resolve);
    req.on('error', reject);
  });

  let payload: any;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Invalid JSON body' }));
    return;
  }

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
    res.statusCode = response.status;
    res.setHeader('Content-Type', 'application/json');
    res.end(data);
  } catch (err: any) {
    console.error('[Brevo Contacts] Error:', err?.message);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: err?.message || 'Contacts sync failed' }));
  }
}
