import { NextResponse } from "next/server";

// Simuler un délai de base de données
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Générer des statistiques dynamiques basées sur l'heure actuelle
function generateStats() {
  const baseUsers = 50000;
  const baseProjects = 12000;
  const baseCountries = 120;
  const baseUptime = 99.9;

  // Ajouter une variation en fonction du temps pour simuler des mises à jour en temps réel
  const timeVariation = Math.floor(Date.now() / 10000);

  return [
    {
      label: "Utilisateurs Actifs",
      value: `${(baseUsers + (timeVariation % 1000)).toLocaleString()}+`,
    },
    {
      label: "Projets Créés",
      value: `${(baseProjects + (timeVariation % 100)).toLocaleString()}+`,
    },
    {
      label: "Pays",
      value: `${baseCountries + (timeVariation % 10)}`,
    },
    {
      label: "Disponibilité",
      value: `${baseUptime}%`,
    },
  ];
}

export async function GET() {
  // Simuler un délai réseau pour démontrer le streaming
  await delay(2000);

  const stats = generateStats();

  return NextResponse.json(stats, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
