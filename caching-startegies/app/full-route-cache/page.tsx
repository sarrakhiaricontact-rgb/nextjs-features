import { getData } from "@/utils/api-helper";
import Link from "next/link";

// export const dynamic = "force-dynamic";
// export const revalidate = 0;

// Typage des produits
interface Product {
  id: number | string;
  title: string;
}

export default async function Page() {
  // thoses make page dynamic cause it work on server side
  // const cookieData = cookies();

  // const headersData = headers();

  // const products = await getData(
  //     "http://localhost:8000/products",
  //     "Static Page",
  //     { cache: "no-store" }
  // );

  // const products = await getData(
  //     "http://localhost:8000/products",
  //     "Static Page",
  //     { next: { revalidate: 0 } }
  // );

  // Récupération des produits depuis l'API
  const products: Product[] = await getData(
    "http://localhost:8000/products",
    "Static Page"
  );

  return (
    <div>
      <h1 className="font-bold text-4xl">Full Route Cache - Static page</h1>
      <div className="mt-6">
        This page is statically rendered in{" "}
        <span className="text-blue-400">build time</span>.
      </div>

      <div className="flex flex-col gap-10 mt-10 border rounded border-zinc-900 p-10">
        <div className="flex gap-6 flex-wrap">
          {products.map((product) => (
            <Link
              key={product.id}
              className="flex rounded gap-6 border-zinc-800 bg-zinc-900 w-96 h-40 items-center justify-center font-bold text-2xl"
              href={`/data-cache/${product.id}`}
            >
              {product.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
