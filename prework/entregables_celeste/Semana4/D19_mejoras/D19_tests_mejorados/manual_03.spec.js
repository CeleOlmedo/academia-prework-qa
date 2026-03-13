import { test, expect } from '@playwright/test';

test('validación - no permite login con campos vacíos', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.getByRole('button', { name: 'Login' }).click();

    const mensajeError = page.getByText('Epic sadface: Username is required');

    await expect(mensajeError).toBeVisible();

    await expect(page.getByPlaceholder('Username')).toBeVisible();
});
