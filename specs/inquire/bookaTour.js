import { By } from 'selenium-webdriver';
import { expect } from 'chai';

import { buildDriver } from '../../utils/browser';
import { baseUrl, authEmail, authPassword } from '../../utils/config';
import { doLogin } from '../../supports/login';

describe('inquire/bookaTour', () => {
  let driver;

  beforeEach(async () => {
    driver = await buildDriver();
  });

  afterEach(async () => {
    await driver.quit();
  });

  context('submit success', async () => {
    const nameVisitor = 'Selina Part-Time';
    const companyVS = 'Golden Owl';
    const phoneVS = '1111111111';
    const emailVS = 'selina.pt@mailinator.com';
    const noteVS = 'selenium demo';
    it('Visitor submit success', async () => {
        await driver.get(`${baseUrl}`);
        await driver.findElement(By.css('.visit-us')).click();
        await driver.findElement(By.css('#name')).sendKeys(nameVisitor);
        await driver.findElement(By.css('#company')).sendKeys(companyVS);
        await driver.findElement(By.css('#phone')).sendKeys(phoneVS);
        await driver.findElement(By.css('#email')).sendKeys(emailVS);
        await driver.findElement(By.css('#visit-us-cities-selectized')).click();
        await driver.findElement(By.css('#book-a-tour div.city-selectize .my-selectize-item[data-value="sg"] input.p-checkbox')).click();
        await driver.sleep(3000);
        await driver.findElement(By.css('#visit-us-products-selectized')).click();
        await driver.sleep(3000);
        await driver.findElement(By.css('#book-a-tour div.product-selectize .my-selectize-item[data-value="ms"] input.p-checkbox')).click();
        await driver.findElement(By.css('#note')).sendKeys(noteVS);
        await driver.findElement(By.css("#book-a-tour .submit-line button")).click();
        await driver.sleep(2000);
        const thankYouText = await driver.findElement(By.css('.thank-you-modal > .body > .title')).getText();
        expect(thankYouText).to.equal('Thank you for your inquiry.');
    });
  });

  context('submit fail', async () => {
    const companyVS = 'Golden Owl';
    const phoneVS = '1111111111';
    const emailVS = 'selina.pt@mailinator.com';
    const noteVS = 'selenium demo';
    it('Visitor submit with name field is blank', async () => {
        await driver.get(`${baseUrl}`);
        await driver.findElement(By.css('.visit-us')).click();
        await driver.findElement(By.css('#company')).sendKeys(companyVS);
        await driver.findElement(By.css('#phone')).sendKeys(phoneVS);
        await driver.findElement(By.css('#email')).sendKeys(emailVS);
        await driver.findElement(By.css('#visit-us-cities-selectized')).click();
        await driver.findElement(By.css('#book-a-tour div.city-selectize .my-selectize-item[data-value="sg"] input.p-checkbox')).click();
        await driver.sleep(3000);
        await driver.findElement(By.css('#visit-us-products-selectized')).click();
        await driver.sleep(3000);
        await driver.findElement(By.css('#book-a-tour div.product-selectize .my-selectize-item[data-value="ms"] input.p-checkbox')).click();
        await driver.findElement(By.css('#note')).sendKeys(noteVS);
        await driver.findElement(By.css("#book-a-tour .submit-line button")).click();
        await driver.sleep(2000);
        const errorText = await driver.findElement(By.css('input:invalid')).getText();
        expect(errorText).to.equal('');
    });
  });
});
