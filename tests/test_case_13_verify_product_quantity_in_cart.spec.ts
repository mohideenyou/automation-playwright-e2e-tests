import { test, expect } from '../fixtures/pages';

test('TC13: Verify Product quantity in Cart', async ({ page, homePage, productsPage, productDetailsPage, cartPage }) => {
  await homePage.goto();
  await homePage.assertOnHomePage();

  await productsPage.goto();
  await productsPage.viewProductByIndex(0);
  await productDetailsPage.assertOnProductDetailsPage();

  await productDetailsPage.setQuantity(4);
  await productDetailsPage.addToCart();
  await page.locator('#cartModal a[href="/view_cart"]').click();

  await expect(page).toHaveURL(/\/view_cart/);
  const quantity = await cartPage.getQuantity(1);
  expect(quantity).toBe('4');
});
