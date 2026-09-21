import { test, expect } from '../fixtures/pages';
import { buildSignupDetails } from '../utils/test-data';
import { createUserViaApi } from '../utils/api';
import { deleteAccountAndAssert } from '../utils/actions';

test('TC2: Login User with correct email and password', async ({ request, homePage, loginPage, signupPage }) => {
  const details = buildSignupDetails();
  await createUserViaApi(request, details);

  await homePage.goto();
  await homePage.assertOnHomePage();

  await homePage.goToSignupLogin();
  await loginPage.assertOnLoginPage();

  await loginPage.login(details.email, details.password);
  await homePage.assertLoggedInAs(details.name);

  await deleteAccountAndAssert(homePage, signupPage);
});
