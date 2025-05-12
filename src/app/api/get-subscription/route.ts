import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const customerId = searchParams.get('customerId');
    
    if (!customerId) {
      return NextResponse.json(
        { error: 'Customer ID is required' },
        { status: 400 }
      );
    }

    // Get all subscriptions for the customer
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      expand: ['data.default_payment_method', 'data.plan.product'],
    });

    if (subscriptions.data.length === 0) {
      return NextResponse.json(
        { error: 'No subscription found' },
        { status: 404 }
      );
    }

    const subscription = subscriptions.data[0];
    const paymentMethod = subscription.default_payment_method as Stripe.PaymentMethod;

    // Access subscription items (there could be multiple items)
    const subscriptionItem = subscription.items.data[0];  // Assuming only one item in the subscription
    const price = subscriptionItem.price;

    // Retrieve the product associated with the price
    const product = await stripe.products.retrieve(price.product as string);

    const subscriptionDetails = {
      status: subscription.status,
      currentPeriodStart: new Date(subscription.start_date * 1000).toISOString(),
      trialEnd: subscription.trial_end
        ? new Date(subscription.trial_end * 1000).toISOString()
        : null,
      plan: {
        name: product.name,
        price: price.unit_amount ? price.unit_amount / 100 : 0,
        features: product.marketing_features
          ? product.marketing_features.map((feature: any) => feature.name)
          : [],
      },
      payment: {
        last4: paymentMethod?.card?.last4 || 'N/A',
        brand: paymentMethod?.card?.brand || 'N/A'
      }
    };

    return NextResponse.json(subscriptionDetails);
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return NextResponse.json(
      { error: 'Error fetching subscription details' },
      { status: 500 }
    );
  }
} 