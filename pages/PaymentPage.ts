import { expect, Locator, Page } from '@playwright/test';

export class PaymentPage {
  readonly page: Page;
  readonly nameOnCardInput: Locator;
  readonly cardNumberInput: Locator;
  readonly cvcInput: Locator;
  readonly expiryMonthInput: Locator;
  readonly expiryYearInput: Locator;
  readonly payButton: Locator;
  readonly orderConfirmationHeading: Locator;
  readonly downloadInvoiceLink: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameOnCardInput = page.locator('[data-qa="name-on-card"]');
    this.cardNumberInput = page.locator('[data-qa="card-number"]');
    this.cvcInput = page.locator('[data-qa="cvc"]');
    this.expiryMonthInput = page.locator('[data-qa="expiry-month"]');
    this.expiryYearInput = page.locator('[data-qa="expiry-year"]');
    this.payButton = page.locator('[data-qa="pay-button"]');
    this.orderConfirmationHeading = page.getByText('Order Placed!');
    this.downloadInvoiceLink = page.locator('a[href*="/download_invoice/"]');
    this.continueButton = page.locator('a', { hasText: 'Continue' });
  }

  async fillCardDetails(card: {
    nameOnCard: string;
    cardNumber: string;
    cvc: string;
    expiryMonth: string;
    expiryYear: string;
  }) {
    await this.nameOnCardInput.fill(card.nameOnCard);
    await this.cardNumberInput.fill(card.cardNumber);
    await this.cvcInput.fill(card.cvc);
    await this.expiryMonthInput.fill(card.expiryMonth);
    await this.expiryYearInput.fill(card.expiryYear);
  }

  async confirmPayment() {
    await this.payButton.click();
  }

  async assertOrderConfirmed() {
    await expect(this.orderConfirmationHeading).toBeVisible();
  }

  async downloadInvoice() {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.downloadInvoiceLink.click(),
    ]);
    return download;
  }
}
