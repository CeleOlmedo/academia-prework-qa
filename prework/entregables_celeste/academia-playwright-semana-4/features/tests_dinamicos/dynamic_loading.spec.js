import { test, expect } from '@playwright/test';

test.describe('Parte A: Esperas dinámicas - Sin waitForTimeout', () => {

  test('Dynamic Loading Ejemplo 1 - elemento oculto', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');

    // Hacemos clic en el botón Start
    await page.getByRole('button', { name: 'Start' }).click();

    // Playwright espera dinámicamente: el loader desaparece y "Hello World!" aparece
    // ❌ PROHIBIDO: await page.waitForTimeout(5000);
    // ✅ CORRECTO: expect con auto-wait
    await expect(page.locator('#finish')).toBeVisible();
    await expect(page.locator('#finish h4')).toHaveText('Hello World!');
  });

  test('Dynamic Loading Ejemplo 2 - elemento que se renderiza', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');

    await page.getByRole('button', { name: 'Start' }).click();

    // El elemento no existe en el DOM hasta que carga
    // Playwright espera automáticamente hasta que sea visible
    await expect(page.locator('#finish h4')).toBeVisible();
    await expect(page.locator('#finish h4')).toHaveText('Hello World!');
  });

});
