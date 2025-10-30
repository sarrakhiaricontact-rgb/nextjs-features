"use client";
import { useState, useCallback, useMemo } from "react";
import {
  Shield,
  MapPin,
  Users,
  Globe,
  Zap,
  Settings,
  LogIn,
  Home,
  UserCircle,
  Crown,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  RefreshCw,
  Download,
  Trash2,
} from "lucide-react";

// Types
type LogType = "error" | "warning" | "success" | "info";
type RouteType = "public" | "auth" | "protected" | "admin" | "geo";
type UserRole = "guest" | "user" | "admin";
type MiddlewareAction =
  | "BLOCK"
  | "REDIRECT"
  | "REWRITE"
  | "CONTINUE"
  | "ADD_HEADERS";

interface Log {
  id: string;
  type: LogType;
  icon: string;
  message: string;
  details?: string;
  middleware: string;
  action?: MiddlewareAction;
  newRoute?: string;
  statusCode?: number;
  originalRoute?: string;
  timestamp: string;
  final?: boolean;
}

interface Route {
  path: string;
  label: string;
  icon: typeof Home;
  type: RouteType;
}

// Configuration des routes
const ROUTES: Route[] = [
  { path: "/", label: "Accueil", icon: Home, type: "public" },
  { path: "/about", label: "À propos", icon: Globe, type: "public" },
  { path: "/login", label: "Connexion", icon: LogIn, type: "auth" },
  { path: "/register", label: "Inscription", icon: UserCircle, type: "auth" },
  { path: "/dashboard", label: "Dashboard", icon: Shield, type: "protected" },
  { path: "/profile", label: "Profil", icon: Users, type: "protected" },
  { path: "/settings", label: "Paramètres", icon: Settings, type: "protected" },
  { path: "/admin", label: "Admin Panel", icon: Crown, type: "admin" },
  { path: "/admin/users", label: "Admin/Users", icon: Users, type: "admin" },
  { path: "/premium", label: "Premium (Géo)", icon: MapPin, type: "geo" },
];

const PUBLIC_ROUTES = ["/", "/about"];
const AUTH_ROUTES = ["/login", "/register"];
const PROTECTED_ROUTES = ["/dashboard", "/profile", "/settings"];
const ADMIN_ROUTES = ["/admin", "/admin/users", "/admin/settings"];
const RESTRICTED_GEO_ROUTES = ["/premium", "/exclusive"];
const BLOCKED_COUNTRIES = ["CN", "KP"];
const RATE_LIMIT = 10;

// Composants réutilisables
const StatusBadge = ({ isActive }: { isActive: boolean }) => (
  <div
    className={`flex items-center gap-2 ${
      isActive ? "text-green-400" : "text-red-400"
    }`}
  >
    {isActive ? (
      <CheckCircle2 className="w-5 h-5" />
    ) : (
      <XCircle className="w-5 h-5" />
    )}
    <span className="font-medium">{isActive ? "Actif" : "Inactif"}</span>
  </div>
);

