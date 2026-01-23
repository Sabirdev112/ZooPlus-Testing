export class SearchPage {
    constructor(page) {
        this.page = page;
        this.searchInput = page.locator('[data-testid="rentals-list.search-bar.search"]');
        this.rentalsButton = page.locator('span[data-ui-mitem-title="true"]', { hasText: 'Rentals' });
    }

    async clickRentalsButton(){
        await this.rentalsButton.waitFor({state: 'visible'})
        await this.rentalsButton.click();
        console.log('Rentals button clicked');
    }

    async search(name){
        await this.searchInput.waitFor({state: 'visible'})
        await this.searchInput.fill(name);
        await this.page.waitForTimeout(5000);
        console.log('Search input filled');
    }
}