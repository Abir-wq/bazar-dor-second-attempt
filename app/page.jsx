import Image from "next/image";
import { getProducts, getCategories } from "@/lib/api";
import { movers } from "@/lib/format.mjs";
import { ProductGrid } from "@/components/products";
import Catalog from "@/components/catalog";
export default async function Home() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);
  return (
    <div className="container">
      <section className="hero-banner">
        <div>
          <p className="eyebrow">সচেতন বাজার, স্বস্তির জীবন</p>
          <h1>
            আজকের বাজারের দাম
            <br />
            এক নজরে
          </h1>
          <p className="hero-copy">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a href="#সব-পণ্য" className="btn btn-primary">
            সব পণ্য দেখুন <span aria-hidden="true">↓</span>
          </a>
        </div>
        <Image
          className="hero-art"
          src="/bazar-hero.png"
          alt="সবজি ও নিত্যপ্রয়োজনীয় পণ্যে ভরা বাজারের ব্যাগ"
          width={320}
          height={280}
          priority
        />
      </section>
      <section className="section">
        <div className="section-top">
          <h2>
            <span className="up-text">▲</span> আজ দাম বেড়েছে
          </h2>
          <span className="muted">সর্বোচ্চ বৃদ্ধির ৬টি পণ্য</span>
        </div>
        <ProductGrid products={movers(products, "up")} />
      </section>
      <section className="section">
        <div className="section-top">
          <h2>
            <span className="down-text">▼</span> আজ দাম কমেছে
          </h2>
          <span className="muted">সর্বোচ্চ হ্রাসের ৬টি পণ্য</span>
        </div>
        <ProductGrid products={movers(products, "down")} />
      </section>
      <Catalog products={products} categories={categories} />
    </div>
  );
}
