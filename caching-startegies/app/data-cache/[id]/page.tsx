import { getData } from "@/utils/api-helper";
import { revalidateTag } from "next/cache";

// Typage des produits
interface Product {
  id: number | string;
  title: string;
  price?: number; // optionnel si certains produits n'ont pas de prix
}

// Typage des paramètres de la page
interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  // Récupération de tous les produits avec Data Cache
  const products: Product[] = await getData(
    "http://localhost:8000/products",
    "Dynamic Page",
    { cache: "force-cache", next: { tags: ["products"] } }
  );

  // Filtrage des autres produits
  const otherProducts = products.filter((p) => p.id.toString() !== id);

  // Récupération du produit courant
  const product: Product = await getData(
    `http://localhost:8000/products/${id}`,
    "Dynamic Page"
  );

  // Action serveur pour revalider le tag
  async function onRevalidateTagAction(): Promise<void> {
    "use server";
    const tag = "products";
    console.log(`Attempting to revalidate tag: '${tag}'`);
    revalidateTag(tag, "max");
    console.log(`Revalidate tag action ('${tag}') called.`);
  }

  return (
    <div>
      <h1 className="font-bold text-4xl">Data Cache - Dynamic page</h1>
      <div className="mt-6">
        This page is dynamically rendered in{" "}
        <span className="text-blue-400">run time but uses Data Cache</span>.
      </div>

      <div className="mt-10 flex flex-col sm:flex-row rounded gap-6 border-zinc-800 bg-zinc-900 w-96 h-40 items-center justify-center font-bold text-2xl p-4">
        <h1>{product.title}</h1>
        {product.price !== undefined && <p>Price: {product.price}</p>}
      </div>

      <div className="flex flex-col gap-10 mt-6 border rounded border-zinc-900 p-10">
        <h2 className="font-bold text-xl">Other products</h2>
        <div className="flex gap-6 flex-wrap">
          {otherProducts.map((product) => (
            <div
              key={product.id}
              className="flex rounded gap-6 border-zinc-800 bg-zinc-900 w-96 h-40 items-center justify-center font-bold text-2xl"
            >
              {product.title}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-6 justify-end mt-10 border rounded border-zinc-900 p-10">
        <form action={onRevalidateTagAction}>
          <button
            type="submit"
            className="border border-zinc-800 p-3 rounded cursor-pointer hover:bg-zinc-900"
          >
            Revalidate
          </button>
        </form>
      </div>
    </div>
  );
}
