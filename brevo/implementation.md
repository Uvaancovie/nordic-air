# Brevo Automation Implementation Guide

## Implementation Details

1. **Service**: `src/services/brevoService.ts`
   - Encapsulates `sendTransactionalEmail`, `generateCustomerEmailHtml`, `generateAdminEmailHtml`, and `sendBookingEmails`.
   - Reads environment variables dynamically via `import.meta.env`.
   - Generates responsive HTML email templates styled with the Nordic Air Arctic Aqua palette (`#06264A`, `#073B73`, `#25C5E8`, `#EAF8FC`).
   - Assures the customer of a response within 24 hours.
   - Forwards all relevant booking details to `i.t.safuneralsupplies@gmail.com` with one-click reply headers.

2. **UI Integration**: `src/components/BookingSection.tsx`
   - Form submission validates input fields.
   - Triggers `brevoService.sendBookingEmails(formData, reference)`.
   - Displays real-time loading feedback on the submit button.
   - Shows success confirmation screen with exact booking reference, delivery status, and 24-hour assurance.
   - Fallback button allows direct WhatsApp chat with the on-call technician at any stage.
