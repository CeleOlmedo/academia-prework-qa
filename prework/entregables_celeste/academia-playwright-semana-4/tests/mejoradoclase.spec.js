
import { test, expect } from '@playwright/test';

test('Agregar producto al carrito', async ({ page }) => {
    // Setup — Login
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Assertion 1: login exitoso
    await expect(page).toHaveURL(/inventory/);

    // Navegar al producto (selector mejorado)
    await page.getByText('Sauce Labs Backpack').click();

    // Assertion 2: estás en el detalle del producto correcto
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

    // Agregar al carrito
    await page.getByRole('button', { name: 'Add to cart' }).click();

    // Ir al carrito
    await page.locator('[data-test="shopping-cart-link"]').click();

    // Assertion 3: el producto está en el carrito
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

});
