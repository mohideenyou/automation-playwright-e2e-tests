import { test, expect } from '../fixtures/pages';
import { buildSignupDetails } from '../utils/test-data';

test('TC1: Register User', async ({ page, homePage, loginPage, signupPage }) => {
  const details = buildSignupDetails();

  await homePage.goto();
  await homePage.assertOnHomePage();

  await homePage.goToSignupLogin();
  await loginPage.assertOnLoginPage();

  await loginPage.signupNewUser(details.name, details.email);
  await signupPage.assertOnAccountInfoPage();

  await signupPage.fillAccountInformation(details);
  await signupPage.submitCreateAccount();
  await signupPage.assertAccountCreated();

  await signupPage.clickContinue();
  await homePage.assertLoggedInAs(details.name);

  await homePage.deleteAccount();
  await signupPage.assertAccountDeleted();
});
