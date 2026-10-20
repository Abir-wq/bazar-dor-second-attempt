import "server-only";
import { cache } from "react";
const bases = [process.env.BAZAR_API_URL, "https://openapi.programming-hero.com/api/bazardor", "https://api.api-store.workers.dev/api/bazardor", "https://api.abcz.workers.dev/api/bazardor"].filter(Boolean);
export async function fetchAPI(path) {
 for (const base of [...new Set(bases)]) {
  try {
   const res = await fetch(`${base.replace(/\/$/, "")}${path}`, { cache: "no-store", signal: AbortSignal.timeout(7000) });
   if (!res.ok) throw new Error(`HTTP ${res.status}`);
   const json = await res.json(); const data = json.data ?? json;
   if (!Array.isArray(data)) throw new Error("Unexpected API response");
   return data;
  } catch (error) { console.warn("Bazar API retry:", error.message); }
 }
 throw new Error("বাজারের তথ্য লোড করা যায়নি। কিছুক্ষণ পর আবার চেষ্টা করুন।");
}
export const getProducts = cache(() => fetchAPI("/products"));
export const getCategories = cache(() => fetchAPI("/categories"));
export const getCategoryProducts = cache(slug => fetchAPI(`/products?category=${encodeURIComponent(slug)}`));
export async function getProduct(slug) {
 // API single-product URLs use numeric IDs; the website uses human-readable slugs.
 const products = await getProducts(); return products.find(p => p.slug === slug) ?? null;
}
