# 📸 Galerie de Photos avec Next.js - Routes Parallèles et Interception

Un exemple pratique d'utilisation des **Parallel Routes** et **Intercepting Routes** de Next.js 14+ pour créer une galerie de photos moderne avec modale.

## 🎯 Fonctionnalités

- ✨ Affichage en grille de photos
- 🖼️ Ouverture des photos en modale (interception de route)
- 🔗 URLs partageables pour chaque photo
- ⚡ Navigation rapide avec préchargement
- 📱 Design responsive

## 🏗️ Structure du Projet

```
app/
├── layout.tsx
├── page.tsx
├── @modal/
│   ├── (..)photos/
│   │   └── [id]/
│   │       └── page.tsx
│   └── default.tsx
└── photos/
    └── [id]/
        └── page.tsx
```

## 📁 Explication de la Structure

### Routes Parallèles (`@modal`)

Le dossier `@modal` est un **slot parallèle** qui permet de rendre du contenu en parallèle avec la page principale.

```tsx
// app/layout.tsx
export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html>
      <body>
        {children}
        {modal}
      </body>
    </html>
  );
}
```

### Routes d'Interception (`(..)photos`)

La notation `(..)` intercepte la route `/photos/[id]` quand on navigue **depuis la page d'accueil**.

**Convention des segments :**

- `(.)` : même niveau
- `(..)` : un niveau au-dessus
- `(..)(..)` : deux niveaux au-dessus
- `(...)` : depuis la racine

## 💻 Composants

### 1. Page d'accueil (app/page.tsx)

### 2. Modale interceptée (app/@modal/(..)photos/[id]/page.tsx)

### 3. Page photo complète (app/photos/[id]/page.tsx)

### 4. Composant Modal (components/Modal.tsx)

### 5. Fichier default.tsx (app/@modal/default.tsx)

```tsx
export default function Default() {
  return null;
}
```

> **Important :** Ce fichier est nécessaire pour que Next.js sache quoi rendre quand le slot `@modal` n'est pas actif.

## 🚀 Comment ça fonctionne ?

### Scénario 1 : Navigation depuis la galerie

1. Utilisateur sur `/` (page d'accueil)
2. Clique sur une photo
3. Next.js intercepte et affiche `@modal/(..)photos/[id]`
4. La modale s'ouvre **par-dessus** la galerie
5. L'URL devient `/photos/1` (mais c'est la modale qui s'affiche)

### Scénario 2 : Accès direct via URL

1. Utilisateur visite directement `/photos/1`
2. Pas d'interception (pas de navigation client)
3. Affiche la page complète `photos/[id]/page.tsx`

### Scénario 3 : Actualisation de la page

1. Utilisateur sur la modale `/photos/1`
2. Appuie sur F5
3. La modale disparaît, page complète s'affiche
