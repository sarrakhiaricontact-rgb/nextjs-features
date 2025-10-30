// app/posts/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Post } from "@/lib/types";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");
  const [limit, setLimit] = useState("10");

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (userId) params.append("userId", userId);
      if (limit) params.append("limit", limit);

      const response = await fetch(`/api/posts?${params}`);
      const result = await response.json();

      if (result.success) {
        setPosts(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Erreur de chargement");
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce post ?")) return;

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        setPosts(posts.filter((p) => p.id !== id));
        alert("Post supprimé avec succès !");
      } else {
        alert("Erreur: " + result.error);
      }
    } catch (err) {
      alert("Erreur lors de la suppression");
    }
  };

  const testHead = async () => {
    try {
      const response = await fetch("/api/posts", { method: "HEAD" });
      const total = response.headers.get("X-Total-Posts");
      const version = response.headers.get("X-API-Version");
      alert(`Total Posts: ${total}\nAPI Version: ${version}`);
    } catch (err) {
      alert("Erreur lors de la requête HEAD");
    }
  };

  const testOptions = async () => {
    try {
      const response = await fetch("/api/posts", { method: "OPTIONS" });
      const allow = response.headers.get("Allow");
      alert(`Méthodes autorisées: ${allow}`);
    } catch (err) {
      alert("Erreur lors de la requête OPTIONS");
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">📝 Posts</h1>
        <Link
          href="/posts/new"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          ➕ Nouveau Post
        </Link>
      </div>

      {/* Filtres */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          🔍 Filtres & Tests
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              User ID
            </label>
            <input
              type="number"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="1-10"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Limite
            </label>
            <input
              type="number"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              placeholder="10"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={loadPosts}
              className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              🔄 GET - Rechercher
            </button>
          </div>
          <div className="flex items-end space-x-2">
            <button
              onClick={testHead}
              className="flex-1 bg-purple-600 text-white px-2 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
            >
              HEAD
            </button>
            <button
              onClick={testOptions}
              className="flex-1 bg-gray-600 text-white px-2 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
            >
              OPTIONS
            </button>
          </div>
        </div>
      </div>

      {/* Résultats */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-700">❌ {error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-4">
          <p className="text-gray-600">📊 {posts.length} post(s) trouvé(s)</p>
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <Link
                    href={`/posts/${post.id}`}
                    className="text-xl font-semibold text-blue-600 hover:text-blue-800"
                  >
                    {post.title}
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">
                    Post #{post.id} • User {post.userId}
                  </p>
                </div>
                <button
                  onClick={() => deletePost(post.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors text-sm font-semibold"
                >
                  🗑️ DELETE
                </button>
              </div>
              <p className="text-gray-700">{post.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
