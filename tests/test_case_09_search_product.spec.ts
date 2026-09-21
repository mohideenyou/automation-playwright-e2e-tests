import { test, expect } from '../fixtures/pages';

test('TC9: Search Product', async ({ homePage, productsPage }) => {
  await homePage.goto();
  await homePage.assertOnHomePage();

  await homePage.productsLink.click();
  await productsPage.assertOnProductsPage();

  await productsPage.searchProduct('Top');
  await productsPage.assertSearchedProductsVisible();

  const count = await productsPage.productCards.count();
  expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i++) {
    await expect(productsPage.productCards.nth(i)).toBeVisible();
  }
});
