export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-background to-muted py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            ✨ Next.js v16.0.3 Pré-rendu Partiel
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Contenu Statique Ultra-Rapide{" "}
            <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Contenu Dynamique
            </span>
          </h1>

          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            Découvrez la combinaison parfaite entre pré-rendu statique et
            diffusion dynamique. Conçu avec Next.js App Router, les React Server
            Components et l’amélioration progressive.
          </p>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>
    </section>
  );
}
