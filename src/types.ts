export type ServiceCategory = 'residential' | 'commercial';

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  recommendedFor: string;
  warranty: string;
  popular?: boolean;
}

export interface SuburbLocation {
  id: string;
  name: string;
  region: string;
  coords: { x: number; y: number };
  responseTime: string;
  unitsOnCall: number;
  highlight: string;
  popularSystems: string[];
}

export interface QuoteRequestData {
  fullName: string;
  email: string;
  phone: string;
  suburb: string;
  serviceType: string;
  isUrgent: boolean;
  notes: string;
}
