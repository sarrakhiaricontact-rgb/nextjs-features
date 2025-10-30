"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { User } from "@/lib/types";

export default function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    setLoading(true);
    try {
      console.log("id", id);
      const response = await fetch(`/api/users/${id}`);
      const result = await response.json();

      if (result.success) {
        setUser(result.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <div>Utilisateur non trouvé</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/users"
          className="text-blue-600 hover:text-blue-800 font-semibold"
        >
          ← Retour aux utilisateurs
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-start mb-6">
          <div className="text-6xl mr-6">👤</div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {user.name}
            </h1>
            <p className="text-gray-600">@{user.username}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-3">
              📧 Informations de contact
            </h3>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              {user.phone && (
                <p>
                  <strong>Téléphone:</strong> {user.phone}
                </p>
              )}
              {user.website && (
                <p>
                  <strong>Site web:</strong>{" "}
                  <a
                    href={`https://${user.website}`}
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    {user.website}
                  </a>
                </p>
              )}
            </div>
          </div>

          {user.address && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-3">📍 Adresse</h3>
              <div className="space-y-1 text-sm">
                <p>
                  {user.address.street}, {user.address.suite}
                </p>
                <p>
                  {user.address.city} {user.address.zipcode}
                </p>
              </div>
            </div>
          )}

          {user.company && (
            <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
              <h3 className="font-semibold text-gray-700 mb-3">
                🏢 Entreprise
              </h3>
              <div className="space-y-1 text-sm">
                <p>
                  <strong>{user.company.name}</strong>
                </p>
                <p className="text-gray-600 italic">
                  {user.company.catchPhrase}
                </p>
                <p className="text-gray-500 text-xs">{user.company.bs}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
