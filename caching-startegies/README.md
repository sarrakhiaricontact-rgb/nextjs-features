# Next.js Caching Strategies

Ce document explique les différentes stratégies de mise en cache disponibles dans **Next.js** et comment les utiliser efficacement pour optimiser les performances.

---

## 🧭 Vue d'ensemble

Next.js propose **quatre stratégies principales de mise en cache** pour améliorer la rapidité et la stabilité de vos applications :

1. **Request Memoization (Mémoïsation des requêtes)**
2. **Data Cache (Cache de données)**
3. **Full Route Cache (Cache de route complète)**
4. **Router Cache (Cache du routeur)**

---

## 1. ⚡ Request Memoization (Mémoïsation des requêtes)

### 🔍 Qu'est-ce que c'est ?

Mémorise les requêtes identiques au cours d'un seul cycle de rendu côté serveur.

### 🌍 Où cela fonctionne-t-il ?

- **Côté serveur uniquement**
- En mémoire durant le rendu

### 🎯 Pourquoi l'utiliser ?

- **Déduplique les requêtes** pour éviter plusieurs appels identiques
- **Réduit le props drilling**
- **Optimisation automatique** des appels redondants

### ⏳ Durée de vie

- **Court terme** — valable uniquement pendant un rendu serveur

### 🔁 Rafraîchissement

- **Automatique** à chaque nouveau rendu

### ❌ Annulation

- Seules les requêtes **GET** sont mémoïsées
- Les autres méthodes HTTP ne le sont pas

### 💡 Exemple

```javascript
// Ces deux appels ne feront qu'une seule requête réseau
async function getUser() {
  const res = await fetch("https://api.example.com/user");
  return res.json();
}

// Composant 1
const user = await getUser();

// Composant 2 (même requête, même rendu)
const user = await getUser(); // Utilise le cache mémoire
```

---

## 2. 🗄️ Data Cache (Cache de données)

### 🔍 Qu'est-ce que c'est ?

Stocke les résultats de \`fetch()\` côté serveur de manière **persistante**.

### 🗂️ Où est stocké le cache ?

- Dans un **stockage serveur (local, edge ou custom)**
- Persiste entre les requêtes et déploiements

### 🎯 Pourquoi l'utiliser ?

- Réduit les appels réseau
- Améliore les performances
- Diminue les coûts liés aux API

### ⏳ Durée de vie

- **Persistant** — survit aux redémarrages et déploiements

### 🔁 Rafraîchissement

1. **Basé sur le temps** :

```javascript
fetch("https://api.example.com/data", {
  next: { revalidate: 3600 }, // Revalide toutes les heures
});
```

2. **À la demande** :

```javascript
import { revalidatePath, revalidateTag } from "next/cache";

revalidatePath("/blog");
revalidateTag("posts");
```

### ❌ Annulation

```javascript
fetch("https://api.example.com/data", {
  cache: "no-store", // Désactive le cache
});
```

---

## 3. 🧱 Full Route Cache (Cache de route complète)

### 🔍 Qu'est-ce que c'est ?

Stocke les pages HTML et RSC (React Server Components) entières pour une livraison instantanée.

### 🗂️ Où est-il stocké ?

- **Côté serveur**, dans le stockage local ou personnalisé
- Généré pendant le build

### 🎯 Pourquoi l'utiliser ?

- Fournit des pages statiques **ultra rapides**
- Excellent pour le **First Contentful Paint (FCP)**
- Transition fluide grâce à la **hydration**

### ⏳ Durée de vie

- **Persistant** jusqu’à un nouveau déploiement

### 🔁 Rafraîchissement

1. **Revalidation automatique** :

```javascript
export const revalidate = 3600; // Revalide toutes les heures
```

2. **Redeploiement** de l’application

### ❌ Annulation

Rendre la page **dynamique** :

```javascript
export const dynamic = "force-dynamic";

// Ou via des fonctions dynamiques
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = cookies(); // Rend la page dynamique
  // ...
}
```

---

## 4. 🚀 Router Cache (Cache du routeur)

### 🔍 Qu'est-ce que c'est ?

Mémorise les segments de route côté **client** pour accélérer la navigation entre les pages.

### 🗂️ Où est stocké le cache ?

- Dans la **mémoire du navigateur**
- Temporaire, par session utilisateur

### 🎯 Pourquoi l'utiliser ?

- Navigation instantanée grâce au **prefetch**
- Expérience utilisateur fluide
- Moins de requêtes serveur pour les routes déjà visitées

### ⏳ Durée de vie

- **5 minutes** pour les routes dynamiques
- **30 secondes** pour les routes statiques

### 🔁 Rafraîchissement

1. **Depuis le routeur** :

```javascript
import { useRouter } from "next/navigation";
const router = useRouter();
router.refresh();
```

2. **Avec revalidatePath** :

```javascript
import { revalidatePath } from "next/cache";
revalidatePath("/blog/[slug]");
```

3. **Avec cookies** :

```javascript
import { cookies } from "next/headers";
cookies().set("name", "value");
cookies().delete("name");
```

### ❌ Annulation

- Automatique pour les segments exclus
- Configurable via le prefetch des <Link> :

```javascript
<Link href="/blog" prefetch={false}>
  Blog
</Link>
```

---

## 🧩 Tableau récapitulatif

| Stratégie               | Portée          | Durée       | Lieu de stockage  | Cas d'usage principal             |
| ----------------------- | --------------- | ----------- | ----------------- | --------------------------------- |
| **Request Memoization** | Rendu unique    | Court terme | Serveur (mémoire) | Déduplication automatique         |
| **Data Cache**          | Multi-requêtes  | Persistant  | Serveur (storage) | Données API externes              |
| **Full Route Cache**    | Pages complètes | Persistant  | Serveur (storage) | Pages statiques (blog, doc)       |
| **Router Cache**        | Navigation      | Session     | Client (mémoire)  | UX fluide, prefetching des routes |

---

## 🧠 Bonnes pratiques

1. Utilisez **Request Memoization** pour éviter les appels redondants dans un même rendu.
2. Activez **Data Cache** pour les données peu volatiles.
3. Privilégiez **Full Route Cache** pour les pages statiques.
4. Laissez **Router Cache** gérer automatiquement la navigation côté client.
5. Combinez ces stratégies pour obtenir **des performances optimales**.

---

## 📚 Ressources

- [📘 Documentation officielle Next.js](https://nextjs.org/docs/app/building-your-application/caching)
- [⚙️ App Router Caching Guide](https://nextjs.org/docs/app/building-your-application/caching)
