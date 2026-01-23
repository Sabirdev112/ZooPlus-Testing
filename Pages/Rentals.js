import {expect} from '@playwright/test';
import path from 'path';
export class RentalsPage {
    constructor(page) {
        this.page = page;
        this.crossModuleButton  = page.getByRole('button', { name: 'Close' });
        this.rentalsButton = page.locator('span[data-ui-mitem-title="true"]', { hasText: 'Rentals' });
        this.createRentalButton = page.getByRole('button', { name: 'Create rental' });
        this.createManuallyButton = page.locator('svg[data-icon-name="ClinicMedical"]');
        this.rentalNameInput = page.locator('[data-testid="flow.rental-creation.name.field-name"]');
        this.internalNameInput = page.locator('[data-testid="flow.rental-creation.name.field-internal-name"]');
        this.nextButton = page.getByRole('button', { name: 'Next' });
        this.locationNextButton = page.locator('[data-testid="flow.rental-creation.location.footer.primary-cta"]');
        this.countryDropdown = page.locator('[data-testid="flow.rental-creation.location.country"]');
        this.addressInput = page.locator('[data-testid="flow.rental-creation.location.address-input.input"]');
        this.cityInput = page.locator('[data-testid="flow.rental-creation.location.city-input.input"]');
        this.fileInput = page.locator('[data-testid="flow.rental-creation.photos.gallery.upload-button-item.file-input"]');
        this.photoUpload = page.locator('[data-testid="flow.rental-creation.photos.upload-area"]');
        this.photoNextButton = page.locator('[data-testid="flow.rental-creation.photos.footer.primary-cta"]');
        this.basicInfoNextButton = page.locator('[data-testid="flow.rental-creation.capacity.footer.primary-cta"]');
        this.skipButton = page.locator('[data-testid="flow.rental-creation.amenities.footer.secondary-cta"]');
        this.priceInput = page.locator('[data-testid="flow.rental-creation.rates.field-name"]');
        this.priceNextButton = page.locator('[data-testid="flow.rental-creation.rates.footer.primary-cta"]');
        this.useAIButton = page.locator('[data-testid="flow.rental-creation.description.use-ai-button"]');
        this.AiNextButton = page.locator('[data-testid="flow.rental-creation.description.footer.primary-cta"]');
        this.bookingNextButton = page.locator('[data-testid="flow.rental-creation.booking-request.footer.primary-cta"]');
        this.goToDashboardButton = page.locator('[data-testid="flow.rental-creation.completed.footer.secondary-cta"]');
    }

    async clickCrossModuleButton() {
        await this.crossModuleButton.waitFor({state: 'visible'});
        await this.crossModuleButton.click();
        console.log('Cross Module Button clicked');
    }

    async clickRentals() {
        await this.rentalsButton.waitFor({ state: 'visible' });
        await this.rentalsButton.click();
        console.log('Rentals clicked');
    }

    async clickCreateRental() {
        await this.createRentalButton.waitFor({ state: 'visible' });
        await this.createRentalButton.click();
        console.log('Create Rental clicked');
    }

    async clickAddManually() {
        await this.createManuallyButton.waitFor({state: 'visible'});
        await this.createManuallyButton.click();
        console.log('Add Manually clicked');
    }

    async fillRentalName(name) {
        await this.rentalNameInput.waitFor({state: 'visible'});
        await this.rentalNameInput.fill(name);
        console.log('Rental name filled');
    }

    async fillInternalName(name) {
        await this.internalNameInput.waitFor({state: 'visible'});
        await this.internalNameInput.fill(name);
        console.log('Internal name filled');
    }

    async clickNext() {
        await this.nextButton.waitFor({state: 'visible'});
        await this.nextButton.click();
        console.log('Next clicked');
    }

    async selectCountry(country) {
        await this.countryDropdown.waitFor({state: 'visible'});
        await this.countryDropdown.selectOption(country);
        console.log('Country selected');
    }

    async fillAddress(address) {
        await this.addressInput.waitFor({state: 'visible'});
        await this.addressInput.click();
        await this.addressInput.fill('');
        await this.page.keyboard.type(address, { delay: 50 });
        
        // Wait for autocomplete suggestions
        await this.page.waitForTimeout(2000);
        
        // Try to click a suggestion if it appears
        const suggestion = this.page.locator('.pac-item, [role="option"], .suggestion-item, [data-testid*="suggestion"], [id*="suggestion"]').first();
        if (await suggestion.isVisible()) {
            await suggestion.click();
            console.log('Clicked address suggestion');
        } else {
            console.log('No visible suggestion found, using keyboard');
            await this.page.keyboard.press('ArrowDown');
            await this.page.keyboard.press('Enter');
        }
        
        // Wait for potential geocoding and auto-fill of city/zip
        await this.page.waitForTimeout(3000);
        
        const autoFilledCity = await this.cityInput.inputValue();
        console.log(`Address filled. Auto-filled city: ${autoFilledCity}`);
    }

    async fillCity(city) {
        const currentCity = await this.cityInput.inputValue();
        if (currentCity.toLowerCase() === city.toLowerCase()) {
            console.log(`City already correctly filled: ${currentCity}`);
            return;
        }

        await this.cityInput.waitFor({state: 'visible'});
        await this.cityInput.click();
        await this.cityInput.fill('');
        await this.page.keyboard.type(city, { delay: 50 });
        
        await this.page.waitForTimeout(2000);
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
        await this.page.keyboard.press('Tab');
        console.log('City filled');
    }

