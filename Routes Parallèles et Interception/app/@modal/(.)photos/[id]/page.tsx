"use client";

import { useRouter } from "next/navigation";
import { use, useEffect } from "react";

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

export default function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  console.log("🟢 page.tsx du modal intercepté rendu pour photo", id);
  const photo = photos.find((p) => p.id === parseInt(id));

  useEffect(() => {
    // Empêcher le scroll du body quand le modal est ouvert
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleClose = () => {
    router.back();
  };

  if (!photo) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
              🎭 Modal (Navigation Client)
            </span>
            <h2 className="text-xl font-bold text-gray-800">{photo.title}</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <div
            className={`${photo.color} rounded-lg h-80 flex items-center justify-center mb-6`}
          >
            <span className="text-white text-6xl font-bold">#{photo.id}</span>
          </div>

          <p className="text-lg text-gray-700 mb-4">{photo.description}</p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-sm text-blue-800">
              <strong>💡 Astuce :</strong> Appuyez sur Échap ou cliquez en
              dehors pour fermer. Rafraîchissez la page (F5) pour voir la
              version complète !
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
