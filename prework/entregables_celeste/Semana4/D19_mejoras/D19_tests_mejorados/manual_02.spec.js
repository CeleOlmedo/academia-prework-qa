import { test, expect } from '@playwright/test';

test('negative path - login falla con credenciales inválidas', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('wrong_password');
    await page.getByRole('button', { name: 'Login' }).click();

    const mensajeError = page.getByText(
        'Epic sadface: Username and password do not match any user in this service'
    );

    await expect(page).toHaveURL('https://www.saucedemo.com/');

    await expect(mensajeError).toBeVisible();
});
