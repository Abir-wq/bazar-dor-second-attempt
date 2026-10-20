import { notFound } from "next/navigation";
import { getCategories, getCategoryProducts } from "@/lib/api";
import Catalog from "@/components/catalog";
export async function generateMetadata({ params }) { const {slug}=await params; return {title: `বিভাগ: ${slug}`}; }
export default async function CategoryPage({ params }) {
 const {slug}=await params; const categories=await getCategories(); const category=categories.find(c=>c.slug === slug);
 if(!category) notFound();
 const products=await getCategoryProducts(slug); if(!products.length) notFound();
 return <div className="container category-page"><p className="eyebrow">আপনার পছন্দের বিভাগ</p><Catalog products={products} title={`${category.icon} ${category.nameBn}`} subtitle={`${category.nameBn} বিভাগের আজকের দাম ও পরিবর্তন।`}/></div>;
}
