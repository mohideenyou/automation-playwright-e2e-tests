import { expect, Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly signupLoginLink: Locator;
  readonly logoutLink: Locator;
  readonly deleteAccountLink: Locator;
  readonly loggedInAsText: Locator;
  readonly productsLink: Locator;
  readonly cartLink: Locator;
  readonly testCasesLink: Locator;
  readonly contactUsLink: Locator;
  readonly subscribeEmailInput: Locator;
  readonly subscribeButton: Locator;
  readonly scrollUpButton: Locator;
  readonly recommendedItemsCarousel: Locator;

  constructor(page: Page) {
    this.page = page;
    const nav = page.locator('.nav.navbar-nav');
    this.signupLoginLink = nav.locator('a[href="/login"]');
    this.logoutLink = nav.locator('a[href="/logout"]');
    this.deleteAccountLink = nav.locator('a[href="/delete_account"]');
    this.loggedInAsText = page.getByText('Logged in as');
    this.productsLink = nav.locator('a[href="/products"]');
    this.cartLink = nav.locator('a[href="/view_cart"]');
    this.testCasesLink = nav.locator('a[href="/test_cases"]');
    this.contactUsLink = nav.locator('a[href="/contact_us"]');
    this.subscribeEmailInput = page.locator('#susbscribe_email');
    this.subscribeButton = page.locator('#subscribe');
    this.scrollUpButton = page.locator('#scrollUp');
    this.recommendedItemsCarousel = page.locator('#recommended-item-carousel');
  }

  async goto() {
    await this.page.goto('/');
  }

  async assertOnHomePage() {
    // Ignore a trailing "#google_vignette" fragment: an interstitial ad on this site sometimes
    // appends it to the URL without actually preventing navigation.
    await expect(this.page).toHaveURL(/automationexercise\.com\/?(#.*)?$/);
  }

  async goToSignupLogin() {
    await this.signupLoginLink.click();
  }

  async logout() {
    await this.logoutLink.click();
  }

  async deleteAccount() {
    await this.deleteAccountLink.click();
  }

  async assertLoggedInAs(name: string) {
    await expect(this.loggedInAsText).toContainText(name);
  }

  async subscribe(email: string) {
    await this.subscribeEmailInput.scrollIntoViewIfNeeded();
    await this.subscribeEmailInput.fill(email);
    await this.subscribeButton.click();
  }

  async addNthRecommendedItemToCart(index = 0) {
    await this.recommendedItemsCarousel.scrollIntoViewIfNeeded();
    const addToCartButtons = this.recommendedItemsCarousel.locator('.add-to-cart');
    await addToCartButtons.nth(index).click();
  }

  async viewCartFromModal() {
    await this.page.locator('#cartModal a[href="/view_cart"]').click();
  }

  async clickScrollUp() {
    await this.scrollUpButton.click();
  }
}
