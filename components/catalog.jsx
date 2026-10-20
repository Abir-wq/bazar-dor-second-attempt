"use client";
import Emoji from "@/components/emoji";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ProductGrid } from "./products";
import { bn, sortProducts } from "@/lib/format.mjs";
export default function Catalog({
  products,
  categories = [],
  title = "সব পণ্য",
  subtitle = "নিত্যপ্রয়োজনীয় সব পণ্যের দাম জানুন, সচেতনভাবে বাজার করুন।",
}) {
  const [sort, setSort] = useState("default"),
    [category, setCategory] = useState("all"),
    [search, setSearch] = useState("");
  const filtered = useMemo(
    () =>
      sortProducts(
        products.filter(
          (p) =>
            (category === "all" || p.category === category) &&
            `${p.nameBn} ${p.slug}`
              .toLowerCase()
              .includes(search.trim().toLowerCase()),
        ),
        sort,
      ),
    [products, category, search, sort],
  );
  return (
    <section id="সব-পণ্য" className="catalog section">
      <div className="section-top">
        <div>
          <h2>{title}</h2>
          <p className="muted">{subtitle}</p>
        </div>
        <label className="sort-label">
          সাজান:{" "}
          <select
            className="select select-bordered"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>
      <div className="catalog-tools">
        <label className="search-input">
          <span className="sr-only">পণ্য খুঁজুন</span>
          <input
            className="input input-bordered"
            placeholder="পণ্যের নাম দিয়ে খুঁজুন…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <span className="muted" aria-live="polite">
          {bn(filtered.length)}টি পণ্য
        </span>
      </div>
      {categories.length > 0 && (
        <div className="filter-chips">
          <button
            onClick={() => setCategory("all")}
            className={`filter-chip ${category === "all" ? "active" : ""}`}
            aria-pressed={category === "all"}
          >
            সব
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setCategory(c.slug)}
              className={`filter-chip ${category === c.slug ? "active" : ""}`}
              aria-pressed={category === c.slug}
            >
              <Emoji symbol={c.icon} /> {c.nameBn}
            </button>
          ))}
        </div>
      )}
      {filtered.length ? (
        <ProductGrid products={filtered} />
      ) : (
        <div className="empty-state">
          <span>
            <Emoji symbol="🧺" />
          </span>
          <h3>কোনো পণ্য পাওয়া যায়নি</h3>
          <p>অন্য নাম বা বিভাগ দিয়ে খুঁজুন।</p>
          <Link className="btn btn-primary" href="/">
            হোম পেজে ফিরে যান
          </Link>
        </div>
      )}
    </section>
  );
}
