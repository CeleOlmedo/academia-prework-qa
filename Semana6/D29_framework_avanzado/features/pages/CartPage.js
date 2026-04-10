// pages/CartPage.js
import { BasePage } from './BasePage.js';
import { NavbarComponent } from './components/NavbarComponent.js';

export class CartPage extends BasePage {
  #cartItems;
  #checkoutButton;

  constructor(page) {
    super(page);
    this.#cartItems = this.page.locator('.cart_item');
    this.#checkoutButton = this.page.locator('[data-test="checkout"]');

    this.navbar = new NavbarComponent(page);
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

  async clickCheckout() {
    await this.#checkoutButton.click();
  }

  async getCartItemCount() {
    return await this.#cartItems.count();
  }
}
