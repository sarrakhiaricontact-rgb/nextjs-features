# Fiche Technique : Route Handlers Next.js App Router

## 📁 Structure de base

```
app/
├── api/
│   ├── users/
│   │   └── route.ts           # /api/users
│   ├── posts/
│   │   ├── route.ts           # /api/posts
│   │   └── [id]/
│   │       └── route.ts       # /api/posts/123
│   └── search/
│       └── route.ts           # /api/search
```

---

## 🔧 Handlers HTTP disponibles

```typescript
export async function GET(request: Request) {}
export async function POST(request: Request) {}
export async function PUT(request: Request) {}
export async function PATCH(request: Request) {}
export async function DELETE(request: Request) {}
export async function HEAD(request: Request) {}
export async function OPTIONS(request: Request) {}
```

### Usage typique

- **GET** : Récupérer des données
- **POST** : Créer une ressource
- **PUT** : Remplacement complet
- **PATCH** : Modification partielle
- **DELETE** : Suppression
- **OPTIONS** : CORS preflight

---

## 📥 Accéder aux données de la requête

### 1. Corps de la requête (Body)

```typescript
// JSON
const body = await request.json();

// FormData
const formData = await request.formData();
const file = formData.get("file");

// Texte brut
const text = await request.text();

// ArrayBuffer
const buffer = await request.arrayBuffer();
```

### 2. Paramètres d'URL (Query params)

```typescript
// /api/search?q=nextjs&limit=10
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q"); // "nextjs"
  const limit = searchParams.get("limit"); // "10"

  return NextResponse.json({ query, limit });
}
```

### 3. Paramètres dynamiques (Route params)

```typescript
// app/api/posts/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const postId = params.id; // "123" depuis /api/posts/123
  return NextResponse.json({ postId });
}
```

### 4. Headers

```typescript
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const userAgent = request.headers.get("user-agent");

  return NextResponse.json({ authHeader });
}
```

### 5. Cookies

```typescript
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  return NextResponse.json({ token: token?.value });
}
```

---

## 📤 Retourner des réponses

### 1. Réponse JSON

```typescript
return NextResponse.json({ data: "value" });

// Avec status code
return NextResponse.json({ error: "Not found" }, { status: 404 });

// Avec headers
return NextResponse.json(
  { data: "value" },
  {
    status: 200,
    headers: {
      "X-Custom-Header": "value",
      "Cache-Control": "public, s-maxage=3600",
    },
  }
);
```

### 2. Autres types de réponses

```typescript
// Texte simple
return new Response('Hello World', { status: 200 });

// Redirection
return NextResponse.redirect(new URL('/login', request.url));

// Fichier PDF
return new Response(pdfBuffer, {
  headers: {
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'attachment; filename="document.pdf"'
  }
});

// Streaming
const stream = new ReadableStream({...});
return new Response(stream);
```

### 3. Définir des cookies

```typescript
const response = NextResponse.json({ success: true });
response.cookies.set("token", "abc123", {
  httpOnly: true,
  secure: true,
  maxAge: 3600,
  path: "/",
});
return response;
```

---

## 💾 Configuration du cache

### Options de cache principales

```typescript
// 1. Comportement dynamique/statique
export const dynamic = "auto"; // Défaut
export const dynamic = "force-dynamic"; // Jamais de cache
export const dynamic = "force-static"; // Force le cache
export const dynamic = "error"; // Erreur si pas statique

// 2. Revalidation (ISR)
export const revalidate = 60; // Revalide après 60 secondes
export const revalidate = false; // Pas de revalidation
export const revalidate = 0; // Pas de cache

// 3. Durée d'exécution
export const runtime = "nodejs"; // Défaut
export const runtime = "edge"; // Edge Runtime

// 4. Taille maximale du body
export const maxDuration = 5; // Secondes (défaut: 5)
```

### Cache avec fetch()

```typescript
// Cache indéfini
fetch(url, { cache: "force-cache" });

// Pas de cache
fetch(url, { cache: "no-store" });

// Revalidation après 3600s
fetch(url, { next: { revalidate: 3600 } });

// Avec tags pour revalidation
fetch(url, { next: { tags: ["posts", "products"] } });
```

### Headers de cache personnalisés

```typescript
return NextResponse.json(data, {
  headers: {
    "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
  },
});
```

**Directives courantes :**

- `public` : Cache CDN autorisé
- `private` : Cache navigateur uniquement
- `no-store` : Aucun cache
- `no-cache` : Revalide avant utilisation
- `max-age=3600` : Cache navigateur (1h)
- `s-maxage=3600` : Cache CDN (1h)
- `stale-while-revalidate=86400` : Sert du contenu périmé pendant la revalidation

---

## 🔄 Revalidation manuelle

### revalidatePath

```typescript
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  await createPost(data);

  // Invalide une route spécifique
  revalidatePath("/api/posts");

  // Invalide une page
  revalidatePath("/blog");

  // Invalide avec layout
  revalidatePath("/blog", "layout");

  return NextResponse.json({ success: true });
}
```

