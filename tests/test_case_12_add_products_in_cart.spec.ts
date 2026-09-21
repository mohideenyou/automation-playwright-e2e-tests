import { test, expect } from '../fixtures/pages';

test('TC12: Add Products in Cart', async ({ page, homePage, productsPage, cartPage }) => {
  await homePage.goto();
  await homePage.assertOnHomePage();

  await homePage.productsLink.click();
  await productsPage.assertOnProductsPage();

  const firstCard = productsPage.productCards.nth(0);
  const secondCard = productsPage.productCards.nth(1);
  const firstName = (await firstCard.locator('p').first().textContent())?.trim();
  const secondName = (await secondCard.locator('p').first().textContent())?.trim();

  await productsPage.addProductToCartByIndex(0);
  await productsPage.continueShopping();
  await productsPage.addProductToCartByIndex(1);
  await productsPage.viewCartFromModal();

  await expect(page).toHaveURL(/\/view_cart/);
  await cartPage.assertCartCount(2);

  const rowTexts = await cartPage.cartRows.allTextContents();
  expect(rowTexts.some((t) => firstName && t.includes(firstName))).toBeTruthy();
  expect(rowTexts.some((t) => secondName && t.includes(secondName))).toBeTruthy();
});
