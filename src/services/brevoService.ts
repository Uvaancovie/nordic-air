/**
 * Brevo (Sendinblue) Transactional Email Service for Nordic Air
 * Dispatches branded Aqua Blue emails to Customer and Admin upon booking submission.
 */

import { QuoteRequestData } from '../types';

export interface BrevoEmailPayload {
  to: { email: string; name?: string }[];
  subject: string;
  htmlContent: string;
  replyTo?: { email: string; name?: string };
  attachment?: { name: string; content: string }[];
}

export interface SendBookingResult {
  success: boolean;
  customerSent: boolean;
  adminSent: boolean;
  error?: string;
  reference: string;
}

// Brand Colors for Nordic Air — Arctic Aqua
const BRAND = {
  deepNavy: '#06264A',
  navy: '#073B73',
  oceanBlue: '#087FCB',
  glacierAqua: '#25C5E8',
  iceBlue: '#EAF8FC',
  cardBg: '#FFFFFF',
  bodyBg: '#F3F9FF',
  textDark: '#102D40',
  textMuted: '#607786',
  border: '#D9EEF7',
};

class BrevoService {
  private readonly defaultAdminEmail = 'i.t.safuneralsupplies@gmail.com';
  private readonly fallbackApiKey = 'bskXHZtW2iVp6EA';

  private get apiKey(): string {
    return import.meta.env.VITE_BREVO_API_KEY || this.fallbackApiKey;
  }

  private get senderEmail(): string {
    return import.meta.env.VITE_BREVO_SENDER_EMAIL || this.defaultAdminEmail;
  }

  private get senderName(): string {
    return import.meta.env.VITE_BREVO_SENDER_NAME || 'Nordic Air Durban';
  }

  private get adminEmail(): string {
    return import.meta.env.VITE_ADMIN_EMAIL || this.defaultAdminEmail;
  }

  private get listId(): number {
    const raw = import.meta.env.VITE_BREVO_ID || '10';
    const parsed = parseInt(String(raw).replace(/[^0-9]/g, ''), 10);
    return isNaN(parsed) ? 10 : parsed;
  }

