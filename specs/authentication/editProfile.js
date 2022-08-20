import { By } from 'selenium-webdriver';
import { expect } from 'chai';

import { baseUrl } from '../../utils/config';
import { buildDriver } from '../../utils/browser';
import { doAuthentication } from '../../supports/login';

describe('authentication/editProfile', () => {
  let driver;

  before(async () => {
    driver = await buildDriver();
    await doAuthentication(driver, true);
  });

  after(async () => {
    await driver.quit();
  });

  context('success', async () => {
    const updatedFirstName = 'New First Name';

    it('updates user information', async () => {
      await driver.get(`${baseUrl}/users_panel/profiles/edit`);
      await driver.findElement(By.css('#user_first_name')).clear();
      await driver.findElement(By.css('#user_first_name')).sendKeys(updatedFirstName);
      await driver.findElement(By.css('form .btn-update')).click();

      //await driver.get(`${baseUrl}/users_panel/profiles`);

      const profileText = await driver.findElement(By.css('.user-profiles')).getText();
      expect(profileText).to.contain(updatedFirstName);
    });
  });
// Case fail
//   context('failure', async () => {
//     const updatedFirstName = 'New First Name';

//     it('updates user information', async () => {
//       await driver.get(`${baseUrl}/users_panel/profiles/edit`);
//       await driver.findElement(By.css('#user_first_name')).clear()
//       await driver.findElement(By.css('#user_first_name')).sendKeys(updatedFirstName);
//       await driver.findElement(By.css('form .btn-update')).click();

//       await driver.get(`${baseUrl}/users_panel/profiles`);

//       const profileText = await driver.findElement(By.css('.user-profiles')).getText();
//       expect(profileText).to.contain(updatedFirstName);
//     });
//   });
});
