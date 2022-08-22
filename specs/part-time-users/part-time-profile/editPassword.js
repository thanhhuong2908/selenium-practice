import { By, until } from 'selenium-webdriver';
import { expect } from 'chai';

import { baseUrl } from '../../../utils/config';
import { buildDriver } from '../../../utils/browser';
import { doAuthentication } from '../../../supports/login';

describe('part-time-users/part-time-profile/editPassword', () => {
  let driver;

  before(async () => {
    driver = await buildDriver();
    await doAuthentication(driver, 'ptu');
  });

  after(async () => {
    await driver.quit();
  });

  context('fail', async () => {
    const currentPass = '123456';
    const newPass = '123456';
    const confirmPass = '654321';
    const errorMessage = "doesn't match Password";

    it('updates password fail', async () => {
      await driver.get(`${baseUrl}/users_panel/profiles/edit_password`);
      await driver.findElement(By.css('#user_current_password')).sendKeys(currentPass);
      await driver.findElement(By.css('#user_password')).sendKeys(newPass);
      await driver.findElement(By.css('#user_password_confirmation')).sendKeys(confirmPass);
      await driver.findElement(By.css('form .btn-update')).click();

      const messageText = await driver.findElement(By.css('#error-explanation')).getText();
      expect(messageText).to.contain(errorMessage);
    });
  });

  context('success', async () => {
    const currentPass = '123456';
    const newPass = '123456';
    const confirmPass = '123456';
    //const errorBlock = 'You must login first to continue.';

    it('updates password success', async () => {
      await driver.get(`${baseUrl}/users_panel/profiles/edit_password`);
      await driver.findElement(By.css('#user_current_password')).sendKeys(currentPass);
      await driver.findElement(By.css('#user_password')).sendKeys(newPass);
      await driver.findElement(By.css('#user_password_confirmation')).sendKeys(confirmPass);
      await driver.findElement(By.css('form .btn-update')).click();
    //   await driver.get(`${baseUrl}`);
      await driver.sleep(300);

      const error = await driver.findElement(By.css('#login-form .error-block')).getText();
      expect(error).to.equal('You must login first to continue.');
    //driver.wait(until.urlIs(`${baseUrl}`));

    });
  });
});
