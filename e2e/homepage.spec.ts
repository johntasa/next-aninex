import { test, expect } from "@playwright/test";

test("homepage loads and displays content correctly", async ({ page }) => {
  await page.goto("https://next-aninex.vercel.app/");
  
  await expect(page).toHaveTitle(/ANINEX/);
  
  const title = page.getByText("ANINEX");
  await expect(title).toBeVisible();
  
  const searchInput = page.getByLabel("Search");
  await expect(searchInput).toBeVisible();
  
  const popularSection = page.getByText("POPULAR THIS SEASON");
  await expect(popularSection).toBeVisible();
  
  const allTimePopular = page.getByText("ALL TIME POPULAR");
  await expect(allTimePopular).toBeVisible();
  
  const animeCards = page.locator(".aspect-\\[3\\/4\\]");
  await expect(animeCards).toHaveCount(12);
});