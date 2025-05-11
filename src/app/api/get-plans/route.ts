import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});

export async function GET() {
  try {

    const allProducts = await stripe.products.list({
        active: true,
        expand: ['data.default_price'],
      });
      
      // Filter for membership-related products only
      const products = allProducts.data.filter(
        (product) => product.metadata.type === 'membership'
      );

    // Transform the data to match our frontend structure
    const plans = products.map((product) => {
      const price = product.default_price as Stripe.Price;
      
      
      // Get features from metadata
      const features = product.marketing_features 
        ? product.marketing_features.map((feature: any) => feature.name)
        : [];

      return {
        id: price.id,
        name: product.name,
        price: price.unit_amount ? price.unit_amount / 100 : 0, // Convert from cents to dollars
        features,
        description: product.description,
        metadata: product.metadata,
      };
    }).sort((a, b) => a.price - b.price);

    return NextResponse.json({ plans });
  } catch (error) {
    console.error('Error fetching plans:', error);
    return NextResponse.json(
      { error: 'Error fetching plans' },
      { status: 500 }
    );
  }
} 