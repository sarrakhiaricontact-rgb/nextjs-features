import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const plans = [
  {
    name: "Starter",
    price: "0 $",
    description: "Parfait pour les projets personnels et l'expérimentation",
    features: [
      "Pré-rendu statique",
      "Streaming basique",
      "Support communautaire",
      "Jusqu'à 10K visiteurs/mois",
      "Templates Next.js",
    ],
    cta: "Commencer",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "29 $",
    description:
      "Pour les professionnels créant des applications en production",
    features: [
      "Tout ce qui est inclus dans Starter",
      "Fonctionnalités PPR avancées",
      "Support prioritaire",
      "Visiteurs illimités",
      "Composants personnalisés",
      "Tableau de bord analytique",
    ],
    cta: "Essai gratuit",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Personnalisé",
    description: "Pour les équipes ayant besoin d’un contrôle avancé",
    features: [
      "Tout ce qui est inclus dans Pro",
      "Support dédié",
      "SLA personnalisé",
      "Déploiement sur site",
      "Sécurité avancée",
      "Formation & consulting",
    ],
    cta: "Contacter le service commercial",
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-32 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl mb-4">
            Tarifs Simples et Transparents
          </h2>
          <p className="text-lg text-muted-foreground">
            Choisissez l’offre qui correspond à vos besoins. Tous les plans
            incluent les fonctionnalités essentielles du PPR.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`flex flex-col ${
                plan.highlighted ? "border-primary shadow-lg scale-105" : ""
              }`}
            >
              <CardHeader>
                {plan.highlighted && (
                  <div className="mb-2 inline-block self-start rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Le plus populaire
                  </div>
                )}
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="flex-1">
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "Personnalisé" && (
                    <span className="text-muted-foreground">/mois</span>
                  )}
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <svg
                        className="h-5 w-5 text-primary mt-0.5 shrink-0"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <button
                  className={`w-full py-2.5 rounded-md font-medium transition-colors ${
                    plan.highlighted
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {plan.cta}
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
