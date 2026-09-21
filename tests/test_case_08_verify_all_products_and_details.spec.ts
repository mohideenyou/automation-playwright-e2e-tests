import { test, expect } from '../fixtures/pages';

test('TC8: Verify All Products and product detail page', async ({ page, homePage, productsPage, productDetailsPage }) => {
  await homePage.goto();
  await homePage.assertOnHomePage();

  await homePage.productsLink.click();
  await productsPage.assertOnProductsPage();
  await expect(productsPage.productCards.first()).toBeVisible();

  await productsPage.viewProductByIndex(0);
  await expect(page).toHaveURL(/\/product_details\/\d+/);
  await productDetailsPage.assertOnProductDetailsPage();

  await expect(productDetailsPage.productName).toBeVisible();
  await expect(productDetailsPage.productCategory).toBeVisible();
  await expect(productDetailsPage.productPrice).toBeVisible();
  await expect(productDetailsPage.productAvailability).toContainText('Availability');
  await expect(productDetailsPage.productCondition).toContainText('Condition');
  await expect(productDetailsPage.productBrand).toContainText('Brand');
});
