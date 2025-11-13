"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./layout.module.css";
import "./globals.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const routes = [
    { name: "Home", path: "/" },
    { name: "Request Memoization", path: "/request-memoization" },
    { name: "Data Cache", path: "/data-cache" },
    { name: "Full Route Cache", path: "/full-route-cache" },
    { name: "Router Cache", path: "/router-cache" },
  ];

  return (
    <html lang="en">
      <body style={{ backgroundColor: "#000", color: "#fff" }}>
        <nav className={styles.navbar}>
          <div className={styles.navContainer}>
            <div className={styles.navLinks}>
              {routes.map((route) => (
                <Link
                  key={route.path}
                  href={route.path}
                  className={`text-sm transition-colors ${
                    pathname === route.path
                      ? "text-white"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {route.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Content */}
        <main className={styles.main}>{children}</main>
      </body>
    </html>
  );
}
