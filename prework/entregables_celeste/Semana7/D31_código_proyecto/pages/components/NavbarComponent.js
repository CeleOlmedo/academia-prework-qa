export class NavbarComponent {
  constructor(page) {
    this.page = page;
    this.cartLink = page.locator('a.shopping_cart_link');
  }

  async goToCart() {
    await this.cartLink.click();
  }
}
