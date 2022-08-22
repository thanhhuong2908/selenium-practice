import { By } from 'selenium-webdriver';
import { expect } from 'chai';

import { baseUrl } from '../../../utils/config';
import { buildDriver } from '../../../utils/browser';
import { doAuthentication } from '../../../supports/login';

describe('full-time-users/full-time-booking/bookMeetingRoom', () => {
  let driver;

  before(async () => {
    driver = await buildDriver();
    await doAuthentication(driver, 'ftu');
  });

  after(async () => {
    await driver.quit();
  });

  context('success', async () => {
    const flashNotice = 'Booking success.';

    it('book meeting room success with exist payment', async () => {
      await driver.get(`${baseUrl}/users_panel/bookings`);
      await driver.findElement(By.css('#city>option[value="sg"]')).click();
      await driver.findElement(By.css('#location>option[value="DT"]')).click();
      const timeLine = await driver.findElements(By.css('#timeline_booking_5959eb746909ad5527eb96e5 .column-booking'));
      let selectedSlot;
      for(let i = 0; i < timeLine.length; i++){
        const slot = timeLine[i];
        const classes = await slot.getAttribute('class');
        if (classes.includes('col-active')){
          selectedSlot = slot;
          break;
        }
      }
      if(selectedSlot == undefined){
        return ;
      }
      await selectedSlot.click();
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
      const timeLine = await driver.findElements(By.css('#timeline_booking_5c831fdf6909ad7a8c9a17c3 .column-booking'));
      let selectedSlot;
      for(let i = 0; i < timeLine.length; i++){
        const slot = timeLine[i];
        const classes = await slot.getAttribute('class');
        if (classes.includes('col-active')){
          selectedSlot = slot;
          break;
        }
      }
      if(selectedSlot == undefined){
        return ;
      }
      await selectedSlot.click();
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
