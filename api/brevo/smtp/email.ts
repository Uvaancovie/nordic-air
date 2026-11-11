import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

/**
 * Vercel Serverless Function — POST /api/brevo/smtp/email
 *
 * Dispatches transactional emails via Brevo SMTP Relay (port 587).
 * Vercel auto-parses the JSON request body, so req.body is ready to use.
 *
 * Required Vercel Environment Variables:
 *   BREVO_SMTP_HOST  = smtp-relay.brevo.com
 *   BREVO_SMTP_PORT  = 587
 *   BREVO_SMTP_USER  = a2dec4001@smtp-brevo.com
 *   BREVO_SMTP_PASS  = xsmtpsib-...
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS — allow calls from same Vercel domain and localhost dev
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, api-key');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Vercel automatically parses JSON bodies — req.body is the parsed object
  const payload = req.body as {
    to?: { email: string; name?: string }[];
    sender?: { name: string; email: string };
    subject?: string;
    htmlContent?: string;
    replyTo?: { email: string; name?: string };
    attachment?: { name: string; content: string }[];
  };

  if (!payload || !payload.to || !payload.subject || !payload.htmlContent) {
    return res.status(400).json({ error: 'Missing required fields: to, subject, htmlContent' });
  }

  const smtpPass = process.env.BREVO_SMTP_PASS || '';
  if (!smtpPass) {
    console.error('[Brevo SMTP] BREVO_SMTP_PASS env var is not set in Vercel.');
    return res.status(500).json({
      error: 'SMTP credentials not configured. Please add BREVO_SMTP_PASS to Vercel Environment Variables.',
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.BREVO_SMTP_HOST || 'smtp-relay.brevo.com',
      port: Number(process.env.BREVO_SMTP_PORT) || 587,
      secure: false, // port 587 uses STARTTLS
      auth: {
        user: process.env.BREVO_SMTP_USER || 'a2dec4001@smtp-brevo.com',
        pass: smtpPass,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
    });

    // Build recipient string — supports both "Name <email>" and plain "email"
    const toAddresses = (payload.to || [])
      .map((r) => (r.name ? `"${r.name}" <${r.email}>` : r.email))
      .filter(Boolean)
      .join(', ');

    const sender = payload.sender ?? {
      name: 'Nordic Air Durban',
      email: 'i.t.safuneralsupplies@gmail.com',
    };

    // Strip HTML → plain text alternative (reduces spam score)
    const plainText = (payload.htmlContent || '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<br\s*\/?>/gi, '\n')
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
      mailOptions.attachments = payload.attachment.map((a) => ({
        filename: a.name,
        content: Buffer.from(a.content, 'base64'),
        encoding: 'base64' as const,
      }));
    }

    const info = await transporter.sendMail(mailOptions);
    console.info('[Brevo SMTP] Email dispatched:', info.messageId, '→', toAddresses);

    return res.status(200).json({ messageId: info.messageId, status: 'dispatched' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[Brevo SMTP] Send error:', message);
    return res.status(500).json({ error: message });
  }
}
