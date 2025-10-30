"use client";

import { Comment } from "@/lib/types";
import { useState, useEffect } from "react";

export default function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [postId, setPostId] = useState("");
  const [limit, setLimit] = useState("20");

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (postId) params.append("postId", postId);
      if (limit) params.append("limit", limit);

      const response = await fetch(`/api/comments?${params}`);
      const result = await response.json();

      if (result.success) {
        setComments(result.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">💬 Commentaires</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">🔍 Filtres</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Post ID
            </label>
            <input
              type="number"
              value={postId}
              onChange={(e) => setPostId(e.target.value)}
              placeholder="Filtrer par post"
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
              placeholder="20"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={loadComments}
              className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              🔄 GET - Rechercher
            </button>
          </div>
        </div>
      </div>

      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {!loading && (
        <div className="space-y-4">
          <p className="text-gray-600">
            📊 {comments.length} commentaire(s) trouvé(s)
          </p>
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start mb-3">
                <div className="text-2xl mr-3">💬</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">
                    {comment.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {comment.email} • Post #{comment.postId}
                  </p>
                </div>
              </div>
              <p className="text-gray-700">{comment.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
