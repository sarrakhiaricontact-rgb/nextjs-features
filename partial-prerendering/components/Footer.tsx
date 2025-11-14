export default function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Démo PPR. Construit avec Next.js 16.0.3 App Router.
          </p>
          <p className="text-sm text-muted-foreground mt-4 md:mt-0">
            Présentation du Pré-rendu Partiel avec les React Server Components
          </p>
        </div>
      </div>
    </footer>
  );
}