    async clickLocationNext() {
        console.log('Attempting to click Location Next button...');
        await this.page.waitForTimeout(2000);
        await expect(this.locationNextButton).toBeVisible();
        await expect(this.locationNextButton).toBeEnabled();
        
        await this.locationNextButton.click();
        console.log('Location Next Button clicked');

        // Check for navigation via URL or specific elements
        try {
            // Wait for URL to change or the photo area to appear
            await this.page.waitForFunction(() => window.location.href.includes('photos') || !!document.querySelector('[data-testid="flow.rental-creation.photos.upload-area"]'), { timeout: 15000 });
            console.log('Detected navigation to Photos step');
        } catch (e) {
            console.log('Did not detect navigation via URL or area test-id. Current URL:', this.page.url());
            const errorMessages = await this.page.locator('[data-testid*="error"], .error, [aria-invalid="true"]').allInnerTexts();
            if (errorMessages.length > 0) {
                console.log('Validation errors found:', errorMessages);
            }
            
            console.log('Retrying click...');
            await this.locationNextButton.click({ force: true });
            await this.page.waitForTimeout(5000);
        }
        
        // Final check for the photo upload area
        if (!(await this.photoUpload.isVisible())) {
            console.log('Photo upload area still not visible. Trying to find any upload button...');
            const uploadBtn = this.page.locator('text=upload, text=Upload').first();
            if (await uploadBtn.isVisible()) {
                 console.log('Found an alternative upload button/text');
            }
        }
    }

    async clickFileUploadIcon() {
        console.log('Starting photo upload...');
        
        // Use absolute paths for reliability
        const files = [
            path.resolve('fixtures/home1.jpg'),
            path.resolve('fixtures/home2.jpg'),
            path.resolve('fixtures/home3.jpg'),
            path.resolve('fixtures/home4.jpg'),
            path.resolve('fixtures/home5.jpg')
        ];
        
        // Wait for file input to be attached (it's often hidden)
        await this.fileInput.waitFor({state: 'attached', timeout: 10000});
        console.log('File input found, setting files...');
        
        // Set the files
        await this.fileInput.setInputFiles(files);
        console.log('Files set on input element');
        
        // Wait for upload to process - look for thumbnails or gallery items
        console.log('Waiting for photos to appear in gallery...');
        const thumbnailSelector = '[data-testid*="gallery"], [data-testid*="thumbnail"], [data-testid*="photo"], img[src*="blob:"]';
        
        try {
            await this.page.waitForSelector(thumbnailSelector, { state: 'visible', timeout: 30000 });
            const thumbnailCount = await this.page.locator(thumbnailSelector).count();
            console.log(`Success: ${thumbnailCount} photo(s) visible in gallery`);
        } catch (e) {
            console.log('Warning: Could not verify thumbnails appeared, but continuing...');
        }
        
        console.log('Waiting for Photo Next button to be enabled...');
        await expect(this.photoNextButton).toBeEnabled({ timeout: 20000 });
        console.log('Photo upload complete, Next button ready');
    }

    async clickPhotoNextButton() {
        await this.photoNextButton.waitFor({state: 'visible'});
        await expect(this.photoNextButton).toBeEnabled({ timeout: 10000 });
        await this.photoNextButton.click();
        console.log('Photo Next clicked');
    }

    async clickBasicInfoNextButton() {
        await this.basicInfoNextButton.waitFor({state: 'visible'});
        await this.basicInfoNextButton.click();
        console.log('Basic Info Next clicked');
    }

    async clickSkipButton() {
        await this.skipButton.waitFor({state: 'visible'});
        await this.skipButton.click();
        console.log('Skip clicked');
    }

    async fillPrice(price) {
        await this.priceInput.waitFor({state: 'visible'});
        await this.priceInput.click();
        await this.priceInput.fill('');
        await this.priceInput.fill(price);
        await this.priceInput.press('Tab');
        await this.page.waitForTimeout(1000);
        console.log('Price filled and validated');
    }

    async clickPriceNextButton() {
        console.log('Attempting to click Price Next button...');
        await this.page.waitForTimeout(2000);
        await expect(this.priceNextButton).toBeVisible();
        await expect(this.priceNextButton).toBeEnabled();
        
        await this.priceNextButton.scrollIntoViewIfNeeded();
        await this.priceNextButton.click();
        console.log('Price Next Button clicked');
        await this.useAIButton.waitFor({ state: 'visible', timeout: 15000 });
        console.log('Successfully moved to Description step');
    }

    async clickUseAIButton() {
        await this.useAIButton.waitFor({state: 'visible'});
        await this.useAIButton.click();
        console.log('Use AI clicked');
        await this.page.waitForTimeout(10000);
    }

    async clickAiNextButton() {
        await this.AiNextButton.waitFor({state: 'visible'});
        await this.AiNextButton.click();
        console.log('AI Next clicked');
    }

    async clickBookingNextButton() {
        await this.bookingNextButton.waitFor({state: 'visible'});
        await this.bookingNextButton.click();
        console.log('Booking Next clicked');
    }

    async clickGoToDashboardButton() {
        await this.goToDashboardButton.waitFor({state: 'visible'});
        await this.goToDashboardButton.click();
        console.log('Go To Dashboard clicked');
    }
}