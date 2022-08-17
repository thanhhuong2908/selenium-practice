import { By } from 'selenium-webdriver';
import { expect } from 'chai';

import { buildDriver } from '../../utils/browser';
import { baseUrl, authEmail, authPassword } from '../../utils/config';
import { doLogin } from '../../supports/login';

describe('authentication/login', () => {
  let driver;

  beforeEach(async () => {
    driver = await buildDriver();
  });

  afterEach(async () => {
    await driver.quit();
  });

  context('with invalid credentials', async () => {
    const email = 'wrong@gmail.com';
    const password = 'wrongpwd';

    it('shows errors', async () => {
      await doLogin(driver, { email, password });

      const error = await driver.findElement(By.css('#login-form .error-block')).getText();
      expect(error).to.equal('Email or password is invalid!');
    });
  });

  context('with valid credentials', async () => {
    const email = authEmail;
    const password = authPassword;

    it('allows user access to dashboard', async () => {
      await doLogin(driver, { email, password });
      await driver.get(`${baseUrl}/users_panel/profiles`);

      const profileText = await driver.findElement(By.css('.user-profiles')).getText();
      expect(profileText).to.contain(email);
    });
  });
});
