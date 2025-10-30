"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Post } from "@/lib/types";

export default function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    userId: "",
  });

  useEffect(() => {
    loadPost();
  }, []);

  const loadPost = async () => {
    setLoading(true);
    try {
      console.log("id", id);
      const response = await fetch(`/api/posts/${id}`);
      const result = await response.json();

      if (result.success) {
        setPost(result.data);
        setFormData({
          title: result.data.title,
          body: result.data.body,
          userId: result.data.userId.toString(),
        });
      }
    } catch (err) {
      alert("Erreur de chargement");
    } finally {
      setLoading(false);
    }
  };

  const handlePut = async () => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        alert("✅ POST remplacé avec PUT !");
        setPost(result.data);
        setEditing(false);
      } else {
        alert("❌ Erreur: " + result.error);
      }
    } catch (err) {
      alert("❌ Erreur lors de la mise à jour");
    }
  };

  const handlePatch = async (field: "title" | "body") => {
    const value = formData[field];
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });

      const result = await response.json();

      if (result.success) {
        alert(`✅ ${field} mis à jour avec PATCH !`);
        setPost(result.data);
      } else {
        alert("❌ Erreur: " + result.error);
      }
    } catch (err) {
      alert("❌ Erreur lors de la mise à jour");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Supprimer ce post ?")) return;

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        alert("✅ Post supprimé !");
        router.push("/posts");
      } else {
        alert("❌ Erreur: " + result.error);
      }
    } catch (err) {
      alert("❌ Erreur lors de la suppression");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!post) {
    return <div>Post non trouvé</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/posts"
          className="text-blue-600 hover:text-blue-800 font-semibold"
        >
          ← Retour aux posts
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Post #{post.id}
            </h1>
            <p className="text-gray-600">Utilisateur {post.userId}</p>
          </div>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-semibold"
          >
            🗑️ DELETE
          </button>
        </div>

        {!editing ? (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {post.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">{post.body}</p>
            </div>

            <button
              onClick={() => setEditing(true)}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              ✏️ Modifier le post
            </button>
          </>
        ) : (
          <div className="space-y-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
              <p className="text-yellow-800 font-semibold mb-2">
                Testez les différentes méthodes:
              </p>
              <ul className="text-yellow-700 text-sm space-y-1">
                <li>
                  • <strong>PUT</strong>: Remplace tout le post (tous les champs
                  requis)
                </li>
                <li>
                  • <strong>PATCH</strong>: Met à jour un champ spécifique
                  seulement
                </li>
              </ul>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User ID
              </label>
              <select
                value={formData.userId}
                onChange={(e) =>
                  setFormData({ ...formData, userId: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
                  <option key={id} value={id}>
                    Utilisateur {id}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => handlePatch("title")}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors font-semibold whitespace-nowrap"
                >
                  🔧 PATCH titre
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contenu
              </label>
              <div className="space-y-2">
                <textarea
                  value={formData.body}
                  onChange={(e) =>
                    setFormData({ ...formData, body: e.target.value })
                  }
                  rows={6}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => handlePatch("body")}
                  className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
                >
                  🔧 PATCH contenu
                </button>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handlePut}
                className="flex-1 bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors font-semibold"
              >
                📝 PUT - Remplacer tout
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                  setFormData({
                    title: post.title,
                    body: post.body,
                    userId: post.userId.toString(),
                  });
                }}
                className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
              >
                Annuler
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
