import { test } from '@playwright/test';
import { Login } from '../Pages/Login.js';
import { SearchPage } from '../Pages/search.js';
import { loadCredentials } from '../support/credentials.helper.js';

const user = loadCredentials()[0];
test('User searches for a rental', async ({ page }) => {
    const login = new Login(page);
    const search = new SearchPage(page);

    await login.goto();
    await login.login(user.email, user.password);
    await login.clickSignIn();
    await login.clickCrossModuleButton();
    await login.clickSidebarButton();
    await search.clickRentalsButton();
    await search.search('Test Rental');
});