import type { IncomingMessage, ServerResponse } from 'node:http';
import nodemailer from 'nodemailer';

// Vercel Serverless Function — POST /api/brevo/smtp/email
// Uses Brevo SMTP Relay (port 587) to dispatch transactional emails.
// Env vars (set in Vercel Dashboard → Settings → Environment Variables):
//   BREVO_SMTP_HOST, BREVO_SMTP_PORT, BREVO_SMTP_USER, BREVO_SMTP_PASS

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  // CORS headers (allow same-origin Vercel deploys and localhost dev)
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

  // Read request body
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
    const transporter = nodemailer.createTransport({
      host: process.env.BREVO_SMTP_HOST || 'smtp-relay.brevo.com',
      port: Number(process.env.BREVO_SMTP_PORT) || 587,
      secure: false, // port 587 uses STARTTLS
      auth: {
        user: process.env.BREVO_SMTP_USER || 'a2dec4001@smtp-brevo.com',
        pass: process.env.BREVO_SMTP_PASS || '',
      },
    });

    // Build recipients string
    const toAddresses = (payload.to || [])
      .map((r: any) => (r.name ? `"${r.name}" <${r.email}>` : r.email))
      .filter(Boolean)
      .join(', ');

    const sender = payload.sender || {
      name: 'Nordic Air Durban',
      email: 'i.t.safuneralsupplies@gmail.com',
    };

    // Strip HTML to generate clean plain-text alternative (better spam score)
    const plainText = (payload.htmlContent || '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<br\s*[\/]?>/gi, '\n')
      .replace(/<\/p>/gi, '\n\n')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim();

    const mailOptions: nodemailer.SendMailOptions = {
      from: `"${sender.name}" <${sender.email}>`,
      to: toAddresses,
      subject: payload.subject,
      text: plainText,
      html: payload.htmlContent,
    };

    if (payload.replyTo) {
      mailOptions.replyTo = payload.replyTo.name
        ? `"${payload.replyTo.name}" <${payload.replyTo.email}>`
        : payload.replyTo.email;
    }

    if (payload.attachment && payload.attachment.length > 0) {
      mailOptions.attachments = payload.attachment.map((a: any) => ({
        filename: a.name,
        content: Buffer.from(a.content, 'base64'),
        encoding: 'base64',
      }));
    }

    const info = await transporter.sendMail(mailOptions);
    console.info('[Brevo SMTP] Email dispatched:', info.messageId, '→', toAddresses);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ messageId: info.messageId, status: 'dispatched' }));
  } catch (err: any) {
    console.error('[Brevo SMTP] Send error:', err?.message);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: err?.message || 'SMTP dispatch failed' }));
  }
}
