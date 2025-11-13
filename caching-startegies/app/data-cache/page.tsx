import { getData } from "@/utils/api-helper";
import { revalidatePath, revalidateTag } from "next/cache";
import Link from "next/link";

// Définition du type Product
interface Product {
  id: number | string;
  title: string;
}

export default async function Page() {
  // Récupération des produits depuis l'API
  const products: Product[] = await getData(
    "http://localhost:8000/products",
    "Static Page",
    {
      next: {
        tags: ["products"],
      },
    }
  );

  // Action serveur pour revalider un chemin précis
  async function onRevalidatePathAction(): Promise<void> {
    "use server";
    const path = "/data-cache";
    console.log(`Attempting to revalidate path: ${path}`);
    revalidatePath(path);
    console.log(`Revalidate path: ${path} action called`);
  }

  // Action serveur pour revalider un tag
  async function onRevalidateTagAction(): Promise<void> {
    "use server";
    const tag = "products";
    console.log(`Attempting to revalidate tag: '${tag}'`);
    revalidateTag(tag, "max");
    console.log(`Revalidate tag action ('${tag}') called.`);
  }

  return (
    <div>
      <h1 className="font-bold text-4xl">Data Cache - Static page</h1>
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

      <div className="flex gap-6 justify-end mt-10 border rounded border-zinc-900 p-10">
        <Link
          href="/data-cache/opt-out"
          className="border border-zinc-800 p-3 rounded hover:bg-zinc-900"
        >
          Opt-out demo
        </Link>
        <Link
          href="/data-cache/time-based-revalidation"
          className="border border-zinc-800 p-3 rounded hover:bg-zinc-900"
        >
          Time-based revalidation demo
        </Link>

        <form action={onRevalidatePathAction}>
          <button
            type="submit"
            className="border border-zinc-800 p-3 rounded cursor-pointer hover:bg-zinc-900"
          >
            Revalidate path
          </button>
        </form>

        <form action={onRevalidateTagAction}>
          <button
            type="submit"
            className="border border-zinc-800 p-3 rounded cursor-pointer hover:bg-zinc-900"
          >
            Revalidate tag
          </button>
        </form>
      </div>
    </div>
  );
}
