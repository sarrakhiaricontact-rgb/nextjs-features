export default function RouterCache() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-6">Router Cache</h1>
      <p className="text-gray-400 text-lg leading-relaxed max-w-4xl mb-8">
        Next.js has an in-memory client-side cache that stores the React Server
        Component Payload.
      </p>

      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Cache Duration</h2>
        <ul className="space-y-2 text-gray-400">
          <li className="flex items-start">
            <span className="text-green-400 mr-2">•</span>
            <span>
              <strong>Static routes:</strong> Cached for 5 minutes
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-400 mr-2">•</span>
            <span>
              <strong>Dynamic routes:</strong> Cached for 30 seconds
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-400 mr-2">•</span>
            <span>
              <strong>Prefetched routes:</strong> Cached for 30 seconds
            </span>
          </li>
        </ul>
      </div>
    </>
  );
}
