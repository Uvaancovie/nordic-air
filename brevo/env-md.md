# Environment Variables Configuration

Add the following environment variables to your `.env` or `.env.local` file:

```env
# Brevo (Sendinblue) Configuration
VITE_BREVO_API_KEY="your_brevo_api_key_or_smtp_key"
VITE_BREVO_ID="10"
VITE_BREVO_FOLDER="marketing_automation"
VITE_BREVO_LIST_NAME="nordic-air"
VITE_BREVO_SENDER_EMAIL="i.t.safuneralsupplies@gmail.com"
VITE_BREVO_SENDER_NAME="Nordic Air Durban"
VITE_ADMIN_EMAIL="i.t.safuneralsupplies@gmail.com"

# Brevo Authenticated SMTP Relay (Port 587)
BREVO_SMTP_HOST="smtp-relay.brevo.com"
BREVO_SMTP_PORT="587"
BREVO_SMTP_USER="a2dec4001@smtp-brevo.com"
BREVO_SMTP_PASS="your_brevo_smtp_key_here"
```

BREOV_SMTP_Server=smtp-relay.brevo.com
BREVO_SMTP_Port=587
BREVO_SMTP_LOGINLogin=a2dec4001@smtp-brevo.com