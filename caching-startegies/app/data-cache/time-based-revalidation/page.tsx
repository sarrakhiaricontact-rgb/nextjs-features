import { getData } from "@/utils/api-helper";

// Durée de revalidation en secondes
const REVALIDATE_SECONDS = 10;

// Définition du type Product
interface Product {
  id: number | string;
  title: string;
}

export default async function Page() {
  // Récupération des produits depuis l'API avec ISR
  const products: Product[] = await getData(
    "http://localhost:8000/products",
    "time-based-revalidation page",
    {
      next: {
        revalidate: REVALIDATE_SECONDS,
      },
    }
  );

  return (
    <div>
      <h1 className="font-bold text-4xl">
        Data Cache - time-based revalidation demo
      </h1>
      <div className="mt-6">
        This page is statically rendered in{" "}
        <span className="text-blue-400">
          build time but supports time-based revalidation (ISR)
        </span>
        .
      </div>

      <div className="flex flex-col gap-10 mt-10 border rounded border-zinc-900 p-10">
        <div className="flex gap-6 flex-wrap">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex rounded gap-6 border-zinc-800 bg-zinc-900 w-96 h-40 items-center justify-center font-bold text-2xl"
            >
              {product.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
