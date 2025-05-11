import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export const MEMBERSHIP_PLANS = {
  BASIC: {
    id: 'price_XXXXX',
    name: 'Basic Plan',
    price: 9.99,
    features: [
      'Access to basic content',
      'Community forum access',
      'Monthly newsletter'
    ]
  },
  PRO: {
    id: 'price_XXXXX',
    name: 'Pro Plan',
    price: 19.99,
    features: [
      'All Basic features',
      'Premium content access',
      'Priority support',
      'Exclusive webinars'
    ]
  },
  ENTERPRISE: {
    id: 'price_XXXXX',
    name: 'Enterprise Plan',
    price: 49.99,
    features: [
      'All Pro features',
      'Custom solutions',
      'Dedicated account manager',
      'API access'
    ]
  }
}; 