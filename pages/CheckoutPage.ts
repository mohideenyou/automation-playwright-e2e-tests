import { expect, Locator, Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly deliveryAddress: Locator;
  readonly billingAddress: Locator;
  readonly orderCommentTextArea: Locator;
  readonly placeOrderButton: Locator;
  readonly registerLoginLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.deliveryAddress = page.locator('#address_delivery');
    this.billingAddress = page.locator('#address_invoice');
    this.orderCommentTextArea = page.locator('textarea[name="message"]');
    this.placeOrderButton = page.locator('a.check_out[href="/payment"]');
    this.registerLoginLink = page.locator('a[href="/login"]');
  }

  async assertOnCheckoutPage() {
    await expect(this.page).toHaveURL(/\/checkout/);
  }

  async assertAddressContains(name: string) {
    await expect(this.deliveryAddress).toContainText(name);
    await expect(this.billingAddress).toContainText(name);
  }

  async enterOrderComment(comment: string) {
    await this.orderCommentTextArea.fill(comment);
  }

  async placeOrder() {
    await this.placeOrderButton.click();
  }
}
