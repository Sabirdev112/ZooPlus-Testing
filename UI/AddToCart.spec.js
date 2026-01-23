import { test } from '@playwright/test';
import { Login } from '../Pages/Login.js';
import { addToCartPage } from '../Pages/AddToCart.js';
import { loadCredentials } from '../support/credentials.helper.js';

const user = loadCredentials()[0];
test('User adds product to cart', async ({ page }) => {
    const login = new Login(page);
    const addToCart = new addToCartPage(page);

    await login.goto();
    await login.clickAcceptCookies();
    await login.clickProfile();
    await login.login(user.email, user.password);
    await login.clickSignIn();
    await addToCart.searchProduct('dog food');
    await addToCart.clickProduct();
    await addToCart.addToCart();
});