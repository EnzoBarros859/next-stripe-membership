import { Customer, SubscriptionDetails } from '../../config/types';
import SubscriptionClient from '../../components/SubscriptionClient';

async function getCustomers(): Promise<Customer[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-customers`, {
    cache: 'no-store'
  });
  const data = await response.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return data.customers;
}

export default async function SubscriptionPage() {
  const customers = await getCustomers();

  return <SubscriptionClient customers={customers} />;
} 