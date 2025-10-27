import Link from "next/link";

// Données de test
const photos = [
  { id: 1, title: "Coucher de soleil", color: "bg-orange-400" },
  { id: 2, title: "Montagne", color: "bg-blue-600" },
  { id: 3, title: "Forêt", color: "bg-green-500" },
  { id: 4, title: "Océan", color: "bg-cyan-500" },
  { id: 5, title: "Désert", color: "bg-yellow-600" },
  { id: 6, title: "Ville", color: "bg-gray-600" },
];

export default function PhotosPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold ">Galerie Photos</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            ← Retour
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <Link
              key={photo.id}
              href={`/photos/${photo.id}`}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform group-hover:scale-105">
                <div
                  className={`${photo.color} h-64 flex items-center justify-center`}
                >
                  <span className="text-white text-2xl font-bold">
                    #{photo.id}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                  <h3 className="text-lg font-semibold">{photo.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
