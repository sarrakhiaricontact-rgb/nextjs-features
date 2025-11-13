export default function DataCache() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-6">Data Cache</h1>
      <p className="text-gray-400 text-lg leading-relaxed max-w-4xl mb-8">
        The Data Cache persists the result of data fetches across incoming
        server requests and deployments.
      </p>

      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Configuration</h2>
        <p className="text-gray-400 mb-4">
          Control caching behavior with fetch options:
        </p>
        <div className="bg-black p-4 rounded border border-gray-700">
          <code className="text-green-400">
            {`fetch('/api/data', {
  cache: 'force-cache',
  next: { revalidate: 3600 }
})`}
          </code>
        </div>
      </div>
    </>
  );
}
