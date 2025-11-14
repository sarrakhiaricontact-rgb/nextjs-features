import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const faqs = [
  {
    question: "Qu'est-ce que le Pré-rendu Partiel (PPR) ?",
    answer:
      "Le PPR est une fonctionnalité de Next.js 14+ qui combine rendu statique et dynamique dans une seule route. La coquille statique est pré-rendue au moment du build, tandis que les sections dynamiques sont diffusées à la demande grâce à React Suspense.",
  },
  {
    question: "En quoi le PPR diffère-t-il du SSR traditionnel ?",
    answer:
      "Le SSR traditionnel rend toute la page à la demande. Le PPR pré-rend la coquille statique au moment du build (chargement instantané) et ne récupère que le contenu dynamique au moment de la requête. Cela offre de meilleures performances et une expérience utilisateur supérieure.",
  },
  {
    question: "Quelles sections sont statiques dans cette démo ?",
    answer:
      "La barre de navigation, le héros, les fonctionnalités, les tarifs, la FAQ et le pied de page font tous partie de la coquille statique et sont pré-rendus lors du build. Ils se chargent instantanément sans requêtes au serveur.",
  },
  {
    question: "Quelles sections sont dynamiques ?",
    answer:
      "Les sections Témoignages et Statistiques sont récupérées dynamiquement à la demande. Elles sont enveloppées dans des limites React Suspense et sont diffusées progressivement avec des états de chargement skeleton.",
  },
  {
    question: "Quels sont les avantages du PPR ?",
    answer:
      "Le PPR offre des chargements initiaux instantanés, du contenu dynamique frais, un meilleur SEO, une amélioration progressive, une réduction de la charge serveur et de meilleurs scores Core Web Vitals.",
  },
  {
    question: "Comment activer le PPR dans mon application Next.js ?",
    answer:
      "Ajoutez 'experimental: { ppr: \"incremental\" }' dans votre next.config.js et définissez 'export const experimental_ppr = true' dans vos composants de page. Enveloppez les sections dynamiques dans des limites Suspense.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl mb-4">
            Foire aux Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Tout ce que vous devez savoir sur le Pré-rendu Partiel.
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
