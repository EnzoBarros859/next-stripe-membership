'use client';

import { Plan } from '../config/types';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface MembershipCardProps {
  plan: Plan;
}

export default function MembershipCard({ plan }: MembershipCardProps) {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId: plan.id }),
      });

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`relative flex flex-col h-full bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 ${
      plan.popular ? 'ring-2 ring-indigo-500' : ''
    }`}>
      {plan.popular && (
        <div className="absolute top-0 right-0 bg-indigo-500 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
          Most Popular
        </div>
      )}
      
      {/* Card Header */}
      <div className="px-6 py-8 bg-gradient-to-r from-indigo-500 to-purple-600">
        <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
        <div className="mt-4 flex items-baseline text-white">
          <span className="text-5xl font-extrabold tracking-tight">
            ${plan.price}
          </span>
          <span className="ml-1 text-xl font-semibold">/{plan.interval || 'month'}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-grow px-6 pt-8">
        {plan.description && (
          <p className="text-gray-600 mb-6">{plan.description}</p>
        )}
        <ul className="space-y-4 flex-grow">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="ml-3 text-base text-gray-700">{feature}</p>
            </li>
          ))}
        </ul>

        {/* Subscribe Button - Now at the bottom */}
        <div className="mt-8 pb-6">
          <button
            onClick={handleSubscribe}
            disabled={loading}
            className={`w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white ${
              plan.popular 
                ? 'bg-indigo-600 hover:bg-indigo-700' 
                : 'bg-gray-800 hover:bg-gray-900'
            } disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200`}
          >
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Subscribe Now'
            )}
          </button>
        </div>
      </div>
    </div>
  );
} 