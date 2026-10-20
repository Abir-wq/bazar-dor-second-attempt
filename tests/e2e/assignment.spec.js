import { test, expect } from "@playwright/test";
import { mkdir } from "node:fs/promises";
const parsePrice = (s) =>
  Number(
    s.replace(/[০-৯]/g, (c) => "০১২৩৪৫৬৭৮৯".indexOf(c)).replace(/[^\d]/g, ""),
  );
test("catalog, category sorting, anchor, invalid URLs and responsive layout", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.locator(".hero-banner")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "সাইন ইন", exact: true }),
  ).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  if (process.env.QA_SCREENSHOT_DIR) {
    await mkdir(process.env.QA_SCREENSHOT_DIR, { recursive: true });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.screenshot({
      path: `${process.env.QA_SCREENSHOT_DIR}/desktop.png`,
      fullPage: true,
    });
    await page.setViewportSize({ width: 375, height: 812 });
    await page.screenshot({
      path: `${process.env.QA_SCREENSHOT_DIR}/mobile.png`,
      fullPage: true,
    });
    await page.setViewportSize({ width: 1440, height: 1000 });
  }

  await expect(
    page.locator(".section").nth(0).locator(".product-card"),
  ).toHaveCount(6);
  await expect(
    page.locator(".section").nth(1).locator(".product-card"),
  ).toHaveCount(6);
  await page.getByRole("link", { name: "সব পণ্য দেখুন" }).click();
  await expect(page).toHaveURL(/#%E0|#সব/);
  await expect(page.locator(".catalog .product-card").first()).toBeVisible();
  await page
    .locator(".catalog .filter-chip")
    .filter({ hasText: "সবজি" })
    .click();
  await expect(page.locator(".catalog .product-card")).toHaveCount(5);
  await page.getByRole("link", { name: "🥬 সবজি", exact: true }).click();
  await expect(page).toHaveURL(/category\/sobji/);
  await expect(
    page.locator('.category-chip[aria-current="page"]'),
  ).toContainText("সবজি");
  for (const order of ["asc", "desc"]) {
    await page.getByRole("combobox").selectOption(order);
    const prices = (
      await page.locator(".product-price strong").allTextContents()
    ).map(parsePrice);
    expect(prices).toEqual(
      [...prices].sort((a, b) => (order === "asc" ? a - b : b - a)),
    );
  }
  for (const size of [
    { width: 1440, height: 900 },
    { width: 768, height: 1024 },
    { width: 375, height: 812 },
    { width: 320, height: 700 },
  ]) {
    await page.setViewportSize(size);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBeTruthy();
  }
  await page.reload();
  await expect(page.locator(".product-card").first()).toBeVisible();
  for (const path of [
    "/category/invalid",
    "/product/unknown",
    "/does-not-exist",
  ]) {
    await page.goto(path);
    await expect(
      page.getByRole("heading", { name: "এই পাতাটি খুঁজে পাওয়া যায়নি" }),
    ).toBeVisible();
  }
  expect(errors).toEqual([]);
});
test("server protection, validation, register, login, profile update, persistence and logout", async ({
  page,
}) => {
  const email = `assignment-${Date.now()}@example.com`;
  const password = "BazarDor-Test-2026!";
  await page.goto("/product/sorno-machi-chal");
  await expect(page).toHaveURL(/\/signin/);
  await expect(
    page.getByText("বিস্তারিত দেখতে প্রথমে সাইন ইন করুন।"),
  ).toBeVisible();
  await page.goto("/signup");
  await page
    .getByRole("button", { name: "রেজিস্টার করুন", exact: true })
    .click();
  await expect(page.locator(".form-error")).toBeVisible();
  await page.locator('input[name="name"]').fill("Test Shopper");
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill(password);
  await page
    .getByRole("button", { name: "রেজিস্টার করুন", exact: true })
    .click();
  await expect(page).toHaveURL(/\/signin$/);
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill("wrong-password");
  await page.getByRole("button", { name: "সাইন ইন করুন", exact: true }).click();
  await expect(page.locator(".form-error")).toBeVisible();
  await page.locator('input[name="password"]').fill(password);
  await page.getByRole("button", { name: "সাইন ইন করুন", exact: true }).click();
  await expect(page).toHaveURL("/");
  await expect(page.getByRole("link", { name: "Test Shopper" })).toBeVisible();
  await page.goto("/product/sorno-machi-chal");
  await expect(
    page.getByRole("heading", { name: "স্বর্ণমাছি চাল", exact: true }),
  ).toBeVisible();
  await expect(page.locator("tbody tr")).toHaveCount(12);
  await page.reload();
  await expect(page.locator("tbody tr")).toHaveCount(12);
  await page.goto("/profile");
  await page.getByRole("link", { name: "তথ্য আপডেট করুন" }).click();
  await expect(page).toHaveURL(/\/profile\/edit$/);
  await page.locator('input[name="name"]').fill("Updated Shopper");
  await page.getByRole("button", { name: "তথ্য আপডেট করুন" }).click();
  await expect(page).toHaveURL(/\/profile$/);
  await expect(page.locator("dd").first()).toHaveText("Updated Shopper");
  await page.reload();
  await expect(page.locator("dd").first()).toHaveText("Updated Shopper");
  await expect(
    page.getByRole("link", { name: "Updated Shopper" }),
  ).toBeVisible();
  await page.setViewportSize({ width: 375, height: 812 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  await page.getByRole("button", { name: "সাইন আউট", exact: true }).click();
  await expect(page).toHaveURL("/");
  await page.goto("/profile/edit");
  await expect(page).toHaveURL(/\/signin/);
});
