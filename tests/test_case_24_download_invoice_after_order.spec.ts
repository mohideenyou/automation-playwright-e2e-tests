import { test, expect } from '../fixtures/pages';
import { buildSignupDetails, VALID_PAYMENT_CARD } from '../utils/test-data';
import { createUserViaApi } from '../utils/api';
import fs from 'fs';

test('TC24: Download Invoice after purchase order', async ({
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
  await loginPage.login(details.email, details.password);
  await homePage.assertLoggedInAs(details.name);

  await productsPage.goto();
  await productsPage.addProductToCartByIndex(0);
  await productsPage.viewCartFromModal();
  await cartPage.proceedToCheckout();
  await checkoutPage.assertOnCheckoutPage();
  await checkoutPage.placeOrder();

  await paymentPage.fillCardDetails(VALID_PAYMENT_CARD);
  await paymentPage.confirmPayment();
  await paymentPage.assertOrderConfirmed();

  const download = await paymentPage.downloadInvoice();
  const savePath = await download.path();
  expect(savePath).toBeTruthy();
  expect(download.suggestedFilename()).toMatch(/invoice/i);
  expect(fs.existsSync(savePath!)).toBeTruthy();

  await paymentPage.continueButton.click();
  await homePage.deleteAccount();
  await signupPage.assertAccountDeleted();
});
