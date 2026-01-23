import { expect } from '@playwright/test';

export class Login {
  constructor(page) {
    this.page = page;

    // this.cookiesButton = page.locator('#onetrust-accept-btn-handler');
 
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.signInButton = page.getByRole('button', { name: 'Login' });
    this.crossModuleButton  = page.getByRole('button', { name: 'Close' });
    this.sidebarbutton = page.locator('svg[data-icon-name="AngleDoubleRight"]');
    this.profile = page.locator('button:has([data-navigation-user-name="true"])');
    this.logoutButton = page.locator('[data-testid="user-menu.text-exit.text"]');
  }
 
  async goto() {
    await this.page.goto('https://app.lodgify.com/');
  }

  async clickCrossModuleButton() {
    await this.crossModuleButton.waitFor({ state: 'visible' });
    await this.crossModuleButton.click();
    console.log('Cross Module Button clicked');
  }

  async clickProfile() {
    await this.profile.click();
    console.log('Profile menu clicked');
  }

  async clickSidebarButton() {
    await this.sidebarbutton.waitFor({ state: 'visible' });
    await this.sidebarbutton.click();
    console.log('Sidebar button clicked');
  }


  async login(email, password) {
    await this.emailInput.waitFor({ state: 'visible' });
    await this.emailInput.fill(email);

    await this.passwordInput.waitFor({ state: 'visible' });
    await this.passwordInput.fill(password);

    await this.passwordInput.blur();
  }

  async clickSignIn() {
    await this.signInButton.click();
    await this.page.waitForTimeout(5000);
    console.log('Login successful.');
  }

  async clickLogout() {
    await this.logoutButton.waitFor({ state: 'visible' });
    await this.logoutButton.click();
    await this.page.waitForLoadState('networkidle');
    console.log('Logout successful.');
  }
}
