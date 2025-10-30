# 🚀 Next.js Route Handlers Demo

Application complète démontrant toutes les méthodes HTTP avec Next.js App Router et JSONPlaceholder API.

## 📋 Fonctionnalités

Cette application démontre l'utilisation de **toutes les méthodes HTTP** :

- ✅ **GET** - Récupérer des données (avec filtres)
- ✅ **POST** - Créer de nouvelles ressources
- ✅ **PUT** - Remplacer complètement une ressource
- ✅ **PATCH** - Modifier partiellement une ressource
- ✅ **DELETE** - Supprimer des ressources
- ✅ **HEAD** - Obtenir les métadonnées sans body
- ✅ **OPTIONS** - Découvrir les méthodes disponibles

## 🛠️ Installation

### Prérequis

- Node.js 18+ installé
- npm ou yarn

### Étapes d'installation

```bash
# 1. Créer le projet Next.js
npx create-next-app@latest route_handler_demo --typescript --tailwind

# 2. Aller dans le dossier
cd route_handler_demo

# 3. Créer la structure des dossiers
mkdir -p src/app/api/posts/[id]
mkdir -p src/app/api/users/[id]
mkdir -p src/app/api/comments
mkdir -p src/app/posts/[id]
mkdir -p src/app/posts/new
mkdir -p src/app/users/[id]
mkdir -p src/app/comments
mkdir -p src/components
mkdir -p src/lib

# 4. Copier tous les fichiers fournis dans leurs dossiers respectifs

# 5. Installer les dépendances (si nécessaire)
npm install

# 6. Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

## 📁 Structure du projet

```
src/
├── app/
│   ├── layout.tsx              # Layout principal avec navbar
│   ├── page.tsx                # Page d'accueil
│   ├── globals.css             # Styles globaux
│   │
│   ├── posts/
│   │   ├── page.tsx            # Liste des posts (GET, HEAD, OPTIONS)
│   │   ├── new/
│   │   │   └── page.tsx        # Créer un post (POST)
│   │   └── [id]/
│   │       └── page.tsx        # Détails post (PUT, PATCH, DELETE)
│   │
│   ├── users/
│   │   ├── page.tsx            # Liste des utilisateurs (GET)
│   │   └── [id]/
│   │       └── page.tsx        # Détails utilisateur (GET)
│   │
│   ├── comments/
│   │   └── page.tsx            # Liste des commentaires (GET)
│   │
│   ├── api/
│       ├── posts/
│       │   ├── route.ts        # GET, POST, HEAD, OPTIONS
│       │   └── [id]/
│       │       └── route.ts    # GET, PUT, PATCH, DELETE
│       ├── users/
│       │   ├── route.ts        # GET
│       │   └── [id]/
│       │       └── route.ts    # GET
│       └── comments/
│           └── route.ts        # GET
│
├── components/
│       └── Navbar.tsx           # Navigation
│
├── lib/
│   └── types.ts                 # Types TypeScript
│
└── README.md
```

## 🎯 Comment tester chaque méthode

### GET - Récupérer des données

1. Allez sur `/posts`
2. Utilisez les filtres (User ID, Limite)
3. Cliquez sur "GET - Rechercher"

**Avec query params :**

- `/api/posts?userId=1` - Posts de l'utilisateur 1
- `/api/posts?limit=5` - Limiter à 5 posts

### POST - Créer

1. Allez sur `/posts/new`
2. Remplissez le formulaire
3. Cliquez sur "POST - Créer le post"

**Note :** JSONPlaceholder simule la création mais ne stocke pas réellement les données.

### PUT - Remplacer complètement

1. Allez sur un post individuel (cliquez sur un post)
2. Cliquez sur "Modifier le post"
3. Modifiez TOUS les champs
4. Cliquez sur "PUT - Remplacer tout"

**Important :** PUT nécessite TOUS les champs (title, body, userId)

### PATCH - Modifier partiellement

1. Sur la page d'édition d'un post
2. Modifiez UN seul champ (titre ou contenu)
3. Cliquez sur "PATCH titre" ou "PATCH contenu"

**Avantage :** PATCH ne nécessite que les champs à modifier

### DELETE - Supprimer

1. Sur la liste des posts
2. Cliquez sur "DELETE" sur n'importe quel post
3. Confirmez la suppression

### HEAD - Métadonnées

1. Sur `/posts`
2. Cliquez sur le bouton "HEAD"
3. Une alerte affichera les métadonnées (nombre total, version API)

**Utilité :** Vérifier l'existence sans télécharger le contenu

### OPTIONS - Méthodes disponibles

1. Sur `/posts`
2. Cliquez sur le bouton "OPTIONS"
3. Une alerte affichera les méthodes HTTP autorisées

**Utilité :** CORS preflight, découverte d'API

## 🔍 Points clés à comprendre

### GET vs HEAD

- **GET** : Retourne les headers + le body
- **HEAD** : Retourne UNIQUEMENT les headers (pas de body)

### PUT vs PATCH

- **PUT** : Remplace TOUTE la ressource (tous les champs requis)
- **PATCH** : Modifie SEULEMENT les champs fournis

### Idempotence

- **Idempotent** (GET, PUT, DELETE, HEAD) : Même résultat si appelé plusieurs fois
- **Non-idempotent** (POST) : Crée une nouvelle ressource à chaque appel

## 🌐 API JSONPlaceholder

Cette démo utilise [JSONPlaceholder](https://jsonplaceholder.typicode.com/), une API REST factice gratuite.

**Endpoints utilisés :**

- `/posts` - 100 posts
- `/users` - 10 utilisateurs
- `/comments` - 500 commentaires

**Important :** JSONPlaceholder simule les opérations POST, PUT, PATCH, DELETE mais ne persiste pas les données réellement.

**Bon apprentissage ! 🚀**
