import { getData } from "../utils/api-helper";
import { Product } from "../types";
import { JSX } from "react";

export default async function ProductCount(): Promise<JSX.Element> {
  // Appel d’API (dédupliqué automatiquement)
  const products = await getData<Product[]>(
    "http://localhost:8000/products",
    "ProductCount Component"
  );

  const productCount = products?.length ?? 0;

  return <div>🗳️ {productCount} products</div>;
}
