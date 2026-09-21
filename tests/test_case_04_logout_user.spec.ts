import { test, expect } from '../fixtures/pages';
import { buildSignupDetails } from '../utils/test-data';
import { createUserViaApi, deleteUserViaApi } from '../utils/api';

test('TC4: Logout User', async ({ page, request, homePage, loginPage }) => {
  const details = buildSignupDetails();
  await createUserViaApi(request, details);

  try {
    await homePage.goto();
    await homePage.assertOnHomePage();

    await homePage.goToSignupLogin();
    await loginPage.assertOnLoginPage();

    await loginPage.login(details.email, details.password);
    await homePage.assertLoggedInAs(details.name);

    await homePage.logout();
    await loginPage.assertOnLoginPage();
  } finally {
    await deleteUserViaApi(request, details.email, details.password);
  }
});
