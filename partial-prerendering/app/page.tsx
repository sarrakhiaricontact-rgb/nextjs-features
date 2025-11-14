import { Suspense } from "react";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Stats from "@/components/Stats";
import FAQ from "@/components/FAQ";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// Skeleton pour les Témoignages
function TestimonialsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-16">
      <Skeleton className="h-10 w-64 mx-auto mb-4" />
      <Skeleton className="h-6 w-96 mx-auto mb-12" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Skeleton pour les Statistiques
function StatsSkeleton() {
  return (
    <div className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center">
              <Skeleton className="h-12 w-32 mx-auto mb-2 bg-primary-foreground/20" />
              <Skeleton className="h-6 w-24 mx-auto bg-primary-foreground/20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Contenu Statique - Pré-rendue lors du build */}
      <Hero />

      {/* Contenu Dynamique - Diffusé à la demande */}
      <Suspense fallback={<TestimonialsSkeleton />}>
        <Testimonials />
      </Suspense>

      {/* Contenu Statique - Pré-rendue lors du build */}
      <Pricing />
      <FeatureSection />

      {/* Contenu Dynamique - Diffusé à la demande */}
      <Suspense fallback={<StatsSkeleton />}>
        <Stats />
      </Suspense>

      {/* Le Contenu statique continue */}
      <FAQ />
    </>
  );
}
