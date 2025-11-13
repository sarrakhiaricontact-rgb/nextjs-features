# 🧭 Mécanisme de Router Cache dans Next.js

Ce document explique le fonctionnement du **Router Cache** dans **Next.js**, un mécanisme clé permettant d’accélérer la navigation côté client grâce à la mise en cache des pages et segments déjà rendus.

---

## 🚀 Qu’est-ce que le Router Cache ?

Le **Router Cache** (ou **App Router Cache**) est une couche de cache intégrée au **client** (navigateur) et au **serveur** dans Next.js.  
Il stocke temporairement les pages, les données et les composants déjà visités afin d’accélérer les navigations suivantes **sans recharger entièrement la page**.

---

## ⚙️ Fonctionnement général

Lorsqu’un utilisateur navigue dans une application Next.js (via `next/link` ou `useRouter()`), le framework ne recharge pas la page complète.  
À la place, il :

1. **Vérifie le Router Cache** pour voir si la page demandée existe déjà en mémoire.
2. Si elle est trouvée (**Cache HIT**) → le contenu est rendu instantanément.
3. Si elle est absente (**Cache MISS**) → une requête est envoyée au serveur.
4. Les données et composants reçus sont **enregistrés dans le cache** pour de futures visites (**SET**).

---

## 🧱 Structure du Router Cache

Le cache du routeur gère différents types d’éléments :

| Élément                       | Description                              | Exemples                          |
| ----------------------------- | ---------------------------------------- | --------------------------------- |
| **Segments**                  | Portions du layout ou route imbriquée    | `/products`, `/products/[id]`     |
| **Données**                   | Résultats de `fetch()` liés à la route   | Liste des produits, détails, etc. |
| **Arbre du composant (tree)** | Structure React du rendu serveur         | Layouts, pages, slots             |
| **Streaming payloads**        | Flux partiels pour SSR ou React Suspense | Données asynchrones               |
| **Prefetch entries**          | Données préchargées via `next/link`      | Préchargement silencieux          |

---

## 🔄 Cycle de vie d’une navigation

1. **Navigation initiale** :

   - Le serveur rend la page (`SSR` ou `SSG`).
   - Le client enregistre le résultat dans le **Router Cache**.

2. **Navigation suivante** :

   - Lors d’un clic sur un lien (`<Link href="/next-page">`), Next.js consulte le cache.
   - Si les données et composants sont présents → **rendu instantané** (HIT).
   - Sinon → requête vers le serveur pour récupérer les nouveaux segments (**MISS**).

3. **Mise à jour du cache** :
   - Les nouvelles pages et données sont ajoutées au cache.
   - Si des données changent côté serveur, une **révalidation** peut être déclenchée.

---

## ⚙️ Exemple de préchargement automatique

Next.js précharge automatiquement les pages liées à l’écran lorsque l’utilisateur survole ou voit un lien dans le viewport :

```jsx
import Link from "next/link";

export default function NavBar() {
  return (
    <nav>
      <Link href="/about">À propos</Link>
      <Link href="/products" prefetch={true}>
        Produits
      </Link>
    </nav>
  );
}
```

- L’option `prefetch={true}` indique à Next.js de charger les segments de route et données avant même que l’utilisateur clique.
- Ces données sont stockées dans le **Router Cache client**, permettant un affichage instantané.

---

## 🔁 Types de mise en cache du Router

| Type de cache                | Portée               | Description                                                            |
| ---------------------------- | -------------------- | ---------------------------------------------------------------------- |
| **In-memory cache (client)** | Navigateur           | Stocke temporairement les pages visitées et les préchargements         |
| **Server router cache**      | Serveur (App Router) | Conserve les états de rendu pour accélérer SSR et transitions          |
| **Prefetch cache**           | Client               | Contient les routes préchargées via `next/link` ou `router.prefetch()` |

---

## ⏱️ Durée de vie et invalidation

- Le cache du routeur est **temporaire** — il s’efface lorsque :

  - L’utilisateur recharge la page,
  - Les données côté serveur changent (révalidation ISR/SSR),
  - La mémoire du navigateur est nettoyée.

- Next.js décide automatiquement **quand invalider** un cache, selon :
  - Le TTL (time-to-live) interne,
  - Les modifications de données côté serveur,
  - Les paramètres de `fetch()` et de `revalidate`.

---

## 🧠 Exemple complet

```jsx
"use client";
import { useRouter } from "next/navigation";

export default function Example() {
  const router = useRouter();

  const handleNavigation = () => {
    router.prefetch("/dashboard"); // Précharge les données
    router.push("/dashboard"); // Navigation instantanée
  };

  return <button onClick={handleNavigation}>Aller au tableau de bord</button>;
}
```

Dans cet exemple :

- `prefetch()` enregistre la page dans le Router Cache avant la navigation.
- `push()` utilise le cache déjà présent pour afficher le contenu immédiatement.

---

## 🌍 Avantages du Router Cache

- ⚡ Navigation ultra rapide sans rechargement complet.
- 🔁 Réutilisation intelligente des données déjà rendues.
- 📦 Réduction du trafic réseau et des appels API.
- 🧩 Meilleure intégration avec **React Suspense** et **Streaming SSR**.
- 🚫 Aucune configuration manuelle requise : tout est géré par Next.js.

---

## 🧾 En résumé

| Concept        | Description                                        |
| -------------- | -------------------------------------------------- |
| **Cache HIT**  | Données déjà disponibles → affichage instantané    |
| **Cache MISS** | Données absentes → requête serveur                 |
| **SET**        | Enregistrement des nouvelles données dans le cache |
| **Prefetch**   | Chargement anticipé des routes                     |
| **Invalidate** | Nettoyage du cache expiré ou mis à jour            |

---

✨ **Conclusion :**  
Le **Router Cache** de Next.js est une innovation clé du **App Router**, qui transforme la navigation en une expérience fluide et réactive.  
Il combine un cache **client** et un cache **serveur** pour offrir une vitesse et une fluidité comparables à celles des applications SPA modernes, tout en conservant la puissance du rendu serveur (SSR).
