import { expect } from '@playwright/test';

export class Login {
  constructor(page) {
    this.page = page;

    // this.cookiesButton = page.locator('#onetrust-accept-btn-handler');
    this.acceptCookiesButton = page.locator('#onetrust-accept-btn-handler');
    this.profileButton = page.locator('a').filter({ hasText: 'my zooplus' }).first();
    this.emailInput = page.getByRole('textbox', { name: 'Email address' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.signInButton = page.getByRole('button', { name: 'Log in' });
    this.logoutButton = page.locator('[data-testid="user-menu.text-exit.text"]');
  }
 
  async goto() {
    await this.page.goto('https://www.zooplus.com/');
  }

  async clickAcceptCookies() {
    await this.acceptCookiesButton.waitFor({ state: 'visible' });
    await this.acceptCookiesButton.click();
    console.log('Cookies accepted');
  }

  async clickProfile() {
    await this.profileButton.waitFor({ state: 'visible' });
    await this.profileButton.click();
    console.log('Profile menu clicked');
  }

  async login(email, password) {
    await this.emailInput.waitFor({ state: 'visible' });
    await this.emailInput.type(email, {delay: 50});

    await this.passwordInput.waitFor({ state: 'visible' });
    await this.passwordInput.type(password, {delay: 50});

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