const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 ${className}`}
  >
    {children}
  </div>
);

const Button = ({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  className = "",
  icon: Icon,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
  icon?: typeof Home;
}) => {
  const variants = {
    primary:
      "bg-gradient-to-r from-indigo-500 to-purple-500 hover:shadow-lg hover:shadow-indigo-500/50",
    secondary: "bg-white/10 hover:bg-white/20",
    danger: "bg-red-500/20 hover:bg-red-500/30 border border-red-500/50",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full text-white font-medium py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
};

const AdvancedMiddlewareDemo = () => {
  // États
  const [selectedRoute, setSelectedRoute] = useState("/");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>("guest");
  const [userCountry, setUserCountry] = useState("FR");
  const [requestCount, setRequestCount] = useState(0);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [logs, setLogs] = useState<Log[]>([]);
  const [executionTime, setExecutionTime] = useState(0);

  // Utilitaires
  const createLog = useCallback(
    (
      type: LogType,
      icon: string,
      message: string,
      middleware: string,
      options?: Partial<Log>
    ): Log => ({
      id: `${Date.now()}-${Math.random()}`,
      type,
      icon,
      message,
      middleware,
      timestamp: new Date().toLocaleTimeString(),
      ...options,
    }),
    []
  );

  // Simulation du middleware
  const simulateMiddleware = useCallback(() => {
    const startTime = performance.now();
    const newLogs: Log[] = [];
    let finalRoute = selectedRoute;
    let blocked = false;
    let redirected = false;
    let statusCode = 200;

    // Log initial
    newLogs.push(
      createLog(
        "info",
        "🚀",
        `Requête reçue: ${selectedRoute}`,
        "Entry Point",
        { details: `Method: GET | User-Agent: Mozilla/5.0` }
      )
    );

    // 1. RATE LIMITING
    if (requestCount >= RATE_LIMIT) {
      newLogs.push(
        createLog(
          "error",
          "🚫",
          "BLOQUÉ: Limite de requêtes atteinte",
          "Rate Limiting",
          {
            details: `Rate Limit: ${requestCount}/${RATE_LIMIT} requêtes`,
            action: "BLOCK",
            statusCode: 429,
          }
        )
      );
      blocked = true;
      statusCode = 429;
    } else {
      setRequestCount((prev) => prev + 1);
      newLogs.push(
        createLog(
          "success",
          "✅",
          `Rate limit OK (${requestCount + 1}/${RATE_LIMIT})`,
          "Rate Limiting",
          { action: "CONTINUE" }
        )
      );
    }

    // 2. MAINTENANCE MODE
    if (!blocked && maintenanceMode && userRole !== "admin") {
      newLogs.push(
        createLog(
          "warning",
          "🚧",
          "Mode maintenance actif",
          "Maintenance Mode",
          {
            details: "Redirigé vers /maintenance (sauf admins)",
            action: "REWRITE",
            originalRoute: selectedRoute,
            newRoute: "/maintenance",
          }
        )
      );
      finalRoute = "/maintenance";
      redirected = true;
      statusCode = 503;
    } else if (maintenanceMode) {
      newLogs.push(
        createLog(
          "info",
          "👑",
          "Maintenance bypass - Admin",
          "Maintenance Mode",
          { details: "Accès admin autorisé malgré maintenance" }
        )
      );
    }

    // 3. GÉOLOCALISATION
    if (
      !blocked &&
      !redirected &&
      RESTRICTED_GEO_ROUTES.some((r) => selectedRoute.startsWith(r))
    ) {
      newLogs.push(
        createLog(
          "info",
          "🌍",
          `Géolocalisation détectée: ${userCountry}`,
          "Geolocation",
          {
            details: `IP: 192.168.1.${Math.floor(
              Math.random() * 255
            )} | Continent: ${
              userCountry === "FR"
                ? "Europe"
                : userCountry === "US"
                ? "America"
                : "Asia"
            }`,
          }
        )
      );

      if (BLOCKED_COUNTRIES.includes(userCountry)) {
        newLogs.push(
          createLog("error", "🚫", "Accès géographique refusé", "Geolocation", {
            details: `Contenu non disponible en ${userCountry}`,
            action: "REDIRECT",
            newRoute: "/geo-restricted",
            statusCode: 451,
          })
        );
        finalRoute = "/geo-restricted";
        redirected = true;
        statusCode = 451;
      } else {
        newLogs.push(
          createLog(
            "success",
            "✅",
            "Accès géographique autorisé",
            "Geolocation",
            { action: "CONTINUE" }
          )
        );
      }
    }

    // 4. ROUTES PUBLIQUES
    if (!blocked && !redirected && PUBLIC_ROUTES.includes(selectedRoute)) {
      newLogs.push(
        createLog(
          "success",
          "🌐",
          "Route publique: Accès autorisé",
          "Public Routes",
          {
            details: "Aucune authentification requise",
            action: "CONTINUE",
          }
        )
      );
    }

    // 5. ROUTES D'AUTHENTIFICATION
    if (!blocked && !redirected && AUTH_ROUTES.includes(selectedRoute)) {
      if (isAuthenticated) {
        newLogs.push(
          createLog("info", "↪️", "Utilisateur déjà connecté", "Auth Routes", {
            details: "Redirection vers dashboard pour meilleure UX",
            action: "REDIRECT",
            originalRoute: selectedRoute,
            newRoute: "/dashboard",
            statusCode: 307,
          })
        );
        finalRoute = "/dashboard";
        redirected = true;
        statusCode = 307;
      } else {
        newLogs.push(
          createLog(
            "success",
            "🔓",
            "Accès aux pages d'authentification",
            "Auth Routes",
            { action: "CONTINUE" }
          )
        );
      }
    }

    // 6. ROUTES PROTÉGÉES
    if (
      !blocked &&
      !redirected &&
      PROTECTED_ROUTES.some((r) => selectedRoute.startsWith(r))
    ) {
      if (!isAuthenticated) {
        newLogs.push(
          createLog(
            "error",
            "🔒",
            "Authentification requise",
            "Protected Routes",
            {
              details: `Redirection vers /login?redirect=${selectedRoute}`,
              action: "REDIRECT",
              originalRoute: selectedRoute,
              newRoute: `/login?redirect=${selectedRoute}`,
              statusCode: 401,
            }
          )
        );
        finalRoute = `/login?redirect=${selectedRoute}`;
        redirected = true;
        statusCode = 401;
      } else {
        newLogs.push(
          createLog(
            "success",
            "✅",
            "Utilisateur authentifié",
            "Protected Routes",
            {
              details: `Role: ${userRole} | Token valide`,
              action: "CONTINUE",
            }
          )
        );
      }
    }

    // 7. ROUTES ADMIN
    if (
      !blocked &&
      !redirected &&
      ADMIN_ROUTES.some((r) => selectedRoute.startsWith(r))
    ) {
      if (!isAuthenticated) {
        newLogs.push(
          createLog(
            "error",
            "🔒",
            "Authentification admin requise",
            "Admin Routes",
            {
              details: "Redirection vers /login",
              action: "REDIRECT",
              newRoute: "/login",
              statusCode: 401,
            }
          )
        );
        finalRoute = "/login";
        redirected = true;
        statusCode = 401;
      } else if (userRole !== "admin") {
        newLogs.push(
          createLog("error", "⛔", "Privilèges insuffisants", "Admin Routes", {
            details: `Role actuel: ${userRole} | Requis: admin`,
            action: "REDIRECT",
            newRoute: "/403-forbidden",
            statusCode: 403,
          })
        );
        finalRoute = "/403-forbidden";
        redirected = true;
        statusCode = 403;
      } else {
        newLogs.push(
          createLog(
            "success",
            "👑",
            "Accès administrateur validé",
            "Admin Routes",
            {
              details: "Privilèges admin confirmés",
              action: "CONTINUE",
            }
          )
        );
      }
    }

    // 8. SECURITY HEADERS
    if (!blocked) {
      newLogs.push(
        createLog(
          "success",
          "🔐",
          "Headers de sécurité ajoutés",
          "Security Headers",
          {
            details: "X-Frame-Options, CSP, X-Content-Type-Options, HSTS",
            action: "ADD_HEADERS",
          }
        )
      );
    }

    // Log final
    if (!blocked) {
      const endTime = performance.now();
      const execTime = Math.round(endTime - startTime);
      setExecutionTime(execTime);

      newLogs.push(
        createLog(
          redirected ? "warning" : "success",
          redirected ? "↪️" : "✨",
          redirected
            ? `Redirection: ${finalRoute}`
            : `Page chargée: ${finalRoute}`,
          "Response",
          {
            details: `Status: ${statusCode} | Temps: ${execTime}ms`,
            statusCode,
            final: true,
          }
        )
      );
    }

    setLogs(newLogs);
  }, [
    selectedRoute,
    isAuthenticated,
    userRole,
    userCountry,
    requestCount,
    maintenanceMode,
    createLog,
  ]);

  // Actions
  const resetDemo = useCallback(() => {
    setRequestCount(0);
    setLogs([]);
    setExecutionTime(0);
  }, []);

  const clearLogs = useCallback(() => {
    setLogs([]);
    setExecutionTime(0);
  }, []);

  const exportLogs = useCallback(() => {
    const logText = logs
      .map(
        (log) =>
          `[${log.timestamp}] [${log.middleware}] ${log.icon} ${log.message}${
            log.details ? `\n  → ${log.details}` : ""
          }`
      )
      .join("\n\n");

    const blob = new Blob([logText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `middleware-logs-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [logs]);

  const quickSetup = useCallback(
    (preset: "anonymous" | "user" | "admin") => {
      switch (preset) {
        case "anonymous":
          setIsAuthenticated(false);
          setUserRole("guest");
          break;
        case "user":
          setIsAuthenticated(true);
          setUserRole("user");
          break;
        case "admin":
          setIsAuthenticated(true);
          setUserRole("admin");
          break;
      }
      clearLogs();
    },
    [clearLogs]
  );

  // Styles dynamiques
  const getRouteColor = (type: RouteType) => {
    const colors = {
      public: "bg-green-500/20 border-green-500",
      auth: "bg-blue-500/20 border-blue-500",
      protected: "bg-yellow-500/20 border-yellow-500",
      admin: "bg-red-500/20 border-red-500",
      geo: "bg-purple-500/20 border-purple-500",
    };
    return colors[type] || "bg-white/5";
  };

  const getLogColor = (type: LogType) => {
    const colors = {
      error: "bg-red-500/20 border-red-500",
      warning: "bg-yellow-500/20 border-yellow-500",
      success: "bg-green-500/20 border-green-500",
      info: "bg-blue-500/20 border-blue-500",
    };
    return colors[type];
  };

  // Statistiques calculées
  const stats = useMemo(
    () => ({
      totalLogs: logs.length,
      errors: logs.filter((l) => l.type === "error").length,
      warnings: logs.filter((l) => l.type === "warning").length,
      successes: logs.filter((l) => l.type === "success").length,
      rateLimitPercent: (requestCount / RATE_LIMIT) * 100,
    }),
    [logs, requestCount]
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-indigo-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 flex items-center justify-center gap-3">
            <Shield className="w-10 h-10 md:w-12 md:h-12 text-indigo-400" />
            Middleware Next.js
          </h1>
          <p className="text-indigo-200 text-lg">
            Système complet d&apos;authentification, autorisation et sécurité
          </p>
        </div>

        {/* Quick Setup */}
        <div className="mb-6 flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => quickSetup("anonymous")}
            className="px-5 py-2.5 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-all hover:scale-105 font-medium"
          >
            👤 Visiteur Anonyme
          </button>
          <button
            onClick={() => quickSetup("user")}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all hover:scale-105 font-medium"
          >
            👨 Utilisateur Connecté
          </button>
          <button
            onClick={() => quickSetup("admin")}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all hover:scale-105 font-medium"
          >
            👑 Administrateur
          </button>
        </div>

        {/* Légende */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {[
            { color: "green", label: "Public", desc: "Accès libre" },
            { color: "blue", label: "Auth", desc: "Login/Register" },
            { color: "yellow", label: "Protected", desc: "Auth requise" },
            { color: "red", label: "Admin", desc: "Rôle admin" },
            { color: "purple", label: "Geo", desc: "Restrictions" },
          ].map(({ color, label, desc }) => (
            <div
              key={label}
              className={`bg-${color}-500/20 border-2 border-${color}-500 rounded-lg p-3 text-center`}
            >
              <div className="text-white font-bold text-sm">{label}</div>
              <div className={`text-xs text-${color}-200`}>{desc}</div>
            </div>
          ))}
        </div>

        {/* Statistiques */}
        {logs.length > 0 && (
          <Card className="mb-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-white">
                  {stats.totalLogs}
                </div>
                <div className="text-sm text-indigo-300">Total Logs</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">
                  {stats.successes}
                </div>
                <div className="text-sm text-indigo-300">Succès</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-400">
                  {stats.warnings}
                </div>
                <div className="text-sm text-indigo-300">Warnings</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-400">
                  {stats.errors}
                </div>
                <div className="text-sm text-indigo-300">Erreurs</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-indigo-400">
                  {executionTime}ms
                </div>
                <div className="text-sm text-indigo-300">Temps Exec</div>
              </div>
            </div>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuration */}
          <Card>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Configuration
            </h2>

            <div className="space-y-4">
              {/* Authentification */}
              <div
                className={`p-4 rounded-lg border-2 transition-all ${
                  isAuthenticated
                    ? "bg-green-500/20 border-green-500"
                    : "bg-red-500/20 border-red-500"
                }`}
              >
                <label className="flex items-center justify-between cursor-pointer">
                  <StatusBadge isActive={isAuthenticated} />
                  <input
                    type="checkbox"
                    checked={isAuthenticated}
                    onChange={(e) => setIsAuthenticated(e.target.checked)}
                    className="w-5 h-5 cursor-pointer"
                  />
                </label>
              </div>

              {/* Rôle */}
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <label className="text-white font-medium block mb-2">
                  Rôle Utilisateur
                </label>
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value as UserRole)}
                  className="w-full bg-white/10 text-white px-3 py-2 rounded-lg border border-white/20 cursor-pointer"
                >
                  <option value="guest">👤 Guest (Invité)</option>
                  <option value="user">👨 User (Utilisateur)</option>
                  <option value="admin">👑 Admin (Administrateur)</option>
                </select>
              </div>

              {/* Pays */}
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <label className="text-white font-medium block mb-2">
                  🌍 Pays
                </label>
                <select
                  value={userCountry}
                  onChange={(e) => setUserCountry(e.target.value)}
                  className="w-full bg-white/10 text-white px-3 py-2 rounded-lg border border-white/20 cursor-pointer"
                >
                  <option value="FR">🇫🇷 France</option>
                  <option value="US">🇺🇸 États-Unis</option>
                  <option value="CN">🇨🇳 Chine (Bloquée)</option>
                  <option value="KP">🇰🇵 Corée du Nord (Bloquée)</option>
                  <option value="GB">🇬🇧 Royaume-Uni</option>
                </select>
              </div>

              {/* Maintenance */}
              <div
                className={`p-4 rounded-lg border-2 transition-all ${
                  maintenanceMode
                    ? "bg-yellow-500/20 border-yellow-500"
                    : "bg-white/5 border-white/10"
                }`}
              >
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-white font-medium flex items-center gap-2">
                    🚧 Mode Maintenance
                    {maintenanceMode && userRole === "admin" && (
                      <span className="text-xs bg-red-500/30 px-2 py-1 rounded">
                        Bypass Admin
                      </span>
                    )}
                  </span>
                  <input
                    type="checkbox"
                    checked={maintenanceMode}
                    onChange={(e) => setMaintenanceMode(e.target.checked)}
                    className="w-5 h-5 cursor-pointer"
                  />
                </label>
              </div>

              {/* Rate Limit */}
              <div
                className={`p-4 rounded-lg border-2 transition-all ${
                  requestCount >= RATE_LIMIT
                    ? "bg-red-500/20 border-red-500"
                    : "bg-white/5 border-white/10"
                }`}
              >
                <div className="text-white font-medium mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Rate Limit
                </div>
                <div className="text-2xl font-bold text-indigo-300 mb-2">
                  {requestCount} / {RATE_LIMIT}
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      requestCount >= RATE_LIMIT
                        ? "bg-red-500"
                        : "bg-indigo-500"
                    }`}
                    style={{ width: `${stats.rateLimitPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Routes */}
          <Card>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Sélection de Route
            </h2>

            <div className="space-y-2 mb-4 max-h-[420px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-white/5">
              {ROUTES.map((route) => {
                const Icon = route.icon;
                return (
                  <button
                    key={route.path}
                    onClick={() => setSelectedRoute(route.path)}
                    className={`w-full text-left px-3 py-3 rounded-lg transition-all flex items-center gap-3 border-l-4 ${
                      selectedRoute === route.path
                        ? "bg-indigo-500 text-white shadow-lg scale-105"
                        : `${getRouteColor(
                            route.type
                          )} text-indigo-100 hover:scale-102`
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">
                        {route.label}
                      </div>
                      <div className="text-xs opacity-70 truncate">
                        {route.path}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <Button
              onClick={simulateMiddleware}
              disabled={requestCount >= RATE_LIMIT}
              variant="primary"
              className="mb-3"
            >
              🚀 Envoyer Requête
            </Button>

            <Button onClick={resetDemo} variant="secondary" icon={RefreshCw}>
              Réinitialiser
            </Button>
          </Card>

          {/* Logs */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Logs Middleware
              </h2>
              {logs.length > 0 && (
                <div className="flex gap-2">
                  <button
                    onClick={exportLogs}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
                    title="Exporter les logs"
                  >
                    <Download className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={clearLogs}
                    className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-all"
                    title="Effacer les logs"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
              {logs.length === 0 ? (
                <div className="text-center text-indigo-300 py-12">
                  <AlertTriangle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Sélectionnez une route et envoyez une requête</p>
                </div>
              ) : (
                logs.map((log, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border-l-4 text-sm ${
                      log.type === "error"
                        ? "bg-red-500/20 border-red-500"
                        : log.type === "warning"
                        ? "bg-yellow-500/20 border-yellow-500"
                        : log.type === "success"
                        ? "bg-green-500/20 border-green-500"
                        : "bg-blue-500/20 border-blue-500"
                    }`}
                  >
                    <div className="text-white font-medium flex items-center gap-2">
                      <span>{log.icon}</span>
                      {log.message}
                    </div>
                    {log.details && (
                      <div className="text-xs text-indigo-200 mt-1 opacity-80">
                        {log.details}
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      {log.middleware && (
                        <span className="text-xs bg-white/10 px-2 py-1 rounded">
                          {log.middleware}
                        </span>
                      )}
                      {log.action && (
                        <span
                          className={`text-xs px-2 py-1 rounded font-mono ${
                            log.action === "BLOCK"
                              ? "bg-red-500/30"
                              : log.action === "REDIRECT"
                              ? "bg-yellow-500/30"
                              : "bg-green-500/30"
                          }`}
                        >
                          {log.action}
                        </span>
                      )}
                    </div>
                    {log.timestamp && (
                      <div className="text-xs text-indigo-300 mt-1 opacity-60">
                        {log.timestamp}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdvancedMiddlewareDemo;
