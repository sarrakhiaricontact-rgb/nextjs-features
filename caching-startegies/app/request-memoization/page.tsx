import { JSX } from "react";
import ProductCount from "../../components/product-count";
import TotalPrice from "../../components/total-price";
import { getData } from "../../utils/api-helper";
import { Product } from "@/types";

// Typage explicite de la fonction de métadonnées
export async function generateMetadata(): Promise<{
  title: string;
  description: string;
}> {
  const data: Product[] = await getData(
    "http://localhost:8000/products",
    "generateMetadata()"
  );

  return {
    title: data.reduce(
      (title, product) => title + (title && ", ") + product?.title,
      ""
    ),
    description: "Apple iPhone 16 products",
  };
}

// Typage explicite du composant de page
export default async function Page(): Promise<JSX.Element> {
  // Appel de l’API pour récupérer les produits
  const products: Product[] = await getData(
    "http://localhost:8000/products",
    "Page"
  );

  return (
    <div>
      <h1 className="font-bold text-4xl">Request Memoization</h1>
      <div className="mt-6">
        This page is statically rendered in{" "}
        <span className="text-blue-400">build time</span>. 3 components below do
        the same fetch call and deduced. Thanks to Request Memoization.
      </div>
      <div className="flex flex-row mb-6">
        <ProductCount />
        {" -- "}
        <TotalPrice />
      </div>

      <div className="flex items-center justify-center bg-zinc-950 ">
        <div className="flex flex-col border  border-zinc-800 p-10 max-w-4xl w-full gap-10 shadow-lg ">
          <div className="flex gap-6 justify-center flex-wrap ">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-center w-60 h-32 bg-zinc-900 rounded text-white font-semibold text-lg"
              >
                {product.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
