import { expect } from '@playwright/test';

export class CheckoutOverviewPage {
  constructor(page) {
    this.page = page;
    this.itemPrices = page.locator('.inventory_item_price');
    this.subtotalLabel = page.locator('.summary_subtotal_label');
  }

  async expectItemTotalMatchesSum() {
    const texts = await this.itemPrices.allTextContents();
    const sum = texts
      .map((t) => parseFloat(t.replace('$', '').trim()))
      .reduce((acc, n) => acc + n, 0);

    const textoSubtotal = await this.subtotalLabel.textContent();
    const shown = parseFloat((textoSubtotal ?? '').replace('Item total: $', '').trim());

    expect(shown).toBeCloseTo(sum, 2);
  }
}
