# Brevo (Sendinblue) Email Automation & SMTP Relay Documentation

## Overview

Nordic Air supports dual-dispatch email automation via Brevo:
1. **Authenticated SMTP Relay (Port 587)**:
   - Host: `smtp-relay.brevo.com`
   - Port: `587`
   - Login: `a2dec4001@smtp-brevo.com`
   - Key: `xsmtpsib-YOUR_BREVO_SMTP_KEY` (configured in .env)
2. **Brevo REST API Fallback**:
   - `https://api.brevo.com/v3/smtp/email`
   - `https://api.sendinblue.com/v3/smtp/email`

Whenever a customer submits the booking form on the contact page (`src/components/BookingSection.tsx`):

### 1. Customer Confirmation Email
- **Recipient**: Customer's submitted email address (`formData.email`).
- **Brand Identity**: Arctic Aqua (`#06264A`, `#073B73`, `#25C5E8`, `#EAF8FC`).
- **24-Hour Assurance**: Assures the customer that the Durban team is reviewing their specifications and will respond within **24 hours**.
- **Urgent Callout**: If marked urgent, clearly displays priority same-day dispatch alert.
- **Booking Summary**: Reference # (`#NA-XXXX`), service requested, suburb, contact phone, notes.
- **Direct Contacts**: Emergency line `031 940 3388`, WhatsApp, `service@nordicair.co.za`.

### 2. Admin Notification Email
- **Recipient**: `i.t.safuneralsupplies@gmail.com`.
- **Subject**: `[Nordic Air Booking] ⚡ URGENT - {Customer} - {Service} ({Suburb})`.
- **Reply-To**: Set directly to the customer's email so clicking Reply in your email client writes directly to the customer.
- **Details**: Full contact info, suburb, service type, urgency flag, timestamp, and notes.
- **One-Click Actions**: "Call Customer" (`tel:`), "Reply to Email" (`mailto:`).
