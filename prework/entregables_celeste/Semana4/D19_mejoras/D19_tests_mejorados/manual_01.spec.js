import { test, expect } from '@playwright/test';

test('happy path - login exitoso en Swag Labs', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/.*inventory\.html/);

    await expect(page.getByText('Products')).toBeVisible();

    const productos = page.locator('.inventory_item');
    await expect(productos.first()).toBeVisible();
});

