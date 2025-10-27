import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 ">
          🖼️ Galerie Photos - Parallel Routes Demo
        </h1>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
          <p className="text-blue-700">
            <strong>Astuce :</strong> Clique sur une photo pour ouvrir un modal.
            Rafraîchis la page pour voir la version complète !
          </p>
        </div>

        <Link
          href="/photos"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Voir la galerie →
        </Link>
      </div>
    </div>
  );
}
