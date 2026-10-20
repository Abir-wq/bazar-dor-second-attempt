"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Emoji from "@/components/emoji";
export default function CategoryNav({ categories }) {
  const pathname = usePathname();
  return (
    <nav className="category-nav" aria-label="পণ্যের বিভাগ">
      <div className="container nav-links">
        {categories.map((c) => (
          <Link
            href={`/category/${c.slug}`}
            key={c.slug}
            aria-current={
              pathname === `/category/${c.slug}` ? "page" : undefined
            }
            className={`category-chip ${pathname === `/category/${c.slug}` ? "active" : ""}`}
          >
            <span>
              <Emoji symbol={c.icon} />
            </span>
            {c.nameBn}
          </Link>
        ))}
      </div>
    </nav>
  );
}
