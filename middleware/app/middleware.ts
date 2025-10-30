import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Définition des routes
const publicRoutes = ["/", "/about"];
const authRoutes = ["/login", "/register"];
const protectedRoutes = ["/dashboard", "/profile", "/settings"];
const adminRoutes = ["/admin", "/admin/users"];
const restrictedGeoRoutes = ["/premium", "/exclusive"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Récupérer les informations utilisateur
  const isAuthenticated = request.cookies.get("auth_token")?.value
    ? true
    : false;
  const userRole = request.cookies.get("user_role")?.value || "guest";

  // 1. Rate Limiting
  const requestCount = parseInt(
    request.cookies.get("request_count")?.value || "0"
  );
  if (requestCount >= 10) {
    return new NextResponse("Too Many Requests", { status: 429 });
  }

  // 2. Maintenance Mode (sauf admins)
  const isMaintenanceMode = process.env.MAINTENANCE_MODE === "true";
  if (
    isMaintenanceMode &&
    userRole !== "admin" &&
    pathname !== "/maintenance"
  ) {
    return NextResponse.rewrite(new URL("/maintenance", request.url));
  }

  // 3. Géolocalisation
  const country = request.geo?.country || "US";
  const blockedCountries = ["CN", "KP"];
  if (
    restrictedGeoRoutes.some((r) => pathname.startsWith(r)) &&
    blockedCountries.includes(country)
  ) {
    return NextResponse.redirect(new URL("/geo-restricted", request.url));
  }

  // 4. Routes publiques
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // 5. Routes d'authentification (redirection si déjà connecté)
  if (authRoutes.includes(pathname)) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // 6. Routes protégées (authentification requise)
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      const url = new URL("/login", request.url);
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // 7. Routes admin (rôle admin requis)
  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated || userRole !== "admin") {
      return NextResponse.redirect(new URL("/403-forbidden", request.url));
    }
    return NextResponse.next();
  }

  // 8. Headers de sécurité
  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Incrémenter le compteur de requêtes
  response.cookies.set("request_count", String(requestCount + 1), {
    maxAge: 3600, // 1 heure
  });

  return response;
}

// Configuration du matcher
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\\\.png$).*)"],
};
