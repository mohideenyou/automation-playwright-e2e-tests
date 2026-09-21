import { test, expect } from '../fixtures/pages';

test('TC17: Remove Products From Cart', async ({ page, homePage, productsPage, cartPage }) => {
  await homePage.goto();
  await productsPage.goto();
  await productsPage.addProductToCartByIndex(0);
  await productsPage.viewCartFromModal();

  await expect(page).toHaveURL(/\/view_cart/);
  await cartPage.assertProductInCart(1);

  await cartPage.removeProduct(1);
  await cartPage.assertProductRemoved(1);
});
