import { test, expect } from '../fixtures/pages';

test('TC18: View Category Products', async ({ page, homePage, productsPage }) => {
  await homePage.goto();
  await homePage.assertOnHomePage();
  await expect(productsPage.categoryPanel).toBeVisible();

  await productsPage.openCategory('Women');
  await productsPage.openSubCategory('Women', 'Dress');
  await expect(page).toHaveURL(/\/category_products\/\d+/);
  await expect(page.locator('.title.text-center')).toContainText('Women');
  await expect(page.locator('.title.text-center')).toContainText('Dress');
  await expect(productsPage.productCards.first()).toBeVisible();

  await productsPage.openCategory('Men');
  await productsPage.openSubCategory('Men', 'Tshirts');
  await expect(page).toHaveURL(/\/category_products\/\d+/);
  await expect(page.locator('.title.text-center')).toContainText('Men');
  await expect(page.locator('.title.text-center')).toContainText('Tshirts');
  await expect(productsPage.productCards.first()).toBeVisible();
});
