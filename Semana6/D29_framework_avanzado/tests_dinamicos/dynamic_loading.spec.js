import { test, expect } from '@playwright/test';

test.describe('Parte A: Esperas dinámicas - Sin waitForTimeout', () => {

  test('Dynamic Loading Ejemplo 1 - elemento oculto', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');

    await page.getByRole('button', { name: 'Start' }).click();

    await expect(page.locator('#finish')).toBeVisible();
    await expect(page.locator('#finish h4')).toHaveText('Hello World!');
  });

  test('Dynamic Loading Ejemplo 2 - elemento que se renderiza', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');

    await page.getByRole('button', { name: 'Start' }).click();

    await expect(page.locator('#finish h4')).toBeVisible();
    await expect(page.locator('#finish h4')).toHaveText('Hello World!');
  });

});
