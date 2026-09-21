import { test, expect } from '../fixtures/pages';

test('TC19: View & Cart Brand Products', async ({ page, homePage, productsPage, cartPage }) => {
  await homePage.goto();
  await homePage.assertOnHomePage();

  await homePage.productsLink.click();
  await productsPage.assertOnProductsPage();
  await expect(productsPage.brandsPanel).toBeVisible();

  await productsPage.openBrand('Polo');
  await expect(page).toHaveURL(/\/brand_products\/Polo/);
  await expect(page.locator('.title.text-center')).toContainText('Polo');
  await expect(productsPage.productCards.first()).toBeVisible();

  await productsPage.openBrand('H&M');
  await expect(page).toHaveURL(/\/brand_products\/H&M/);
  await expect(page.locator('.title.text-center')).toContainText('H&M');
  await expect(productsPage.productCards.first()).toBeVisible();

  await productsPage.addProductToCartByIndex(0);
  await productsPage.viewCartFromModal();
  await expect(page).toHaveURL(/\/view_cart/);
  await expect(cartPage.cartRows).toHaveCount(1);
});
