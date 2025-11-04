# 🌤️ Application Météo PWA

Une Progressive Web App moderne construite avec Next.js proposant des prévisions météorologiques en temps réel.

## ✨ Fonctionnalités

### Application Météo

- 🌍 Données météorologiques en temps réel pour n'importe quelle ville dans le monde
- 📅 Prévisions météo sur 5 jours
- 🌡️ Métriques détaillées (température, humidité, vent, pression, visibilité)
- 🎨 Arrière-plans dynamiques selon les conditions météo et l'heure de la journée
- 🔍 Fonctionnalité de recherche de ville
- 📱 Design responsive pour tous les appareils

### Fonctionnalités PWA

- 📲 Installable sur mobile et ordinateur
- 🎯 Expérience similaire à une application native

## 🚀 Stack Technique

- **Framework:** Next.js 15+ avec Turbopack
- **Langage:** TypeScript/React
- **Styling:** Tailwind CSS
- **Icônes:** Lucide React
- **PWA:** @ducanh2912/next-pwa
- **APIs:** WeatherAPI.com (données météo)

## 🔒 Variables d'Environnement

```bash
# Créer le fichier de variables d'environnement
cp .env.local

# Ajouter vos clés API dans .env.local
NEXT_PUBLIC_WEATHER_API=votre_cle_api_meteo_ici
```

## 🔑 Configuration des Clés API

### API Météo

1. Inscrivez-vous sur [WeatherAPI.com](https://www.weatherapi.com/)
2. Obtenez votre clé API gratuite (1M appels/mois)
3. Ajoutez-la dans `.env.local`

## 📱 Installation PWA

1. Visitez l'application dans Chrome/Edge/Safari
2. Cliquez sur le bouton d'installation dans la barre d'adresse
3. Profitez de l'expérience d'application native !

- Implémentation app météo avec prévisions 5 jours
