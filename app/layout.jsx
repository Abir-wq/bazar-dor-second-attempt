import "@fontsource/hind-siliguri/400.css";
import "@fontsource/hind-siliguri/500.css";
import "@fontsource/hind-siliguri/600.css";
import "@fontsource/hind-siliguri/700.css";
import "./globals.css";
import { Suspense } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Ticker from "@/components/ticker";
import { Providers, RouteNotice } from "@/components/providers";
import { getCategories, getProducts } from "@/lib/api";
export const metadata = { title: { default: "বাজার দর | আজকের বাজারের দাম", template: "%s | বাজার দর" }, description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের দাম, বাজারভিত্তিক তুলনা এবং দামের পরিবর্তন এক জায়গায়।", icons: { icon: "/logo-icon.png" } };
export const dynamic = "force-dynamic";
async function Navigation() {
 // A market-data outage must never block authentication or the rest of the shell.
 const [cats,products] = await Promise.allSettled([getCategories(),getProducts()]);
 return <><Header categories={cats.status === "fulfilled" ? cats.value : []}/>{products.status === "fulfilled" && <Ticker products={products.value}/>}</>;
}
export default function RootLayout({ children }) { return <html lang="bn" data-theme="bazaar"><body><Providers><a className="skip-link" href="#main">মূল বিষয়ে যান</a><Suspense fallback={<div className="shell-loading skeleton"/>}><Navigation/></Suspense><Suspense fallback={null}><RouteNotice/></Suspense><main id="main">{children}</main><Footer/></Providers></body></html>; }
