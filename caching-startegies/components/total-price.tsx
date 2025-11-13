import { getData } from "../utils/api-helper";
import { Product } from "../types";
import { JSX } from "react";

export default async function TotalPrice(): Promise<JSX.Element> {
  // Appel d’API (dédupliqué grâce à la Request Memoization de Next.js)
  const products = await getData<Product[]>(
    "http://localhost:8000/products",
    "TotalPrice Component"
  );

  // Calcul du prix total
  const totalPrice = products.reduce(
    (total, product) => total + product.price,
    0
  );

  return (
    <div>
      <span role="img" aria-label="money-bag">
        💰
      </span>
      Total Price: ${totalPrice}
    </div>
  );
}
