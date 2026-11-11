import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import nodemailer from 'nodemailer';

function brevoProxyPlugin(): Plugin {
  return {
    name: 'brevo-api-proxy',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api/brevo')) {
          const endpoint = req.url.replace(/^\/api\/brevo/, '');
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', async () => {
            // 1. If sending transactional email, attempt authenticated Brevo SMTP Relay (port 587)
            if (endpoint === '/smtp/email' && body) {
              try {
                const payload = JSON.parse(body);
                const transporter = nodemailer.createTransport({
                  host: process.env.BREVO_SMTP_HOST || 'smtp-relay.brevo.com',
                  port: Number(process.env.BREVO_SMTP_PORT) || 587,
                  secure: false, // port 587 uses STARTTLS
                  auth: {
                    user: process.env.BREVO_SMTP_USER || 'a2dec4001@smtp-brevo.com',
                    pass: process.env.BREVO_SMTP_PASS || '',
                  },
                });

                const toAddresses = (payload.to || []).map((recipient: any) =>
                  recipient.email ? recipient.email.trim() : ''
                ).filter(Boolean).join(', ');

                const sender = payload.sender || { name: 'Nordic Air', email: 'i.t.safuneralsupplies@gmail.com' };
                const fromAddress = `"${sender.name}" <${sender.email}>`;

                // Strip HTML for clean plain-text alternative (avoids Spam / Junk classification)
                const plainText = payload.htmlContent
                  ? payload.htmlContent
                      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                      .replace(/<br\s*[\/]?>/gi, '\n')
                      .replace(/<\/p>/gi, '\n\n')
                      .replace(/<[^>]+>/g, ' ')
                      .replace(/&nbsp;/g, ' ')
                      .replace(/\s{2,}/g, ' ')
                      .trim()
                  : '';

                const mailOptions: any = {
                  from: fromAddress,
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

                const info = await transporter.sendMail(mailOptions);
                console.info(`Brevo SMTP Relay dispatched email to ${toAddresses}:`, info.messageId);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ messageId: info.messageId, status: 'dispatched_via_smtp_relay' }));
                return;
              } catch (smtpErr: any) {
                console.warn('Brevo SMTP Relay encounter:', smtpErr?.message);
              }
            }

            // 2. If syncing contacts but only an SMTP key (xsmtpsib) is present, skip gracefully to avoid 401
            const apiKey = req.headers['api-key'] || process.env.VITE_BREVO_API_KEY || '';
            if (endpoint === '/contacts' && String(apiKey).startsWith('xsmtpsib-')) {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ status: 'skipped', message: 'Contact sync requires a v3 REST API key (xkeysib-...). Email was dispatched via SMTP.' }));
              return;
            }
            const targets = ['https://api.brevo.com/v3', 'https://api.sendinblue.com/v3'];
            let lastError: any = null;

            for (const target of targets) {
              try {
                const response = await fetch(`${target}${endpoint}`, {
                  method: req.method || 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'api-key': String(apiKey),
                  },
                  body: req.method !== 'GET' && body ? body : undefined,
                });

                const data = await response.text();
                res.statusCode = response.status;
                res.setHeader('Content-Type', 'application/json');
                res.end(data);
                return;
              } catch (err) {
                lastError = err;
              }
            }

            res.statusCode = 502;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Brevo API unreachable', details: String(lastError) }));
          });
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), brevoProxyPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
