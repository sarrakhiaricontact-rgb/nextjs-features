// app/page.tsx
import Link from "next/link";

export default function Home() {
  const methods = [
    {
      name: "GET",
      color: "bg-green-500",
      description: "Récupérer des données",
      example: "Lister tous les posts",
    },
    {
      name: "POST",
      color: "bg-blue-500",
      description: "Créer une nouvelle ressource",
      example: "Créer un nouveau post",
    },
    {
      name: "PUT",
      color: "bg-yellow-500",
      description: "Remplacer complètement",
      example: "Remplacer un post entier",
    },
    {
      name: "PATCH",
      color: "bg-orange-500",
      description: "Modifier partiellement",
      example: "Modifier le titre d'un post",
    },
    {
      name: "DELETE",
      color: "bg-red-500",
      description: "Supprimer une ressource",
      example: "Supprimer un post",
    },
    {
      name: "HEAD",
      color: "bg-purple-500",
      description: "Obtenir les métadonnées",
      example: "Vérifier l'existence",
    },
    {
      name: "OPTIONS",
      color: "bg-gray-500",
      description: "Méthodes disponibles",
      example: "CORS preflight",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Next.js Route Handlers Demo
        </h1>
        <p className="text-xl text-gray-600">
          Testez toutes les méthodes HTTP avec JSONPlaceholder API
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {methods.map((method) => (
          <div
            key={method.name}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center mb-4">
              <span
                className={`${method.color} text-white font-bold px-3 py-1 rounded text-sm`}
              >
                {method.name}
              </span>
            </div>
            <h3 className="font-semibold text-lg mb-2 text-gray-800">
              {method.description}
            </h3>
            <p className="text-gray-600 text-sm">{method.example}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          🚀 Commencez l&apos;exploration
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/posts"
            className="block p-6 bg-linear-to-br from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all text-center"
          >
            <div className="text-4xl mb-2">📝</div>
            <div className="font-semibold text-lg">Posts</div>
            <div className="text-sm opacity-90">Gérer les articles</div>
          </Link>

          <Link
            href="/users"
            className="block p-6 bg-linear-to-br from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all text-center"
          >
            <div className="text-4xl mb-2">👥</div>
            <div className="font-semibold text-lg">Utilisateurs</div>
            <div className="text-sm opacity-90">Voir les profils</div>
          </Link>

          <Link
            href="/comments"
            className="block p-6 bg-linear-to-br from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all text-center"
          >
            <div className="text-4xl mb-2">💬</div>
            <div className="font-semibold text-lg">Commentaires</div>
            <div className="text-sm opacity-90">Explorer les discussions</div>
          </Link>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
        <h3 className="font-semibold text-lg mb-2 text-blue-800">
          📚 À propos de cette démo
        </h3>
        <p className="text-blue-700">
          Cette application utilise <strong>JSONPlaceholder</strong> comme API
          factice pour démontrer toutes les méthodes HTTP supportées par Next.js
          Route Handlers. Explorez chaque section pour voir les exemples en
          action !
        </p>
      </div>
    </div>
  );
}
