import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

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
            const apiKey = req.headers['api-key'] || process.env.VITE_BREVO_API_KEY || 'bskXHZtW2iVp6EA';
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
