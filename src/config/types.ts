export interface Customer {
  id: string;
  name: string;
  email: string;
  created: string;
}

export interface SubscriptionDetails {
  status: string;
  currentPeriodStart: string;
  trialEnd: string | null;
  plan: {
    name: string;
    price: number;
    features: string[];
  };
  payment: {
    last4: string;
    brand: string;
  };
  nextInvoice: {
    amount: number;
    date: string;
  };
} 

export interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  description?: string;
  popular?: boolean;
  interval?: 'month' | 'year';
} 