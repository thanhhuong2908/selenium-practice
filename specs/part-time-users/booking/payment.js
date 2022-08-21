import { By, until } from 'selenium-webdriver';
import { expect } from 'chai';

import { baseUrl } from '../../../utils/config';
import { buildDriver } from '../../../utils/browser';
import { doAuthentication } from '../../../supports/login';

describe('booking/payment', () => {
  let driver;

  before(async () => {
    driver = await buildDriver();
    await doAuthentication(driver);
  });

  after(async () => {
    await driver.quit();
  });

  context('success', async () => {
    const flashNotice = 'Card info was added';

    it('add new payment success', async () => {
      await driver.get(`${baseUrl}/users_panel/payments`);
      await driver.findElement(By.css("a[href*='users_panel/payments?location_id=5b53370c6909ad58b84886ad']")).click();
      await driver.findElement(By.id("payment_card_name")).sendKeys("Visa");
        await driver.findElement(By.id("payment_card_number")).sendKeys("4111");
        await driver.findElement(By.id("payment_card_number")).sendKeys("1111");
        await driver.findElement(By.id("payment_card_number")).sendKeys("1111");
        await driver.findElement(By.id("payment_card_number")).sendKeys("1111");
        await driver.findElement(By.id("payment_card_expiry_date")).sendKeys("12");
        await driver.findElement(By.id("payment_card_expiry_date")).sendKeys("25");
        await driver.findElement(By.id("payment_card_cvc")).sendKeys("123");
        await driver.findElement(By.id("user_billing_full_name")).sendKeys("Selina");
        await driver.findElement(By.id("user_billing_state")).sendKeys("Ho Chi Minh");
        await driver.findElement(By.id("user_billing_address")).sendKeys("538 CMT8 Street");
        await driver.findElement(By.id("user_billing_zip")).sendKeys("700000");
        await driver.findElement(By.id("user_billing_phone")).sendKeys("123456789");
        await driver.findElement(By.id("user_billing_country")).sendKeys("Viet Nam");
        await driver.findElement(By.id("user_billing_city")).sendKeys("HCM");
        await driver.findElement(By.className("btn btn-default btn-add confirm-button button-confirm preloader-button")).click();
        await driver.sleep(2000);

        const messageSuccess = await driver.findElement(By.css('#flash_notice')).getText();
        expect(messageSuccess).to.contain(flashNotice);
    });
  });

  context('fail', async () => {
    const flashError = "Your card's expiration year is invalid.";

    it('add new payment fail', async () => {
      await driver.get(`${baseUrl}/users_panel/payments`);
      await driver.findElement(By.css("a[href*='users_panel/payments?location_id=5b53370c6909ad58b84886ac']")).click();
      await driver.findElement(By.id("payment_card_name")).sendKeys("Visa");
        await driver.findElement(By.id("payment_card_number")).sendKeys("4111");
        await driver.findElement(By.id("payment_card_number")).sendKeys("1111");
        await driver.findElement(By.id("payment_card_number")).sendKeys("1111");
        await driver.findElement(By.id("payment_card_number")).sendKeys("1111");
        await driver.findElement(By.id("payment_card_expiry_date")).sendKeys("12");
        await driver.findElement(By.id("payment_card_expiry_date")).sendKeys("20");
        await driver.findElement(By.id("payment_card_cvc")).sendKeys("123");
        await driver.findElement(By.id("user_billing_full_name")).sendKeys("Selina");
        await driver.findElement(By.id("user_billing_state")).sendKeys("Ho Chi Minh");
        await driver.findElement(By.id("user_billing_address")).sendKeys("538 CMT8 Street");
        await driver.findElement(By.id("user_billing_zip")).sendKeys("700000");
        await driver.findElement(By.id("user_billing_phone")).sendKeys("123456789");
        await driver.findElement(By.id("user_billing_country")).sendKeys("Viet Nam");
        await driver.findElement(By.id("user_billing_city")).sendKeys("HCM");
        await driver.findElement(By.className("btn btn-default btn-add confirm-button button-confirm preloader-button")).click();
        await driver.sleep(2000);

        const messageFail = await driver.findElement(By.css('#error-explanation')).getText();
        expect(messageFail).to.contain(flashError);
    });
  });
});
