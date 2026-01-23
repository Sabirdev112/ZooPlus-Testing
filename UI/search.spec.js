import { test } from '@playwright/test';
import { addToCartPage } from '../Pages/AddToCart.js';
import { Login } from '../Pages/Login.js';

test('User searches for a rental', async ({ page }) => {

    const search = new addToCartPage(page);
    const login = new Login(page);

    await login.goto();
    await login.clickAcceptCookies();
    await search.searchProduct('dog food');
    await search.clickProduct();
});
