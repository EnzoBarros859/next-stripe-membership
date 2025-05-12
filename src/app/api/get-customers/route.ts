import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const customers = await stripe.customers.list({
      limit: 100,
      expand: ['data.subscriptions'],
    });

    const formattedCustomers = customers.data.map(customer => ({
      id: customer.id,
      name: customer.name || 'Unnamed Customer',
      email: customer.email,
      created: new Date(customer.created * 1000).toLocaleDateString(),
    }));
    console.log('formattedCustomers', formattedCustomers);
    return NextResponse.json({ customers: formattedCustomers });
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json(
      { error: 'Error fetching customers' },
      { status: 500 }
    );
  }
} 