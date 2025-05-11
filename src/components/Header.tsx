import Link from 'next/link';
import Navigation from './Navigation';

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-indigo-600">
              Next-Stripe
            </Link>
          </div>
          <Navigation />
        </div>
      </div>
      <div className='bg-gradient-to-r from-indigo-500 to-purple-600 h-1' >
      </div>
    </header>
  );
} 