import Link from "next/link";
import { use } from "react";

const photos = [
  {
    id: 1,
    title: "Coucher de soleil",
    color: "bg-orange-400",
    description: "Un magnifique coucher de soleil sur l'océan",
  },
  {
    id: 2,
    title: "Montagne",
    color: "bg-blue-600",
    description: "Les sommets enneigés des Alpes",
  },
  {
    id: 3,
    title: "Forêt",
    color: "bg-green-500",
    description: "Une forêt dense et mystérieuse",
  },
  {
    id: 4,
    title: "Océan",
    color: "bg-cyan-500",
    description: "Les vagues de l'océan Pacifique",
  },
  {
    id: 5,
    title: "Désert",
    color: "bg-yellow-600",
    description: "Les dunes du Sahara",
  },
  {
    id: 6,
    title: "Ville",
    color: "bg-gray-600",
    description: "La skyline de New York",
  },
];

export default function PhotoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const photo = photos.find((p) => p.id === parseInt(id));

  if (!photo) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-red-600">Photo non trouvée</h1>
          <Link
            href="/photos"
            className="text-blue-600 hover:underline mt-4 inline-block"
          >
            ← Retour à la galerie
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="mb-6">
            <Link
              href="/photos"
              className="text-blue-600 hover:underline flex items-center gap-2"
            >
              ← Retour à la galerie
            </Link>
          </div>

          <div className="mb-6">
            <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
              📄 Page Complète (Refresh)
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-6 text-gray-800">
            {photo.title}
          </h1>

          <div
            className={`${photo.color} rounded-lg h-96 flex items-center justify-center mb-6`}
          >
            <span className="text-white text-6xl font-bold">#{photo.id}</span>
          </div>

          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-4">{photo.description}</p>
            <p className="text-gray-600">
              Cette page s&apos;affiche lorsque vous :
            </p>
            <ul className="list-disc list-inside text-gray-600">
              <li>Accédez directement à l&apos;URL</li>
              <li>Rafraîchissez la page (F5)</li>
              <li>Ouvrez le lien dans un nouvel onglet</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
