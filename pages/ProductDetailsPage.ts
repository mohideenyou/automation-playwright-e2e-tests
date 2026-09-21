import { expect, Locator, Page } from '@playwright/test';

export class ProductDetailsPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly productCategory: Locator;
  readonly productPrice: Locator;
  readonly productAvailability: Locator;
  readonly productCondition: Locator;
  readonly productBrand: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;
  readonly reviewNameInput: Locator;
  readonly reviewEmailInput: Locator;
  readonly reviewTextArea: Locator;
  readonly reviewSubmitButton: Locator;
  readonly reviewSuccessMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator('.product-information h2');
    this.productCategory = page.locator('.product-information p', { hasText: 'Category' });
    this.productPrice = page.locator('.product-information span span');
    this.productAvailability = page.locator('.product-information p', { hasText: 'Availability' });
    this.productCondition = page.locator('.product-information p', { hasText: 'Condition' });
    this.productBrand = page.locator('.product-information p', { hasText: 'Brand' });
    this.quantityInput = page.locator('#quantity');
    this.addToCartButton = page.locator('.btn.cart');
    this.reviewNameInput = page.locator('#name');
    this.reviewEmailInput = page.locator('#email');
    this.reviewTextArea = page.locator('#review');
    this.reviewSubmitButton = page.locator('#button-review');
    this.reviewSuccessMessage = page.getByText('Thank you for your review.');
  }

  async goto(productId: number) {
    await this.page.goto(`/product_details/${productId}`);
  }

  async assertOnProductDetailsPage() {
    await expect(this.productName).toBeVisible();
  }

  async setQuantity(quantity: number) {
    await this.quantityInput.fill(quantity.toString());
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async submitReview(name: string, email: string, review: string) {
    await this.reviewNameInput.fill(name);
    await this.reviewEmailInput.fill(email);
    await this.reviewTextArea.fill(review);
    await this.reviewSubmitButton.click();
  }

  async assertReviewSubmitted() {
    await expect(this.reviewSuccessMessage).toBeVisible();
  }
}
