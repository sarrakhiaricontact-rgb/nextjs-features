import { NextResponse } from "next/server";

// Simuler un délai de base de données
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Ingénieure Senior",
    company: "TechCorp",
    content:
      "Le PPR a transformé les performances de notre page d'accueil. Le chargement initial est instantané et le contenu dynamique arrive progressivement. Nos scores Lighthouse sont passés de 75 à 98 !",
    avatar: "SC",
  },
  {
    name: "Marcus Johnson",
    role: "CTO",
    company: "StartupXYZ",
    content:
      "L'expérience développeur est incroyable. Nous bénéficions de performances statiques tout en ayant du contenu dynamique frais. Fini de choisir entre rapidité et données en temps réel.",
    avatar: "MJ",
  },
  {
    name: "Emily Rodriguez",
    role: "Responsable Frontend",
    company: "DevStudio",
    content:
      "Les React Server Components avec PPR sont une véritable révolution. Nos utilisateurs voient le contenu immédiatement pendant que nous récupérons les données fraîches en arrière-plan. Le meilleur des deux mondes !",
    avatar: "ER",
  },
];

export async function GET() {
  // Simuler un délai réseau pour démontrer le streaming
  await delay(1500);

  return NextResponse.json(testimonials, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
