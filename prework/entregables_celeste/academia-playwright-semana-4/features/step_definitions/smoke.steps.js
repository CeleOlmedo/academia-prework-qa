const { Given, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { expect } = require('@playwright/test');

setDefaultTimeout(20000);

let browser;
let page;

Given('abro la pagina {string}', async function (url) {

    browser = await chromium.launch();
    const context = await browser.newContext();
    page = await context.newPage();

    await page.goto(url);

});

Then('veo el texto {string}', async function (texto) {

    await expect(page.getByText(texto)).toBeVisible();

    await browser.close();

});