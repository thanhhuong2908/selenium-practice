import { By } from 'selenium-webdriver';
import { expect } from 'chai';

import { baseUrl } from '../../../utils/config';
import { buildDriver } from '../../../utils/browser';
import { doAuthentication } from '../../../supports/login';

describe('booking/meetingRoomBooking', () => {
  let driver;

  before(async () => {
    driver = await buildDriver();
    await doAuthentication(driver);
  });

  after(async () => {
    await driver.quit();
  });

  context('success', async () => {
    const flashNotice = 'Booking success.';

    it('book meeting room success with exist payment', async () => {
      await driver.get(`${baseUrl}/users_panel/bookings`);
      await driver.findElement(By.css('#city>option[value="sg"]')).click();
      await driver.findElement(By.css('#location>option[value="PVS"]')).click();
      await driver.findElement(By.css('div[data-start-time="02:30PM"]')).click();
      await driver.sleep(3000);
      await driver.findElement(By.className("btn btn-default btn-confirm-booking bold-title")).click();
      await driver.sleep(3000);
      await driver.findElement(By.css(".confirm-form .confirm-button")).click();
      await driver.sleep(3000);
      await driver.findElement(By.css('.confirm-form .cancel-button')).click();

      const flashText = await driver.findElement(By.css('#flash_alert')).getText();
      expect(flashText).to.contain(flashNotice);
    });
  });

  context('fail', async () => {
    const flashNotice = 'Please create your card to process the payment.';

    it('book meeting room fail with no payment card', async () => {
      await driver.get(`${baseUrl}/users_panel/bookings`);
      await driver.findElement(By.css('#city>option[value="sg"]')).click();
      await driver.findElement(By.css('#location>option[value="ASQ"]')).click();
      await driver.findElement(By.css('div[data-start-time="02:30PM"]')).click();
      await driver.sleep(3000);
      await driver.findElement(By.className("btn btn-default btn-confirm-booking bold-title")).click();
      await driver.sleep(3000);
      await driver.findElement(By.css(".confirm-form .confirm-button")).click();
      await driver.sleep(3000);
     
      const flashText = await driver.findElement(By.css('#flash_notice')).getText();
      expect(flashText).to.contain(flashNotice);
    });
  });
});