### revalidateTag

```typescript
import { revalidateTag } from "next/cache";

export async function POST(request: Request) {
  await createProduct(data);

  // Invalide tous les caches avec ce tag
  revalidateTag("products");

  return NextResponse.json({ success: true });
}
```

---

## 🛡️ Gestion des erreurs

```typescript
export async function GET(request: Request) {
  try {
    const data = await fetchData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
```

### Erreurs spécifiques

```typescript
// 400 Bad Request
if (!isValid) {
  return NextResponse.json({ error: "Invalid input" }, { status: 400 });
}

// 401 Unauthorized
if (!isAuthenticated) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

// 403 Forbidden
if (!hasPermission) {
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

// 404 Not Found
if (!resource) {
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}
```

---

## 🔐 Middleware et authentification

```typescript
import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export async function GET(request: Request) {
  // Vérifier le token
  const token = request.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET!);
    // Suite du traitement...
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }
}
```

---

## 🌐 CORS

```typescript
export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function GET(request: Request) {
  const response = NextResponse.json({ data: "value" });

  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  return response;
}
```

---

## 📊 Cas d'usage courants

### 1. API REST classique

```typescript
// app/api/posts/route.ts
export async function GET() {
  const posts = await db.post.findMany();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const body = await request.json();
  const post = await db.post.create({ data: body });
  return NextResponse.json(post, { status: 201 });
}

// app/api/posts/[id]/route.ts
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const post = await db.post.findUnique({ where: { id: params.id } });
  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(post);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const post = await db.post.update({
    where: { id: params.id },
    data: body,
  });
  return NextResponse.json(post);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await db.post.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
```

### 2. Proxy vers API externe

```typescript
// app/api/weather/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");

  const response = await fetch(
    `https://api.weather.com/data?city=${city}&key=${process.env.WEATHER_API_KEY}`,
    { next: { revalidate: 300 } } // Cache 5 minutes
  );

  const data = await response.json();
  return NextResponse.json(data);
}
```

### 3. Upload de fichiers

```typescript
// app/api/upload/route.ts
export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  // Sauvegarder le fichier
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Upload vers S3, Cloudinary, etc.
  const url = await uploadToStorage(buffer, file.name);

  return NextResponse.json({ url });
}
```

### 4. Webhook

```typescript
// app/api/webhooks/stripe/route.ts
import { headers } from "next/headers";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get("stripe-signature");

  // Vérifier la signature
  const event = stripe.webhooks.constructEvent(
    body,
    signature!,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  // Traiter l'événement
  switch (event.type) {
    case "payment_intent.succeeded":
      // Logique de paiement réussi
      break;
    // Autres cas...
  }

  return new Response("OK", { status: 200 });
}
```

### 5. Authentification

```typescript
// app/api/auth/login/route.ts
export async function POST(request: Request) {
  const { email, password } = await request.json();

  const user = await db.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);

  const response = NextResponse.json({ success: true });
  response.cookies.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 jours
  });

  return response;
}
```

---

## ⚡ Stratégies de cache recommandées

| Type de données | Configuration               | Exemple               |
| --------------- | --------------------------- | --------------------- |
| Statiques       | `dynamic = 'force-static'`  | Configuration, pays   |
| Semi-statiques  | `revalidate = 3600`         | Articles, produits    |
| Temps réel      | `dynamic = 'force-dynamic'` | Prix live, stocks     |
| API externe     | `fetch` avec `revalidate`   | Météo, taux de change |
| Après mutation  | `revalidatePath/Tag`        | Après POST/PUT/DELETE |

---

## 🚀 Edge Runtime vs Node.js

```typescript
// Edge Runtime (plus rapide, limitations)
export const runtime = "edge";

// Node.js (défaut, toutes les fonctionnalités)
export const runtime = "nodejs";
```

**Edge Runtime :**

- ✅ Latence ultra-faible
- ✅ Déployé globalement
- ❌ API Node.js limitées
- ❌ Pas d'accès au système de fichiers

**Node.js Runtime :**

- ✅ API Node.js complètes
- ✅ Librairies natives
- ❌ Latence plus élevée

---

## 📝 Bonnes pratiques

1. **Toujours gérer les erreurs** avec try-catch
2. **Valider les entrées** avant traitement
3. **Utiliser TypeScript** pour le typage
4. **Cacher intelligemment** selon le type de données
5. **Sécuriser les clés API** dans `.env.local`
6. **Définir des timeouts** pour éviter les blocages
7. **Logger les erreurs** pour le debugging
8. **Implémenter la pagination** pour grandes datasets
9. **Utiliser des status codes HTTP appropriés**
10. **Documenter vos routes** (commentaires ou OpenAPI)

---

## 🔗 Ressources

- [Documentation officielle Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Caching Documentation](https://nextjs.org/docs/app/building-your-application/caching)
- [Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
