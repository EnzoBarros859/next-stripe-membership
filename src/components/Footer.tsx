export default function Footer() {
  return (
    <footer className="bg-white">
      <div className='bg-gradient-to-r from-indigo-500 to-purple-600 h-1' >
      </div>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
      </div>
    </footer>
  );
} 