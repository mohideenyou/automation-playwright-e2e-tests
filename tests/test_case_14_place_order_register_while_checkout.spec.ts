import { test, expect } from '../fixtures/pages';
import { buildSignupDetails, VALID_PAYMENT_CARD } from '../utils/test-data';

test('TC14: Place Order: Register while Checkout', async ({
  page,
  homePage,
  productsPage,
  cartPage,
  loginPage,
  signupPage,
  checkoutPage,
  paymentPage,
}) => {
  const details = buildSignupDetails();

  await homePage.goto();
  await productsPage.goto();
  await productsPage.addProductToCartByIndex(0);
  await productsPage.viewCartFromModal();

  await expect(page).toHaveURL(/\/view_cart/);
  await cartPage.proceedToCheckout();
  await cartPage.goToRegisterLogin();

  await loginPage.assertOnLoginPage();
  await loginPage.signupNewUser(details.name, details.email);
  await signupPage.assertOnAccountInfoPage();
  await signupPage.fillAccountInformation(details);
  await signupPage.submitCreateAccount();
  await signupPage.assertAccountCreated();
  await signupPage.clickContinue();
  await homePage.assertLoggedInAs(details.name);

  await homePage.cartLink.click();
  await cartPage.proceedToCheckout();
  await checkoutPage.assertOnCheckoutPage();
  await checkoutPage.assertAddressContains(details.firstName);

  await checkoutPage.enterOrderComment('Please deliver between 9am-6pm.');
  await checkoutPage.placeOrder();

  await paymentPage.fillCardDetails(VALID_PAYMENT_CARD);
  await paymentPage.confirmPayment();
  await paymentPage.assertOrderConfirmed();

  await homePage.deleteAccount();
  await signupPage.assertAccountDeleted();
});
