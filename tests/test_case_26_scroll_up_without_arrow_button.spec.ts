import { test, expect } from '../fixtures/pages';

test("TC26: Verify Scroll Up without 'Arrow' button and Scroll Down functionality", async ({ page, homePage }) => {
  await homePage.goto();
  await homePage.assertOnHomePage();

  await page.getByRole('heading', { name: 'Subscription' }).scrollIntoViewIfNeeded();
  const scrolledY = await page.evaluate(() => window.scrollY);
  expect(scrolledY).toBeGreaterThan(0);

  await page.evaluate(() => window.scrollTo(0, 0));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});
