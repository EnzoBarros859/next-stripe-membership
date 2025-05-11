import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Tailwind CSS Test
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1 */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Card 1</h2>
            <p className="text-gray-600">This card uses Tailwind classes for styling</p>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-blue-50 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Card 2</h2>
            <p className="text-blue-600">Another card with different colors</p>
          </div>
        </div>

        {/* Button Test */}
        <div className="mt-8 space-x-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
            Primary Button
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors">
            Secondary Button
          </button>
        </div>
      </div>
    </main>
  )
}
