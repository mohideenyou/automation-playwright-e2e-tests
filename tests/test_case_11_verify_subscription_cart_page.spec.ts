import { test, expect } from '../fixtures/pages';
import { uniqueEmail } from '../utils/test-data';

test('TC11: Verify Subscription in Cart page', async ({ page, homePage, cartPage }) => {
  await homePage.goto();
  await homePage.assertOnHomePage();

  await homePage.cartLink.click();
  await expect(page).toHaveURL(/\/view_cart/);

  await homePage.subscribeEmailInput.scrollIntoViewIfNeeded();
  await expect(page.getByRole('heading', { name: 'Subscription' })).toBeVisible();

  await homePage.subscribe(uniqueEmail('subscribe_cart'));
  await expect(page.locator('#success-subscribe')).toBeVisible();
  await expect(page.locator('#success-subscribe')).toContainText('You have been successfully subscribed!');
});
