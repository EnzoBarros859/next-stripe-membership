import { Plan } from '../../config/types';
import MembershipCard from '../../components/MembershipCard';

async function getPlans(): Promise<Plan[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-plans`, {
    cache: 'no-store'
  });
  const data = await response.json();
  return data.plans;
}

export default async function MembershipPage() {
  const plans = await getPlans();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Membership Plans
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
              Choose the perfect plan for your needs and unlock exclusive benefits
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Cards Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <MembershipCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  );
} 