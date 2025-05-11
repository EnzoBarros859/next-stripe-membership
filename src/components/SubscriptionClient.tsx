'use client';

import { useEffect, useState } from 'react';
import { Customer, SubscriptionDetails } from '../config/types';

interface SubscriptionClientProps {
  customers: Customer[];
}

export default function SubscriptionClient({ customers }: SubscriptionClientProps) {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [subscription, setSubscription] = useState<SubscriptionDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!selectedCustomerId) {
        setSubscription(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/get-subscription?customerId=${selectedCustomerId}`);
        const data = await response.json();
        if (data.error) {
          setError(data.error);
          setSubscription(null);
        } else {
          setSubscription(data);
        }
      } catch (err) {
        setError('Failed to fetch subscription details');
        setSubscription(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [selectedCustomerId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-100 text-emerald-800';
      case 'past_due':
        return 'bg-amber-100 text-amber-800';
      case 'canceled':
        return 'bg-rose-100 text-rose-800';
      case 'trialing':
        return 'bg-blue-100 text-blue-800';
      case 'unpaid':
        return 'bg-rose-100 text-rose-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8">
            <h1 className="text-3xl font-bold text-white mb-2">Subscription Management</h1>
            <p className="text-indigo-100">Manage and view subscription details for your customers</p>
          </div>

          {/* Customer Selection */}
          <div className="p-6 border-b border-gray-200">
            <label htmlFor="customer" className="block text-sm font-medium text-gray-700 mb-2">
              Select Customer
            </label>
            <select
              id="customer"
              value={selectedCustomerId}
              onChange={(e) => setSelectedCustomerId(e.target.value)}
              className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 text-black"
            >
              <option value="">Select a customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name} ({customer.email})
                </option>
              ))}
            </select>
          </div>

          {error && (
            <div className="m-6 p-4 rounded-lg bg-rose-50 border border-rose-200">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-rose-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm font-medium text-rose-800">{error}</p>
              </div>
            </div>
          )}

          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
              <p className="mt-4 text-gray-600 font-medium">Loading subscription details...</p>
            </div>
          ) : subscription ? (
            <div className="p-6 space-y-6">
              {/* Status Card */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Subscription Status</h3>
                    <p className="text-sm text-gray-500">Current subscription state</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(subscription.status)}`}>
                    {subscription.status ? subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1) : 'N/A'}
                  </span>
                </div>
              </div>

              {/* Plan Details Card */}
              {subscription.plan && (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Plan</h3>
                  <div className="space-y-4">
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold text-gray-900">${subscription.plan.price}</span>
                      <span className="text-gray-500">/month</span>
                    </div>
                    <h4 className="text-xl font-medium text-gray-900">{subscription.plan.name}</h4>
                    <div className="mt-4">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Features:</h5>
                      <ul className="space-y-2">
                        {subscription.plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-gray-600">
                            <svg className="h-5 w-5 text-emerald-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Billing Information Card */}
              {subscription.payment && (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">••••</span>
                      </div>
                      <span className="text-gray-700">
                        Card ending in <strong>{subscription.payment.last4}</strong> ({subscription.payment.brand.toUpperCase()})
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Billing Cycle Card */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Cycle</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Start Date -  {new Date(subscription.currentPeriodStart).toLocaleDateString()}</p>

                  </div>
                  {subscription.trialEnd && (
                    <div>
                      <p className="text-sm text-gray-500">Trial Ends</p>
                      <p className="text-gray-900">{new Date(subscription.trialEnd).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Next Invoice Card */}
              {subscription.nextInvoice && (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Invoice</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Amount</p>
                      <p className="text-2xl font-bold text-gray-900">${subscription.nextInvoice.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Due Date</p>
                      <p className="text-gray-900">{new Date(subscription.nextInvoice.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : selectedCustomerId ? (
            <div className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-600 font-medium">No active subscription found for this customer.</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}