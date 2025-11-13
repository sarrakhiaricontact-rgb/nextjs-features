export interface Product {
  id: number;
  title: string;
  price: number;
  [key: string]: unknown; // pour autoriser d'autres propriétés optionnelles
}
