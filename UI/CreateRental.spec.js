import { test } from '@playwright/test';
import { Login } from '../Pages/Login.js';
import { RentalsPage } from '../Pages/Rentals.js';
import { loadCredentials } from '../support/credentials.helper.js';

const user = loadCredentials()[0];
test('User creates a new rental', async ({ page }) => {
    const login = new Login(page);
    const rentals = new RentalsPage(page);

    await login.goto();
    await login.login(user.email, user.password);
    await login.clickSignIn();
    await rentals.clickCrossModuleButton();
    await login.clickSidebarButton();

    await rentals.clickRentals();
    await rentals.clickCreateRental();
    await rentals.clickAddManually();
    await rentals.fillRentalName('Test Rental');
    await rentals.fillInternalName('Test Rental');
    await rentals.clickNext();
    await rentals.selectCountry('Pakistan');
    await rentals.fillAddress('DHA Phase 8, Lahore, Pakistan');
    await rentals.fillCity('Lahore');
    await rentals.clickLocationNext();
    await rentals.clickFileUploadIcon();
    await rentals.clickPhotoNextButton();
    await rentals.clickBasicInfoNextButton();
    await rentals.clickSkipButton();
    await rentals.fillPrice('1000');
    await rentals.clickPriceNextButton();
    await rentals.clickUseAIButton();
    await rentals.clickAiNextButton();
    await rentals.clickBookingNextButton();
    await rentals.clickGoToDashboardButton();
});