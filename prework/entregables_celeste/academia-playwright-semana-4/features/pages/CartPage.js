import { BasePage } from './BasePage.js';

export class CartPage extends BasePage {
  #cartItems;

  constructor(page) {
    super(page);
    this.#cartItems = this.page.locator('.cart_item');
  }

  async isLoaded() {
    await super.waitForURL(/.*cart\.html/);
  }

  async getCartItem(productName) {
    return this.#cartItems.filter({ has: this.page.getByText(productName) });
  }

  async getItemPrice(productName) {
    const item = await this.getCartItem(productName);
    return item.locator('.inventory_item_price');
  }
}
