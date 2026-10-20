import test from "node:test";
import assert from "node:assert/strict";
import {
  numeric,
  bn,
  sortProducts,
  movers,
  marketStats,
} from "../lib/format.mjs";
test("Bengali prices are parsed and sorted numerically without mutating API order", () => {
  assert.equal(numeric("১,৮৫০ টাকা"), 1850);
  assert.equal(numeric("-২.৯%"), -2.9);
  const products = [{ today: "৯৯" }, { today: "১,৮৫০" }, { today: "৩০" }];
  assert.deepEqual(
    sortProducts(products, "asc").map((p) => numeric(p.today)),
    [30, 99, 1850],
  );
  assert.deepEqual(
    sortProducts(products, "desc").map((p) => numeric(p.today)),
    [1850, 99, 30],
  );
  assert.equal(products[0].today, "৯৯");
  assert.equal(bn(148), "১৪৮");
});
test("risers and fallers choose largest magnitude changes and exclude flat products", () => {
  const products = Array.from({ length: 9 }, (_, i) => ({
    id: i,
    change: { dir: "down", pct: -i },
  }));
  products.push({ id: 20, change: { dir: "flat", pct: 0 } });
  assert.deepEqual(
    movers(products, "down").map((p) => p.id),
    [8, 7, 6, 5, 4, 3],
  );
  assert.equal(movers(products, "up").length, 0);
});
test("summary uses extrema and mean market midpoint, with empty guard", () => {
  assert.deepEqual(
    marketStats([
      { min: 10, max: 20 },
      { min: 20, max: 50 },
    ]),
    { min: 10, max: 50, average: 25 },
  );
  assert.equal(marketStats([]), null);
});
