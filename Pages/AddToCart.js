export class addToCartPage {
    constructor(page) {
        this.page = page;
        this.searchBar = page.locator('xpath = //*[@id="search_query_field_desktop"]');
        this.productButton = page.locator('[data-zta="product-link"]').first();
        this.addToCartButton = page.locator('[data-zta="SelectedArticleBox__AddToCartButton"]');
    }

    async searchProduct(productName) {
        await this.searchBar.waitFor({ state: 'visible' });
        await this.searchBar.click();
        await this.searchBar.type(productName, { delay: 50 });
        await this.page.keyboard.press('Enter');
        console.log('Product searched');
    }

    async clickProduct() {
        await this.productButton.waitFor({ state: 'visible' });
        await this.productButton.click();
        console.log('Product clicked');
    }

    async addToCart() {
        await this.addToCartButton.waitFor({ state: 'visible' });
        await this.addToCartButton.click();
        console.log('Product added to cart');
    }
}