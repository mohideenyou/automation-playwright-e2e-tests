import { test, expect } from '../fixtures/pages';

test('TC21: Add review on product', async ({ page, homePage, productsPage, productDetailsPage }) => {
  await homePage.goto();
  await productsPage.goto();
  await productsPage.viewProductByIndex(0);
  await productDetailsPage.assertOnProductDetailsPage();

  await productDetailsPage.submitReview('QA Reviewer', 'qa.reviewer@example.com', 'Great quality product, highly recommended!');
  await productDetailsPage.assertReviewSubmitted();
});
