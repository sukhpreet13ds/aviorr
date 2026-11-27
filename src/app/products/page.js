import ProductDetailView from "@/components/ProductDetailView";
import { PRODUCTS_CATALOG } from "@/data/products";

export default function ProductsIndexPage() {
  return <ProductDetailView product={PRODUCTS_CATALOG[0]} />;
}
