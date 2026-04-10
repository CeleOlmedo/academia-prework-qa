// pages/CheckoutOverviewPage.js
import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class CheckoutOverviewPage extends BasePage {
  #itemPrices;
  #subtotalLabel;
  #finishButton;
  #confirmationHeader;

  constructor(page) {
    super(page);
    this.#itemPrices = this.page.locator('.inventory_item_price');
    this.#subtotalLabel = this.page.locator('.summary_subtotal_label');
    this.#finishButton = this.page.getByRole('button', { name: 'Finish' });
    this.#confirmationHeader = this.page.getByRole('heading', { name: 'Thank you for your order!' });
  }

  /**
   * Suma los precios individuales mostrados en la UI y los compara
   * contra el subtotal calculado por la aplicación.
   *
   * 1. allTextContents() => ["$29.99", "$9.99"]
   * 2. replace('$', '')  => ["29.99", "9.99"]
   * 3. parseFloat()      => [29.99, 9.99]
   * 4. reduce(sum)       => 39.98
   * 5. expect contra el valor del label de subtotal
   */
  async validateSubtotalMatchesItemSum() {
    const priceTexts = await this.#itemPrices.allTextContents();
    const prices = priceTexts.map(text => parseFloat(text.replace('$', '')));
    const calculatedTotal = prices.reduce((acum, precio) => acum + precio, 0);

    const subtotalText = await this.#subtotalLabel.textContent();
    const displayedTotal = parseFloat(subtotalText.replace('Item total: $', ''));

    const totalRedondeado = Math.round(calculatedTotal * 100) / 100;
    expect(totalRedondeado).toBe(displayedTotal);
    return totalRedondeado;
  }

  async clickFinish() {
    await this.#finishButton.click();
  }

  async isOrderComplete() {
    await expect(this.#confirmationHeader).toBeVisible();
  }
}
