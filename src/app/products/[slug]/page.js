import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProductDetailView from "@/components/ProductDetailView";
import { PRODUCTS_CATALOG } from "@/data/products";

export function generateStaticParams() {
  return PRODUCTS_CATALOG.map((product) => ({
    slug: product.slug,
  }));
}

async function ProductDetails({ params }) {
  const { slug } = await params;
  const product = PRODUCTS_CATALOG.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}

export default function ProductSlugPage({ params }) {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#fff" }} />}>
      <ProductDetails params={params} />
    </Suspense>
  );
}
