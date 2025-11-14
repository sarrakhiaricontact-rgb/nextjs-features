interface Stat {
  label: string;
  value: string;
}

// Simuler un appel API avec délai
async function getStats(): Promise<Stat[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/stats`,
    {
      cache: "no-store", // Assurer des données fraîches à chaque requête
    }
  );

  if (!res.ok) {
    throw new Error("Échec lors de la récupération des statistiques");
  }

  return res.json();
}

export default async function Stats() {
  // Cela sera récupéré à la demande grâce à cache: "no-store"
  const stats = await getStats();

  return (
    <section className="bg-primary text-primary-foreground py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 rounded-full bg-primary-foreground/10 px-4 py-1.5 text-sm font-medium">
            🔄 Statistiques en Temps Réel
          </div>
          <h2 className="text-2xl font-bold md:text-3xl">
            Fiable et utilisé par des développeurs dans le monde entier
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-primary-foreground/80">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 text-sm text-primary-foreground/60">
          Mis à jour en temps réel • Dernière mise à jour :{" "}
          {new Date().toLocaleTimeString()}
        </div>
      </div>
    </section>
  );
}
