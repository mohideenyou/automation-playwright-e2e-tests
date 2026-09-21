import { test, expect } from '../fixtures/pages';
import { buildSignupDetails } from '../utils/test-data';
import { createUserViaApi, deleteUserViaApi } from '../utils/api';

test('TC5: Register User with existing email', async ({ request, homePage, loginPage }) => {
  const details = buildSignupDetails();
  await createUserViaApi(request, details);

  try {
    await homePage.goto();
    await homePage.assertOnHomePage();

    await homePage.goToSignupLogin();
    await loginPage.assertOnLoginPage();

    await loginPage.signupNewUser(details.name, details.email);
    await loginPage.assertSignupEmailExistsError();
  } finally {
    await deleteUserViaApi(request, details.email, details.password);
  }
});
