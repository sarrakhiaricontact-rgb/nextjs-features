// app/users/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User } from "@/lib/types";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/users");
      const result = await response.json();

      if (result.success) {
        setUsers(result.data);
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

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">👥 Utilisateurs</h1>

      <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded">
        <p className="text-green-700">
          <strong>Méthode: GET</strong> - Liste de tous les utilisateurs depuis
          JSONPlaceholder
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <Link
            key={user.id}
            href={`/users/${user.id}`}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <div className="text-4xl mb-3">👤</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {user.name}
            </h3>
            <p className="text-gray-600 text-sm mb-1">@{user.username}</p>
            <p className="text-blue-600 text-sm">{user.email}</p>
            {user.company && (
              <p className="text-gray-500 text-xs mt-2">{user.company.name}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
