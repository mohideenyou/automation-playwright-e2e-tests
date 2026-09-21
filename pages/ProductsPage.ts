import { expect, Locator, Page } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly productCards: Locator;
  readonly allProductsHeading: Locator;
  readonly brandsPanel: Locator;
  readonly categoryPanel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('.title.text-center');
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.productCards = page.locator('.product-image-wrapper');
    this.allProductsHeading = page.getByRole('heading', { name: 'All Products' });
    this.brandsPanel = page.locator('.brands_products');
    this.categoryPanel = page.locator('.left-sidebar .panel-group');
  }

  async goto() {
    await this.page.goto('/products');
  }

  async assertOnProductsPage() {
    await expect(this.page).toHaveURL(/\/products/);
    await expect(this.allProductsHeading).toBeVisible();
  }

  async searchProduct(term: string) {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  async assertSearchedProductsVisible() {
    await expect(this.pageTitle).toHaveText('Searched Products');
    await expect(this.productCards.first()).toBeVisible();
  }

  productCardByName(name: string): Locator {
    return this.page.locator('.product-image-wrapper').filter({ hasText: name });
  }

  async addProductToCartByIndex(index: number) {
    const card = this.productCards.nth(index);
    await card.hover();
    await card.locator('.add-to-cart').first().click();
  }

  async addProductToCartByName(name: string) {
    const card = this.productCardByName(name);
    await card.hover();
    await card.locator('.add-to-cart').first().click();
  }

  async continueShopping() {
    await this.page.locator('.close-modal').click();
  }

  async viewCartFromModal() {
    await this.page.locator('#cartModal a[href="/view_cart"]').click();
  }

  async viewProductByIndex(index: number) {
    await this.productCards.nth(index).locator('a', { hasText: 'View Product' }).click();
  }

  async openCategory(category: 'Women' | 'Men' | 'Kids') {
    await this.page.locator(`a[href="#${category}"]`).click();
  }

  async openSubCategory(category: 'Women' | 'Men' | 'Kids', subCategory: string) {
    await this.page.locator(`#${category} .panel-body a`, { hasText: subCategory }).click();
  }

  async openBrand(brand: string) {
    await this.page.locator(`.brands_products a[href="/brand_products/${brand}"]`).click();
  }
}
