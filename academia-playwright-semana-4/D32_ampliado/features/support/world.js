import { setWorldConstructor } from '@cucumber/cucumber';
import { CucumberAllureWorld } from 'allure-cucumberjs';

class CustomWorld extends CucumberAllureWorld {
  constructor(options) {
    super(options);
    this.browser = null;
    this.context = null;
    this.page = null;
  }
}

setWorldConstructor(CustomWorld);
