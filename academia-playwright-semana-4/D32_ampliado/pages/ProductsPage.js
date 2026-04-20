import { expect } from '@playwright/test';
import { URL_PATTERNS } from '../constants/urls.js';
import { NavbarComponent } from './components/NavbarComponent.js';

export class ProductsPage {
  constructor(page) {
    this.page = page;
    this.navbar = new NavbarComponent(page);
    this.inventoryItems = page.locator('.inventory_item');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(URL_PATTERNS.inventory);
    await expect(this.page.getByText('Products')).toBeVisible();
  }

  async addFirstProductToCart() {
    const first = this.inventoryItems.first();
    await first.getByRole('button', { name: /Add to cart/i }).click();
  }

  async addProductToCart(productName) {
    const row = this.inventoryItems.filter({
      has: this.page.getByText(productName, { exact: true }),
    });
    await row.getByRole('button', { name: /add to cart/i }).click();
  }
}
