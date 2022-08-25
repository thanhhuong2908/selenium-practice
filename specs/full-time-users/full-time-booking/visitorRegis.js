import { By, Actions } from 'selenium-webdriver';
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
  //   const dateArrival = '25/08/2022';
  //   const timeArrival = '9:00am';
  //   const endTimeArrival = '10:00am';
  //   const visitorName = 'New';
  //   const lastName = 'Guest';
  //   const flashNotice = 'Visitors have been created successfully.';

  //   it.only('add visitor success', async () => {
  //     await driver.findElement(By.css('a[href*="users_panel/visitors"]')).click();
  //     await driver.findElement(By.css('button[data-target="#new-visitor-modal"]')).click();
  //     await driver.sleep(3000);
  //     await driver.findElement(By.css('#arrival_date')).click();
  //     await driver.sleep(200);
  //     const a = await driver.findElement(By.css('td.undefined > a'));
  //     await driver.actions().click(a).perform();
    
      
  //     // console.log(await a.getAttribute('outerHTML'));
  //     // await a.click(); 
  //     await driver.sleep(3000);
  //     await driver.findElement(By.css('#arrival_time')).click();
  //     // await driver.findElement(By.css('#end_time')).sendKeys(endTimeArrival);
  //     // await driver.findElement(By.css('#visitor_name')).sendKeys(visitorName);
  //     // await driver.findElement(By.css('#visitor_name')).sendKeys(lastName);
  //     // await driver.sleep(3000);
  //     // await driver.findElement(By.css('.create-button')).click();

  //     // const flashText = await driver.findElement(By.css('#flash_notice')).getText();
  //     // expect(flashText).to.contain(flashNotice);
  //   });
  // });

  context('fail', async () => {
    const dateArrival = '25/08/2022';
    const timeArrival = '9:00am';
    const endTimeArrival = '10:00am';

    it('add visitor fail with first name is blank', async () => {
      //await driver.get(`${baseUrl}/users_panel/visitors`);

      await driver.findElement(By.css('a[href*="users_panel/visitors"]')).click();
      await driver.findElement(By.css('button[data-target="#new-visitor-modal"]')).click();
      await driver.sleep(3000);
      //console.log(await nut.getAttribute('outerHTML'));
      await driver.findElement(By.css('#arrival_date')).sendKeys(dateArrival);
      await driver.findElement(By.css('#arrival_time')).sendKeys(timeArrival);
      await driver.findElement(By.css('#end_time')).sendKeys(endTimeArrival);

      await driver.sleep(3000);
      await driver.findElement(By.css('.create-button')).click();

      const errorText = await driver.findElement(By.css('input:invalid')).getText();
       expect(errorText).to.equal('');
    });
  });
});
