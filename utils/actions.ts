import { HomePage } from '../pages/HomePage';
import { SignupPage } from '../pages/SignupPage';

export async function deleteAccountAndAssert(homePage: HomePage, signupPage: SignupPage) {
  await homePage.deleteAccount();
  await signupPage.assertAccountDeleted();
}
