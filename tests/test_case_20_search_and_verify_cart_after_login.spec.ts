import { test, expect } from '../fixtures/pages';
import { buildSignupDetails } from '../utils/test-data';
import { createUserViaApi } from '../utils/api';

test('TC20: Search Products and Verify Cart After Login', async ({
  page,
  request,
  homePage,
  loginPage,
  signupPage,
  productsPage,
  cartPage,
}) => {
  const details = buildSignupDetails();
  await createUserViaApi(request, details);

  await homePage.goto();
  await homePage.productsLink.click();
  await productsPage.assertOnProductsPage();

  await productsPage.searchProduct('Dress');
  await productsPage.assertSearchedProductsVisible();

  await productsPage.addProductToCartByIndex(0);
  await productsPage.continueShopping();
  await productsPage.addProductToCartByIndex(1);
  await productsPage.viewCartFromModal();

  await expect(page).toHaveURL(/\/view_cart/);
  await cartPage.assertCartCount(2);

  await homePage.goToSignupLogin();
  await loginPage.assertOnLoginPage();
  await loginPage.login(details.email, details.password);
  await homePage.assertLoggedInAs(details.name);

  await homePage.cartLink.click();
  await expect(page).toHaveURL(/\/view_cart/);
  await cartPage.assertCartCount(2);

  await homePage.deleteAccount();
  await signupPage.assertAccountDeleted();
});
