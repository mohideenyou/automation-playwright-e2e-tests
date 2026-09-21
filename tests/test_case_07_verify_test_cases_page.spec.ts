import { test, expect } from '../fixtures/pages';

test('TC7: Verify Test Cases Page', async ({ page, homePage }) => {
  await homePage.goto();
  await homePage.assertOnHomePage();

  await homePage.testCasesLink.click();
  await expect(page).toHaveURL(/\/test_cases/);
  await expect(page.getByRole('heading', { name: 'Test Cases', exact: true })).toBeVisible();
});
