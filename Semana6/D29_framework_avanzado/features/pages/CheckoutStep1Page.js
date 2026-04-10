// pages/CheckoutStep1Page.js
import { BasePage } from './BasePage.js';

export class CheckoutStep1Page extends BasePage {
  #firstNameInput;
  #lastNameInput;
  #zipInput;
  #continueButton;

  constructor(page) {
    super(page);
    this.#firstNameInput = this.page.getByRole('textbox', { name: 'First Name' });
    this.#lastNameInput = this.page.getByRole('textbox', { name: 'Last Name' });
    this.#zipInput = this.page.getByRole('textbox', { name: 'Zip/Postal Code' });
    this.#continueButton = this.page.getByRole('button', { name: 'Continue' });
  }

  async fillShippingInfo(firstName, lastName, zip) {
    await this.#firstNameInput.fill(firstName);
    await this.#lastNameInput.fill(lastName);
    await this.#zipInput.fill(zip);
    await this.#continueButton.click();
  }
}
