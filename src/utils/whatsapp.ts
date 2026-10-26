/**
 * WhatsApp dispatch URL generator for Nordic Air Durban
 * Zero external dependencies, pure URL encoding
 */

export interface WhatsAppQuoteParams {
  name?: string;
  phone?: string;
  serviceType: string;
  suburb: string;
  details?: string;
  isUrgent?: boolean;
}

const NORDIC_AIR_WHATSAPP_NUMBER = '27319403388'; // Durban dispatch line formatted for WhatsApp (E.164 without +)

export function generateWhatsAppQuoteUrl(params: WhatsAppQuoteParams): string {
  const lines: string[] = [
    'Hello Nordic Air Durban, I would like to request an air conditioning quote / service assessment.',
    '',
    `Service Needed: ${params.serviceType || 'Air Conditioning Service'}`,
    `Suburb / Location: ${params.suburb || 'Durban Area'}`,
  ];

  if (params.isUrgent) {
    lines.push('Priority: URGENT SAME-DAY CALLOUT REQUIRED');
  } else {
    lines.push('Priority: Standard Service Request');
  }

  if (params.name && params.name.trim()) {
    lines.push(`Contact Name: ${params.name.trim()}`);
  }

  if (params.phone && params.phone.trim()) {
    lines.push(`Contact Number: ${params.phone.trim()}`);
  }

  if (params.details && params.details.trim()) {
    lines.push(`Notes / Room Details: ${params.details.trim()}`);
  }

  lines.push('');
  lines.push('Sent via Nordic Air online portal (nordicair.co.za)');

  const message = lines.join('\n');
  return `https://wa.me/${NORDIC_AIR_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function openWhatsAppQuote(params: WhatsAppQuoteParams): void {
  const url = generateWhatsAppQuoteUrl(params);
  window.open(url, '_blank', 'noopener,noreferrer');
}
