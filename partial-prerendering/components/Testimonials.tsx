import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

// Simuler un appel API avec délai
async function getTestimonials(): Promise<Testimonial[]> {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
    }/api/testimonials`,
    {
      cache: "no-store", // Assurer des données fraîches à chaque requête
    }
  );

  if (!res.ok) {
    throw new Error("Échec lors de la récupération des témoignages");
  }

  return res.json();
}

export default async function Testimonials() {
  // Ceci sera récupéré à chaque requête grâce à cache: "no-store"
  const testimonials = await getTestimonials();

  return (
    <section id="testimonials" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="inline-block mb-4 rounded-full bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-600">
            🔄 Diffusion Dynamique
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl mb-4">
            Ce que disent les développeurs
          </h2>
          <p className="text-lg text-muted-foreground">
            Cette section est récupérée à la demande et diffusée de manière
            progressive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="transition-all hover:shadow-md">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-linear-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-semibold text-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} chez {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">
                  &quot;{testimonial.content}&quot;
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
