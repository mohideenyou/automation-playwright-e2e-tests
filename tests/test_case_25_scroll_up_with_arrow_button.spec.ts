import { test, expect } from '../fixtures/pages';

test("TC25: Verify Scroll Up using 'Arrow' button and Scroll Down functionality", async ({ page, homePage }) => {
  await homePage.goto();
  await homePage.assertOnHomePage();

  await page.getByRole('heading', { name: 'Subscription' }).scrollIntoViewIfNeeded();
  const scrolledY = await page.evaluate(() => window.scrollY);
  expect(scrolledY).toBeGreaterThan(0);

  await expect(homePage.scrollUpButton).toBeVisible();
  await homePage.clickScrollUp();

  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(scrolledY);
  await expect.poll(() => page.evaluate(() => window.scrollY), { timeout: 5000 }).toBe(0);
});
