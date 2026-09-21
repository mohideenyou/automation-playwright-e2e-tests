import { test, expect } from '../fixtures/pages';
import { buildSignupDetails } from '../utils/test-data';
import { createUserViaApi } from '../utils/api';

test('TC23: Verify address details in checkout page', async ({
  page,
  request,
  homePage,
  loginPage,
  signupPage,
  productsPage,
  cartPage,
  checkoutPage,
}) => {
  const details = buildSignupDetails({ company: 'Acme QA Corp' });
  await createUserViaApi(request, details);

  await homePage.goto();
  await homePage.goToSignupLogin();
  await loginPage.login(details.email, details.password);
  await homePage.assertLoggedInAs(details.name);

  await productsPage.goto();
  await productsPage.addProductToCartByIndex(0);
  await productsPage.viewCartFromModal();
  await cartPage.proceedToCheckout();
  await checkoutPage.assertOnCheckoutPage();

  await expect(checkoutPage.deliveryAddress).toContainText(details.firstName);
  await expect(checkoutPage.deliveryAddress).toContainText(details.lastName);
  await expect(checkoutPage.deliveryAddress).toContainText(details.company);
  await expect(checkoutPage.deliveryAddress).toContainText(details.address1);
  await expect(checkoutPage.deliveryAddress).toContainText(details.city);
  await expect(checkoutPage.deliveryAddress).toContainText(details.state);
  await expect(checkoutPage.deliveryAddress).toContainText(details.zipcode);
  await expect(checkoutPage.deliveryAddress).toContainText(details.country);
  await expect(checkoutPage.deliveryAddress).toContainText(details.mobileNumber);

  await expect(checkoutPage.billingAddress).toContainText(details.firstName);
  await expect(checkoutPage.billingAddress).toContainText(details.address1);

  await homePage.deleteAccount();
  await signupPage.assertAccountDeleted();
});
