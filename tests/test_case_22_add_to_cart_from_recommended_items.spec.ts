import { test, expect } from '../fixtures/pages';

test('TC22: Add to cart from Recommended items', async ({ page, homePage, cartPage }) => {
  await homePage.goto();
  await homePage.assertOnHomePage();

  await homePage.recommendedItemsCarousel.scrollIntoViewIfNeeded();
  await expect(homePage.recommendedItemsCarousel).toBeVisible();

  await homePage.addNthRecommendedItemToCart(0);
  await homePage.viewCartFromModal();

  await expect(page).toHaveURL(/\/view_cart/);
  await expect(cartPage.cartRows).toHaveCount(1);
});
