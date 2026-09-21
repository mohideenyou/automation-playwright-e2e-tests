import { test, expect } from '../fixtures/pages';
import { buildSignupDetails, VALID_PAYMENT_CARD } from '../utils/test-data';
import { createUserViaApi } from '../utils/api';

test('TC16: Place Order: Login before Checkout', async ({
  page,
  request,
  homePage,
  loginPage,
  signupPage,
  productsPage,
  cartPage,
  checkoutPage,
  paymentPage,
}) => {
  const details = buildSignupDetails();
  await createUserViaApi(request, details);

  await homePage.goto();
  await homePage.goToSignupLogin();
  await loginPage.assertOnLoginPage();
  await loginPage.login(details.email, details.password);
  await homePage.assertLoggedInAs(details.name);

  await productsPage.goto();
  await productsPage.addProductToCartByIndex(0);
  await productsPage.viewCartFromModal();

  await expect(page).toHaveURL(/\/view_cart/);
  await cartPage.proceedToCheckout();
  await checkoutPage.assertOnCheckoutPage();
  await checkoutPage.assertAddressContains(details.firstName);

  await checkoutPage.enterOrderComment('Ring the doorbell twice.');
  await checkoutPage.placeOrder();

  await paymentPage.fillCardDetails(VALID_PAYMENT_CARD);
  await paymentPage.confirmPayment();
  await paymentPage.assertOrderConfirmed();

  await homePage.deleteAccount();
  await signupPage.assertAccountDeleted();
});
