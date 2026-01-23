import {test} from '@playwright/test';
import {Login} from '../Pages/Login.js';
import {loadCredentials} from '../support/credentials.helper.js';

const user = loadCredentials()[0]; 
test ('User logs in successfully', async ({page}) => {
  const login = new Login (page);

  await login.goto();
  await login.login(user.email, user.password);
  await login.clickSignIn();
  await login.clickCrossModuleButton();
  await login.clickSidebarButton();
  await login.clickProfile();
  await login.clickLogout();
  
});