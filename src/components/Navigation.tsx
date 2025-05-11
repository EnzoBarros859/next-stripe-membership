import Link from 'next/link';
import { headers } from 'next/headers';

export default function Navigation() {
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '/';

  const isActive = (path: string) => {
    return pathname === path ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900';
  };

  return (
    <nav className="flex items-center space-x-8">
      <Link
        href="/membership"
        className={`text-sm font-medium ${isActive('/membership')}`}
      >
        Membership
      </Link>
      <Link
        href="/subscription"
        className={`text-sm font-medium ${isActive('/subscription')}`}
      >
        Subscription
      </Link>
    </nav>
  );
} 