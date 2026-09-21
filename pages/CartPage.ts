import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartRows: Locator;
  readonly proceedToCheckoutButton: Locator;
  readonly emptyCartMessage: Locator;
  readonly registerLoginLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartRows = page.locator('#cart_info tbody tr');
    this.proceedToCheckoutButton = page.locator('.check_out');
    this.emptyCartMessage = page.locator('#empty_cart');
    this.registerLoginLink = page.locator('a[href="/login"]', { hasText: 'Register / Login' });
  }

  async goto() {
    await this.page.goto('/view_cart');
  }

  rowByProductId(productId: number): Locator {
    return this.page.locator(`#product-${productId}`);
  }

  async assertProductInCart(productId: number) {
    await expect(this.rowByProductId(productId)).toBeVisible();
  }

  async getQuantity(productId: number): Promise<string> {
    return (await this.rowByProductId(productId).locator('.cart_quantity button').textContent()) ?? '';
  }

  async getTotalPrice(productId: number): Promise<string> {
    return (await this.rowByProductId(productId).locator('.cart_total_price').textContent()) ?? '';
  }

  async removeProduct(productId: number) {
    await this.rowByProductId(productId).locator('.cart_quantity_delete').click();
  }

  async assertProductRemoved(productId: number) {
    await expect(this.rowByProductId(productId)).toHaveCount(0);
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }

  async goToRegisterLogin() {
    await this.registerLoginLink.click();
  }

  async assertCartCount(count: number) {
    await expect(this.cartRows).toHaveCount(count);
  }
}
