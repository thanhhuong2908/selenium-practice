import { By } from 'selenium-webdriver';
import { expect } from 'chai';

import { baseUrl } from '../../../utils/config';
import { buildDriver } from '../../../utils/browser';
import { doAuthentication } from '../../../supports/login';

describe('full-time-users/full-time-booking/visitorRegis', () => {
  let driver;

  before(async () => {
    driver = await buildDriver();
    await doAuthentication(driver, 'ftu');
  });

  after(async () => {
    await driver.quit();
  });

  // context('success', async () => {
  //   const dateArrival = '23/08/2022';
  //   const timeArrival = '9:00am';
  //   const endTimeArrival = '10:00am';
  //   const visitorName = 'New';
  //   const lastName = 'Guest';
  //   const flashNotice = 'Visitors have been created successfully.';

  //   it('add visitor success', async () => {
  //     await driver.get(`${baseUrl}/users_panel/visitors`);
  //     await driver.findElement(By.css('#new-visitor-modal')).click();
  //     await driver.findElement(By.css('#arrival_date')).senKey(dateArrival);
  //     await driver.findElement(By.css('#arrival_time')).senKey(timeArrival);
  //     await driver.findElement(By.css('#end_time')).senKey(endTimeArrival);
  //     await driver.findElement(By.css('#visitor_name')).senKey(visitorName);
  //     await driver.findElement(By.css('#visitor_name')).senKey(lastName);
  //     await driver.sleep(3000);
  //     await driver.findElement(By.css('.create-button')).click();

  //     const flashText = await driver.findElement(By.css('#flash_notice')).getText();
  //     expect(flashText).to.contain(flashNotice);
  //   });
  // });

  context('fail', async () => {
    const dateArrival = '23/08/2022';
    const timeArrival = '9:00am';
    const endTimeArrival = '10:00am';

    it.only('add visitor fail with first name is blank', async () => {
      await driver.get(`${baseUrl}/users_panel/visitors`);
      await driver.findElement(By.xpath('/html/body/div[1]/section[1]/div[3]/button')).click();
      await driver.sleep(3000);
      console.log(await nut.getAttribute('outerHTML'));
      // await driver.findElement(By.css('#arrival_date')).sendKeys(dateArrival);
      // await driver.findElement(By.css('#arrival_time')).sendKeys(timeArrival);
      // await driver.findElement(By.css('#end_time')).sendKeys(endTimeArrival);

      // await driver.sleep(3000);
      // await driver.findElement(By.css('.create-button')).click();

      // const errorText = await driver.findElement(By.css('input:invalid')).getText();
      //   expect(errorText).to.equal('');
    });
  });
});
