export default function FullRouteCache() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-6">Full Route Cache</h1>
      <p className="text-gray-400 text-lg leading-relaxed max-w-4xl mb-8">
        Next.js automatically renders and caches routes at build time.
      </p>

      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Static vs Dynamic</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black p-4 rounded border border-gray-700">
            <h3 className="text-lg font-semibold text-green-400 mb-2">
              Static Routes
            </h3>
            <p className="text-gray-400 text-sm">Cached at build time</p>
          </div>
          <div className="bg-black p-4 rounded border border-gray-700">
            <h3 className="text-lg font-semibold text-blue-400 mb-2">
              Dynamic Routes
            </h3>
            <p className="text-gray-400 text-sm">Rendered on each request</p>
          </div>
        </div>
      </div>
    </>
  );
}
