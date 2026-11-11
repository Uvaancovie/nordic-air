# Brevo (Sendinblue) Email Automation Documentation — Nordic Air

## Overview

Nordic Air uses Brevo's v3 SMTP / Transactional Email REST API to automatically dispatch two customized emails whenever a customer submits the booking or quote request form on the contact section (`src/components/BookingSection.tsx`):

1. **Customer Confirmation Email**:
   - Sent to: Customer's email address (`formData.email`).
   - Style: Aqua Blue Nordic Air branding (`#06264A`, `#073B73`, `#25C5E8`, `#EAF8FC`).
   - Content:
     - Header: Nordic Air — Durban Climate Specialists
     - Personalized greeting: "Thank you {Customer Name}, we have got your confirmation!"
     - 24-hour reassurance: Explicit assurance that our Durban team will be back in touch within 24 hours.
     - Urgent flag: If marked urgent, clearly displays the same-day emergency dispatch notice.
     - Full booking summary: Reference #NA-XXXX, Service requested, Suburb/Location, Contact Phone, Notes & Room details.
     - Direct emergency contact information (031 940 3388, WhatsApp, service@nordicair.co.za).
   - Reply-To: `service@nordicair.co.za`.

2. **Admin Notification Email**:
   - Sent to: `i.t.safuneralsupplies@gmail.com`.
   - Subject: `[Nordic Air Booking] ⚡ URGENT - {Customer Name} - {Service} ({Suburb})`
   - Content:
     - Priority banner (Urgent Same-Day vs Standard).
     - Full customer details (Name, clickable Phone `tel:`, clickable Email `mailto:`, Suburb, Service type, Timestamp, Notes).
     - Quick Action buttons: Call Customer, Reply by Email.
   - Reply-To: Set directly to the customer's email address so the admin can simply click "Reply" to respond to the customer.

## API Endpoint & Authentication

- **Endpoint**: `POST https://api.brevo.com/v3/smtp/email`
- **Headers**:
  - `Accept: application/json`
  - `Content-Type: application/json`
  - `api-key: <VITE_BREVO_API_KEY>`
