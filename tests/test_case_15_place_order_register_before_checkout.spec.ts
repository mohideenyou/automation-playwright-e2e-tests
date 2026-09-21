import { test, expect } from '../fixtures/pages';
import { buildSignupDetails, VALID_PAYMENT_CARD } from '../utils/test-data';

test('TC15: Place Order: Register before Checkout', async ({
  page,
  homePage,
  loginPage,
  signupPage,
  productsPage,
  cartPage,
  checkoutPage,
  paymentPage,
}) => {
  const details = buildSignupDetails();

  await homePage.goto();
  await homePage.goToSignupLogin();
  await loginPage.assertOnLoginPage();
  await loginPage.signupNewUser(details.name, details.email);
  await signupPage.assertOnAccountInfoPage();
  await signupPage.fillAccountInformation(details);
  await signupPage.submitCreateAccount();
  await signupPage.assertAccountCreated();
  await signupPage.clickContinue();
  await homePage.assertLoggedInAs(details.name);

  await productsPage.goto();
  await productsPage.addProductToCartByIndex(0);
  await productsPage.viewCartFromModal();

  await expect(page).toHaveURL(/\/view_cart/);
  await cartPage.proceedToCheckout();
  await checkoutPage.assertOnCheckoutPage();
  await checkoutPage.assertAddressContains(details.firstName);

  await checkoutPage.enterOrderComment('Leave at the front desk.');
  await checkoutPage.placeOrder();

  await paymentPage.fillCardDetails(VALID_PAYMENT_CARD);
  await paymentPage.confirmPayment();
  await paymentPage.assertOrderConfirmed();

  await homePage.deleteAccount();
  await signupPage.assertAccountDeleted();
});
