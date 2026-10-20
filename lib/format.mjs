export function numeric(value) {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  const latin = String(value ?? "")
    .replace(/[০-৯]/g, (c) => String("০১২৩৪৫৬৭৮৯".indexOf(c)))
    .replace(/[^0-9.+-]/g, "");
  const n = Number(latin);
  return Number.isFinite(n) ? n : 0;
}
export const bn = (n, digits = 0) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(numeric(n));
export const unit = (u) =>
  ({
    kg: "কেজি",
    litre: "লিটার",
    liter: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
    pcs: "পিস",
  })[u] || u;
export const money = (n) => `${bn(n)} টাকা`;
export function sortProducts(products, order) {
  return [...products].sort((a, b) =>
    order === "asc"
      ? numeric(a.today) - numeric(b.today)
      : order === "desc"
        ? numeric(b.today) - numeric(a.today)
        : 0,
  );
}
export function movers(products, direction) {
  return products
    .filter((p) => p.change.dir === direction)
    .sort(
      (a, b) =>
        Math.abs(numeric(b.change.pct)) - Math.abs(numeric(a.change.pct)),
    )
    .slice(0, 6);
}
export function marketStats(markets) {
  if (!markets.length) return null;
  return {
    min: Math.min(...markets.map((m) => numeric(m.min))),
    max: Math.max(...markets.map((m) => numeric(m.max))),
    average:
      markets.reduce((s, m) => s + (numeric(m.min) + numeric(m.max)) / 2, 0) /
      markets.length,
  };
}
