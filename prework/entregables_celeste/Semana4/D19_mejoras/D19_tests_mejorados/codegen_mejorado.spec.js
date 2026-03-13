import { test, expect } from '@playwright/test';

test('Login exitoso en SauceDemo', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
});

test('Navegar al detalle de un producto después de login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // antes: [data-test="item-4-title-link"]
    await page.getByRole('link', { name: 'Sauce Labs Backpack' }).click(); 
    // antes: .inventory_details_name
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible(); 
});

test('Agregar producto al carrito y validar carrito', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // antes: [data-test="add-to-cart-sauce-labs-backpack"]
    await page.getByRole('button', { name: 'Add to cart' }).click(); 
    // antes: .shopping_cart_link
    await page.locator('#shopping_cart_container a').click(); 

    // antes: [data-test="inventory-item"]
    await expect(page.locator('[data-test="inventory-item"]').filter({ hasText: 'Sauce Labs Backpack' })).toBeVisible(); 
    await expect(page.locator('[data-test="inventory-item-name"]')).toContainText('Sauce Labs Backpack');
});
