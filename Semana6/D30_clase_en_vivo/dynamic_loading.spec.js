// dynamic_loading.spec.js
import { test, expect } from '@playwright/test';

test('carga dinámica sin sleeps artificiales', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');

    const start = page.getByRole('button', { name: 'Start' });
    const loading = page.locator('#loading');
    const headline = page.locator('#finish h4');

    await start.click();
    await expect(loading).toBeHidden();
    await expect(headline).toHaveText('Hello World!');
});