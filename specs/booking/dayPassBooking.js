import { By } from 'selenium-webdriver';
import { expect } from 'chai';

import { baseUrl } from '../../utils/config';
import { buildDriver } from '../../utils/browser';
import { doAuthentication } from '../../supports/login';

describe('booking/dayPassBooking', () => {
  let driver;

  before(async () => {
    driver = await buildDriver();
    await doAuthentication(driver);
  });

  after(async () => {
    await driver.quit();
  });

  context('success', async () => {
    const flashNotice = 'You have successfully purchased the hot desk.';

    it('book daypass success with exist payment', async () => {
      await driver.get(`${baseUrl}/users_panel/bookings/workspace`);
      await driver.findElement(By.css('#city>option[value="sg"]')).click();
      await driver.findElement(By.css('#location>option[value="CG"]')).click();
      await driver.findElement(By.className('btn workspace-btn button-confirm bold-title')).click();
      await driver.findElement(By.css('.btn-confirm-booking')).click();
      await driver.sleep(300);

      const flashText = await driver.findElement(By.css('#flash_notice')).getText();
      expect(flashText).to.contain(flashNotice);
    });
  });

  context('fail', async () => {
    const flashNotice = 'Please create your card to process the payment.';

    it('booking workspace fails with no payment card.', async () => {
      await driver.get(`${baseUrl}/users_panel/bookings/workspace`);
      await driver.findElement(By.css('#city>option[value="sg"]')).click();
      await driver.findElement(By.css('#location>option[value="ASQ"]')).click();
      await driver.findElement(By.className('btn workspace-btn button-confirm bold-title')).click();
      await driver.findElement(By.css('.btn-confirm-booking')).click();
      await driver.sleep(300);

      const flashAlert = await driver.findElement(By.css('#flash_alert')).getText();
      expect(flashAlert).to.contain(flashNotice);
    });
  });
});
