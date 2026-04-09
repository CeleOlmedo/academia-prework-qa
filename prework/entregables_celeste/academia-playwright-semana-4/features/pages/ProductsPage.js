import { BasePage } from './BasePage.js';

export class ProductsPage extends BasePage {
  #inventoryContainer;
  #productNames;
  #productPrices;
  #sortContainer;
  #cartLink;

  constructor(page) {
    super(page);
    this.#inventoryContainer = this.page.locator('.inventory_container');
    this.#productNames = this.page.locator('.inventory_item_name');
    this.#productPrices = this.page.locator('.inventory_item_price');
    this.#sortContainer = this.page.locator('[data-test="product-sort-container"]');
    this.#cartLink = this.page.locator('.shopping_cart_link');
  }

  async isLoaded() {
    await super.waitForURL(/.*inventory\.html/);
    await super.waitForVisible(this.#inventoryContainer);
  }

  async getInventoryContainer() {
    return this.#inventoryContainer;
  }

  async addToCart(productName) {
    const item = this.page
      .locator('.inventory_item')
      .filter({ has: this.page.getByText(productName) });
    await item.getByRole('button', { name: /Add to cart/i }).click();
  }

  async goToCart() {
    await this.#cartLink.click();
    await super.waitForURL(/.*cart\.html/);
  }

  async sortBy(value) {
    await this.#sortContainer.selectOption(value);
  }

  async getFirstProductName() {
    return this.#productNames.first();
  }

  async getFirstProductPrice() {
    return this.#productPrices.first();
  }
}
