import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    title: "Chargement de Pages Instantané",
    description:
      "Un Contenu statique pré-rendue au moment du build garantit un chargement initial instantané avec des scores Lighthouse parfaits.",
    icon: "⚡",
  },
  {
    title: "Streaming Progressif",
    description:
      "Le contenu dynamique est diffusé progressivement grâce à React Suspense, offrant une expérience de chargement fluide.",
    icon: "🔄",
  },
  {
    title: "Optimisé pour le SEO",
    description:
      "Le contenu statique est entièrement indexé par les moteurs de recherche tandis que les sections dynamiques améliorent l’expérience utilisateur.",
    icon: "🔍",
  },
  {
    title: "Type-Safe",
    description:
      "Construit avec TypeScript et les React Server Components pour une sécurité de typage maximale et une excellente expérience développeur.",
    icon: "🛡️",
  },
  {
    title: "Données en Temps Réel",
    description:
      "Récupérez des données fraîches à la demande sans sacrifier les performances du pré-rendu statique.",
    icon: "📊",
  },
  {
    title: "Prêt pour la Production",
    description:
      "Une architecture éprouvée avec Shadcn UI, Tailwind CSS et les meilleures pratiques de Next.js.",
    icon: "✅",
  },
];

export default function FeatureSection() {
  return (
    <section id="features" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl mb-4">
            Pourquoi le Pré-rendu Partiel ?
          </h2>
          <p className="text-lg text-muted-foreground">
            Profitez du meilleur des deux mondes : la performance du statique
            avec la fraîcheur du contenu dynamique.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <CardHeader>
                <div className="mb-2 text-4xl">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
