"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Accueil" },
    { href: "/posts", label: "Posts" },
    { href: "/users", label: "Utilisateurs" },
    { href: "/comments", label: "Commentaires" },
  ];

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="font-bold text-xl">
              📡 API Demo
            </Link>
          </div>

          <div className="flex space-x-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-md transition-colors ${
                  pathname === link.href
                    ? "bg-blue-700 font-semibold"
                    : "hover:bg-blue-500"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