  /**
   * Robust multi-tier dispatcher:
   * 1. Relative local Vite proxy: /api/brevo/<path> (avoids browser DNS errors like ERR_NAME_NOT_RESOLVED)
   * 2. Direct: https://api.brevo.com/v3/<path>
   * 3. Fallback: https://api.sendinblue.com/v3/<path>
   */
  private async requestBrevo(endpointPath: string, body: Record<string, unknown>): Promise<{ ok: boolean; status: number; data?: any }> {
    const key = this.apiKey;
    const cleanPath = endpointPath.startsWith('/') ? endpointPath : `/${endpointPath}`;
    const urls = [
      `/api/brevo${cleanPath}`,
      `https://api.brevo.com/v3${cleanPath}`,
      `https://api.sendinblue.com/v3${cleanPath}`,
    ];

    for (const url of urls) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'api-key': key,
          },
          body: JSON.stringify(body),
        });

        // If local dev proxy is not registered, continue to direct endpoints
        if ((response.status === 404 || response.status === 502) && url.startsWith('/api/brevo')) {
          continue;
        }

        const data = await response.json().catch(() => ({}));
        return { ok: response.ok, status: response.status, data };
      } catch (err) {
        // DNS or network error on this domain, try next fallback
        console.warn(`Dispatch attempt via ${url} failed:`, err);
      }
    }

    return { ok: false, status: 0 };
  }

  /**
   * Adds or updates the lead into the Brevo Contact List (e.g. List #10 "nordic-air" in marketing_automation)
   */
  async syncContactToList(data: QuoteRequestData): Promise<boolean> {
    if (!this.apiKey) return false;

    const nameParts = data.fullName.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    try {
      const res = await this.requestBrevo('/contacts', {
        email: data.email,
        attributes: {
          FIRSTNAME: firstName,
          LASTNAME: lastName,
          SMS: data.phone,
        },
        listIds: [this.listId],
        updateEnabled: true,
      });

      return res.ok;
    } catch (e) {
      console.warn('Brevo contact list sync notice:', e);
      return false;
    }
  }

  /**
   * Dispatches transactional email via Brevo SMTP API v3
   */
  async sendTransactionalEmail(payload: BrevoEmailPayload): Promise<{ success: boolean; error?: string }> {
    const key = this.apiKey;
    if (!key) {
      const err = 'Brevo API key is not configured. (Set VITE_BREVO_API_KEY in .env)';
      console.warn(err);
      return { success: false, error: err };
    }

    if (!key.startsWith('xkeysib-')) {
      console.warn(
        `Notice: VITE_BREVO_API_KEY ("${key}") does not start with "xkeysib-". ` +
        'Brevo v3 REST API requires an API key generated under Brevo Dashboard -> SMTP & API -> API Keys.'
      );
    }

    const body: Record<string, unknown> = {
      sender: { name: this.senderName, email: this.senderEmail },
      to: payload.to,
      subject: payload.subject,
      htmlContent: payload.htmlContent,
      ...(payload.replyTo ? { replyTo: payload.replyTo } : {}),
      ...(payload.attachment && payload.attachment.length > 0 ? { attachment: payload.attachment } : {})
    };

    try {
      const res = await this.requestBrevo('/smtp/email', body);
      if (res.ok) {
        console.info('Brevo email dispatched successfully:', res.data);
        return { success: true };
      }

      let errorMsg = `Brevo returned status ${res.status}`;
      if (res.status === 401) {
        errorMsg = 'Brevo 401 Unauthorized (Key not found). Please supply a valid v3 API key starting with xkeysib-... from Brevo -> SMTP & API -> API Keys.';
      } else if (res.data?.message) {
        errorMsg = `Brevo: ${res.data.message}`;
      }

      console.warn('Brevo email dispatch failed:', errorMsg, res.data);
      return { success: false, error: errorMsg };
    } catch (err: any) {
      const errorMsg = err?.message || 'Network exception while contacting Brevo';
      console.warn('Brevo email dispatch failed:', errorMsg);
      return { success: false, error: errorMsg };
    }
  }

  /**
   * Generates Nordic Air Aqua Blue Branded HTML for the Customer Confirmation Email
   */
  generateCustomerEmailHtml(data: QuoteRequestData, reference: string): string {
    const isUrgent = data.isUrgent;
    const cleanNotes = data.notes ? data.notes.replace(/\n/g, '<br />') : 'No additional room details provided.';

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nordic Air Booking Confirmation</title>
</head>
<body style="margin: 0; padding: 0; background-color: ${BRAND.bodyBg}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: ${BRAND.textDark};">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: ${BRAND.bodyBg}; padding: 30px 12px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: ${BRAND.cardBg}; border-radius: 16px; overflow: hidden; border: 1px solid ${BRAND.border}; box-shadow: 0 8px 30px rgba(6, 38, 74, 0.08);">
          
          <!-- Header Banner (Arctic Navy + Glacier Aqua Stripe) -->
          <tr>
            <td style="background-color: ${BRAND.deepNavy}; padding: 32px 28px; text-align: center; border-bottom: 4px solid ${BRAND.glacierAqua};">
              <div style="display: inline-block;">
                <span style="font-size: 24px; font-weight: 900; letter-spacing: 2px; color: #FFFFFF;">NORDIC</span>
                <span style="font-size: 24px; font-weight: 900; letter-spacing: 2px; color: ${BRAND.glacierAqua}; margin-left: 6px;">AIR</span>
              </div>
              <p style="margin: 8px 0 0 0; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: #B3E5F3; font-weight: 600;">
                Durban Climate Specialists & Heat Pumps
              </p>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding: 36px 32px;">
              <!-- Greeting & Reassurance -->
              <h1 style="margin: 0 0 14px 0; font-size: 22px; font-weight: 800; color: ${BRAND.deepNavy}; line-height: 1.3;">
                Thank you ${data.fullName}, we have got your confirmation!
              </h1>
              
              <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.6; color: #334E68;">
                We have successfully received your service booking request. Our Durban technical dispatch team is reviewing your requirements, and <strong>we assure you that we will be back in touch with you within 24 hours</strong> to confirm your booking and provide an obligation-free estimate.
              </p>

              ${isUrgent ? `
              <!-- Urgent Badge Banner -->
              <div style="margin: 20px 0; padding: 14px 18px; background-color: #FFF5F5; border-left: 4px solid #E53E3E; border-radius: 8px;">
                <p style="margin: 0; font-size: 13px; font-weight: bold; color: #C53030;">
                  ⚡ URGENT SAME-DAY CALLOUT ACTIVATED
                </p>
                <p style="margin: 4px 0 0 0; font-size: 12px; color: #9B2C2C; line-height: 1.5;">
                  Your request has been prioritised for immediate Durban standby technician dispatch.
                </p>
              </div>
              ` : ''}

              <!-- Booking Summary Box -->
              <div style="margin: 24px 0; background-color: ${BRAND.iceBlue}; border: 1px solid ${BRAND.border}; border-radius: 12px; padding: 20px;">
                <div style="margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px solid ${BRAND.border};">
                  <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: ${BRAND.oceanBlue}; font-weight: 800;">
                    Booking Reference
                  </span>
                  <div style="font-size: 18px; font-weight: 800; font-family: monospace; color: ${BRAND.deepNavy}; margin-top: 2px;">
                    #${reference}
                  </div>
                </div>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="6" style="font-size: 13px; color: ${BRAND.textDark};">
                  <tr>
                    <td style="width: 38%; font-weight: 600; color: ${BRAND.textMuted};">Service Type:</td>
                    <td style="font-weight: 700; color: ${BRAND.navy};">${data.serviceType}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: 600; color: ${BRAND.textMuted};">Location / Suburb:</td>
                    <td style="font-weight: 700; color: ${BRAND.deepNavy};">${data.suburb}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: 600; color: ${BRAND.textMuted};">Contact Phone:</td>
                    <td style="font-weight: 600;">${data.phone}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: 600; color: ${BRAND.textMuted};">Customer Email:</td>
                    <td style="font-weight: 600;">${data.email}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: 600; color: ${BRAND.textMuted};">Dispatch Priority:</td>
                    <td>
                      <span style="display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; ${isUrgent ? 'background-color: #FED7D7; color: #9B2C2C;' : 'background-color: #E2E8F0; color: #4A5568;'}">
                        ${isUrgent ? 'Urgent (Same-Day Priority)' : 'Standard Booking'}
                      </span>
                    </td>
                  </tr>
                </table>

                <div style="margin-top: 14px; padding-top: 12px; border-top: 1px solid ${BRAND.border}; font-size: 12px;">
                  <span style="font-weight: 700; color: ${BRAND.navy}; display: block; margin-bottom: 4px;">Notes & Room Details:</span>
                  <span style="color: #486581; line-height: 1.5;">${cleanNotes}</span>
                </div>
              </div>

              <!-- Quick Contact Strip -->
              <p style="margin: 24px 0 8px 0; font-size: 13px; line-height: 1.6; color: ${BRAND.textMuted};">
                Need to speak to an on-call Durban technician right now?
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 8px;">
                <tr>
                  <td style="padding: 12px 16px; background-color: #FFFFFF; border: 1px solid ${BRAND.border}; border-radius: 8px;">
                    <span style="font-size: 11px; text-transform: uppercase; color: ${BRAND.textMuted}; font-weight: 700; display: block;">Emergency Phone Line (24/7)</span>
                    <a href="tel:0319403388" style="font-size: 16px; font-weight: 800; color: ${BRAND.oceanBlue}; text-decoration: none; font-family: monospace;">
                      031 940 3388
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Sign-off -->
              <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid ${BRAND.border}; font-size: 12px; color: ${BRAND.textMuted}; line-height: 1.6;">
                <p style="margin: 0; font-weight: 700; color: ${BRAND.deepNavy};">Nordic Air Technical Dispatch Team</p>
                <p style="margin: 4px 0 0 0;">Umhlanga Ridge, Greater Durban, KwaZulu-Natal</p>
                <p style="margin: 2px 0 0 0;">Email: <a href="mailto:service@nordicair.co.za" style="color: ${BRAND.oceanBlue}; text-decoration: none;">service@nordicair.co.za</a> | Direct Sales: 031 940 3388</p>
              </div>
            </td>
          </tr>

          <!-- Footer Bar -->
          <tr>
            <td style="background-color: #041B35; padding: 18px 24px; text-align: center; font-size: 11px; color: #829AB1;">
              © ${new Date().getFullYear()} Nordic Air Durban (Pty) Ltd. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();
  }

  /**
   * Generates Nordic Air Aqua Blue Branded HTML for the Admin Notification Email
   */
  generateAdminEmailHtml(data: QuoteRequestData, reference: string): string {
    const isUrgent = data.isUrgent;
    const cleanNotes = data.notes ? data.notes.replace(/\n/g, '<br />') : 'None';
    const timestamp = new Date().toLocaleString('en-ZA', {
      timeZone: 'Africa/Johannesburg',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Booking Request - Nordic Air</title>
</head>
<body style="margin: 0; padding: 0; background-color: ${BRAND.bodyBg}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: ${BRAND.textDark};">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: ${BRAND.bodyBg}; padding: 30px 12px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 620px; background-color: ${BRAND.cardBg}; border-radius: 16px; overflow: hidden; border: 1px solid ${BRAND.border}; box-shadow: 0 8px 30px rgba(6, 38, 74, 0.08);">
          
          <!-- Header (Arctic Navy + Glacier Aqua) -->
          <tr>
            <td style="background-color: ${BRAND.deepNavy}; padding: 26px 28px; text-align: center; border-bottom: 4px solid ${BRAND.glacierAqua};">
              <span style="font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: ${BRAND.glacierAqua}; font-weight: 800; display: block; margin-bottom: 4px;">
                NORDIC AIR DISPATCH PORTAL
              </span>
              <h2 style="color: #FFFFFF; margin: 0; font-size: 20px; font-weight: 800; letter-spacing: 0.5px;">
                NEW SERVICE BOOKING REQUEST
              </h2>
              <p style="color: #B3E5F3; margin: 6px 0 0 0; font-size: 12px;">
                Reference: <strong style="font-family: monospace; color: #FFFFFF;">#${reference}</strong> | Customer: ${data.fullName}
              </p>
            </td>
          </tr>

          <!-- Admin Notification Content -->
          <tr>
            <td style="padding: 32px 28px;">
              ${isUrgent ? `
              <!-- Urgent Banner -->
              <div style="margin-bottom: 24px; padding: 14px 18px; background-color: #FFF5F5; border: 1px solid #FEB2B2; border-left: 6px solid #E53E3E; border-radius: 8px;">
                <h3 style="margin: 0; font-size: 14px; color: #C53030; font-weight: 800;">
                  ⚠️ PRIORITY ALERT: SAME-DAY URGENT DISPATCH REQUESTED
                </h3>
                <p style="margin: 4px 0 0 0; font-size: 12px; color: #742A2A;">
                  This customer marked cooling failure or urgent repair today. Please call or WhatsApp within 15 minutes.
                </p>
              </div>
              ` : ''}

              <!-- Customer Details Card -->
              <h3 style="margin: 0 0 12px 0; color: ${BRAND.deepNavy}; font-size: 15px; font-weight: 800;">
                Customer Information:
              </h3>

              <div style="background-color: ${BRAND.iceBlue}; border: 1px solid ${BRAND.border}; border-radius: 10px; padding: 18px; margin-bottom: 20px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="5" style="font-size: 13px;">
                  <tr>
                    <td style="width: 32%; color: ${BRAND.textMuted}; font-weight: 600;">Full Name:</td>
                    <td style="font-weight: 700; color: ${BRAND.deepNavy}; font-size: 14px;">${data.fullName}</td>
                  </tr>
                  <tr>
                    <td style="color: ${BRAND.textMuted}; font-weight: 600;">Email:</td>
                    <td><a href="mailto:${data.email}" style="color: ${BRAND.oceanBlue}; font-weight: 600; text-decoration: none;">${data.email}</a></td>
                  </tr>
                  <tr>
                    <td style="color: ${BRAND.textMuted}; font-weight: 600;">Phone Number:</td>
                    <td>
                      <a href="tel:${data.phone}" style="color: ${BRAND.deepNavy}; font-weight: 700; font-family: monospace; text-decoration: none;">
                        ${data.phone}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="color: ${BRAND.textMuted}; font-weight: 600;">Durban Suburb:</td>
                    <td style="font-weight: 700; color: ${BRAND.navy};">${data.suburb}</td>
                  </tr>
                  <tr>
                    <td style="color: ${BRAND.textMuted}; font-weight: 600;">Service Required:</td>
                    <td style="font-weight: 700; color: ${BRAND.deepNavy};">${data.serviceType}</td>
                  </tr>
                  <tr>
                    <td style="color: ${BRAND.textMuted}; font-weight: 600;">Urgent Dispatch:</td>
                    <td style="font-weight: 700; color: ${isUrgent ? '#C53030' : '#2D3748'};">
                      ${isUrgent ? 'YES (Same-Day Callout)' : 'No (Standard Scheduling)'}
                    </td>
                  </tr>
                  <tr>
                    <td style="color: ${BRAND.textMuted}; font-weight: 600;">Submitted At:</td>
                    <td style="color: #486581; font-size: 12px;">${timestamp}</td>
                  </tr>
                </table>
              </div>

              <!-- Message / Notes Box -->
              <h3 style="margin: 0 0 8px 0; color: ${BRAND.deepNavy}; font-size: 14px; font-weight: 800;">
                Customer Notes / Room Specifications:
              </h3>
              <div style="background-color: #FFFFFF; border: 1px solid ${BRAND.border}; border-radius: 8px; padding: 16px; margin-bottom: 24px; font-size: 13px; line-height: 1.6; color: #243B53;">
                ${cleanNotes}
              </div>

              <!-- Action Callouts for Admin -->
              <div style="background-color: #F8FBFC; border: 1px dashed ${BRAND.glacierAqua}; border-radius: 8px; padding: 16px; text-align: center;">
                <p style="margin: 0 0 12px 0; font-size: 12px; color: ${BRAND.textMuted}; font-weight: 600;">
                  Direct Response Actions:
                </p>
                <div>
                  <a href="tel:${data.phone}" style="display: inline-block; margin: 4px; padding: 10px 18px; background-color: ${BRAND.deepNavy}; color: #FFFFFF; text-decoration: none; border-radius: 8px; font-size: 12px; font-weight: 700;">
                    📞 Call Customer
                  </a>
                  <a href="mailto:${data.email}?subject=Regarding%20your%20Nordic%20Air%20Booking%20%23${reference}" style="display: inline-block; margin: 4px; padding: 10px 18px; background-color: ${BRAND.oceanBlue}; color: #FFFFFF; text-decoration: none; border-radius: 8px; font-size: 12px; font-weight: 700;">
                    ✉️ Reply to Email
                  </a>
                </div>
              </div>

              <p style="margin: 24px 0 0 0; font-size: 11px; color: #829AB1; text-align: center;">
                You can reply directly to this email to contact <strong>${data.fullName}</strong> (${data.email}).
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #041B35; padding: 16px; text-align: center; font-size: 11px; color: #829AB1;">
              Nordic Air Dispatch Notification | Durban, South Africa
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();
  }

  /**
   * Main automation orchestrator: Sends customer confirmation and admin notification emails.
   */
  async sendBookingEmails(data: QuoteRequestData, reference: string): Promise<SendBookingResult> {
    const customerHtml = this.generateCustomerEmailHtml(data, reference);
    const adminHtml = this.generateAdminEmailHtml(data, reference);

    const urgentFlag = data.isUrgent ? '⚡ URGENT - ' : '';
    const adminSubject = `[Nordic Air Booking] ${urgentFlag}${data.fullName} - ${data.serviceType} (${data.suburb})`;
    const customerSubject = `Thank you ${data.fullName}, we have got your confirmation - Nordic Air Durban`;

    let customerSent = false;
    let adminSent = false;
    let error: string | undefined;

    try {
      // 1. Sync contact into Brevo list #10 (nordic-air) in marketing_automation
      this.syncContactToList(data).catch(() => {});

      // 2. Dispatch Confirmation to Customer
      const custResult = await this.sendTransactionalEmail({
        to: [{ email: data.email, name: data.fullName }],
        subject: customerSubject,
        htmlContent: customerHtml,
        replyTo: { email: 'service@nordicair.co.za', name: 'Nordic Air Service Desk' },
      });
      customerSent = custResult.success;

      // 3. Dispatch Notification to Admin (i.t.safuneralsupplies@gmail.com)
      const adminResult = await this.sendTransactionalEmail({
        to: [{ email: this.adminEmail, name: 'Nordic Air Admin' }],
        subject: adminSubject,
        htmlContent: adminHtml,
        replyTo: { email: data.email, name: data.fullName },
      });
      adminSent = adminResult.success;

      if (!customerSent && !adminSent) {
        error = custResult.error || adminResult.error || 'Unable to dispatch automated emails. (Please check VITE_BREVO_API_KEY configuration)';
      }
    } catch (e: any) {
      console.error('Error during booking email automation:', e);
      error = e?.message || 'Unexpected error occurred while dispatching booking emails.';
    }

    return {
      success: customerSent || adminSent,
      customerSent,
      adminSent,
      error,
      reference,
    };
  }
}

export const brevoService = new BrevoService();
