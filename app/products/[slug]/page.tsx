import { notFound } from "next/navigation";
import { products, getProduct, relatedProducts } from "@/lib/products";
import ProductDetail from "@/components/ProductDetail";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  return {
    title: product ? `${product.name} — Sobako` : "Sobako",
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();
  const related = relatedProducts(params.slug, 8);
  return <ProductDetail product={product} related={related} />;
}
