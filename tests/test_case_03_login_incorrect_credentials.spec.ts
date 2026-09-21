import { test, expect } from '../fixtures/pages';
import { uniqueEmail } from '../utils/test-data';

test('TC3: Login User with incorrect email and password', async ({ homePage, loginPage }) => {
  await homePage.goto();
  await homePage.assertOnHomePage();

  await homePage.goToSignupLogin();
  await loginPage.assertOnLoginPage();

  await loginPage.login(uniqueEmail('no_such_user'), 'WrongPassword123!');
  await loginPage.assertLoginError();
});
