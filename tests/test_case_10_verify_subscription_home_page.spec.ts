import { test, expect } from '../fixtures/pages';
import { uniqueEmail } from '../utils/test-data';

test('TC10: Verify Subscription in home page', async ({ page, homePage }) => {
  await homePage.goto();
  await homePage.assertOnHomePage();

  await homePage.subscribeEmailInput.scrollIntoViewIfNeeded();
  await expect(page.getByRole('heading', { name: 'Subscription' })).toBeVisible();

  await homePage.subscribe(uniqueEmail('subscribe_home'));
  await expect(page.locator('#success-subscribe')).toBeVisible();
  await expect(page.locator('#success-subscribe')).toContainText('You have been successfully subscribed!');
});
