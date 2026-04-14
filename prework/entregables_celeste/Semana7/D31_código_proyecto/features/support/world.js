import { setWorldConstructor } from '@cucumber/cucumber';

class CustomWorld {
  constructor({ attach } = {}) {
    this.attach = attach;
    this.browser = null;
    this.context = null;
    this.page = null;
  }
}

setWorldConstructor(CustomWorld);
