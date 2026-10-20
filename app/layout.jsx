import "@fontsource/hind-siliguri/400.css";
import "@fontsource/hind-siliguri/500.css";
import "@fontsource/hind-siliguri/600.css";
import "@fontsource/hind-siliguri/700.css";
import "./globals.css";
import { Suspense } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CategoryNav from "@/components/category-nav";
import Ticker from "@/components/ticker";
import { Providers, RouteNotice } from "@/components/providers";
import { getCategories, getProducts } from "@/lib/api";
export const metadata = {
  title: { default: "বাজার দর | আজকের বাজারের দাম", template: "%s | বাজার দর" },
  description:
    "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের দাম, বাজারভিত্তিক তুলনা এবং দামের পরিবর্তন এক জায়গায়।",
  icons: { icon: "/logo-icon.png" },
};
export const dynamic = "force-dynamic";
async function Categories() {
  const categories = await getCategories().catch(() => null);
  if (!categories)
    return (
      <div className="container nav-unavailable" role="status">
        বিভাগের তথ্য এখন পাওয়া যাচ্ছে না।
      </div>
    );
  return <CategoryNav categories={categories} />;
}
async function MarketTicker() {
  const products = await getProducts().catch(() => null);
  return products ? <Ticker products={products} /> : null;
}
export default function RootLayout({ children }) {
  return (
    <html lang="bn" data-theme="bazaar" data-scroll-behavior="smooth">
      <body>
        <Providers>
          <a className="skip-link" href="#main">
            মূল বিষয়ে যান
          </a>
          <Header
            date={new Intl.DateTimeFormat("bn-BD", {
              dateStyle: "full",
              timeZone: "Asia/Dhaka",
            }).format(new Date())}
          />
          <Suspense
            fallback={
              <div
                className="category-nav-loading skeleton"
                aria-label="বিভাগ লোড হচ্ছে"
              />
            }
          >
            <Categories />
          </Suspense>
          <Suspense
            fallback={
              <div
                className="ticker-loading skeleton"
                aria-label="দামের তথ্য লোড হচ্ছে"
              />
            }
          >
            <MarketTicker />
          </Suspense>
          <Suspense fallback={null}>
            <RouteNotice />
          </Suspense>
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
