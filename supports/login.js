import { By } from 'selenium-webdriver';
import { baseUrl, ptuAuthEmail, ptuAuthPassword, ftuAuthEmail, ftuAuthPassword, adminAuthEmail, adminAuthPassword } from "../utils/config";

export const doLogin = async (driver, { email, password }) => {
  await driver.get(baseUrl);
  await driver.findElement(By.css('.navbar .login')).click();
  await driver.findElement(By.css('#login-email')).sendKeys(email);
  await driver.findElement(By.css('#login-password')).sendKeys(password);
  await driver.findElement(By.css('#login-form .approve')).click();
  await driver.sleep(2000);
}

export const doAuthentication = async (driver, userType) => {
  let email;
  let password;
  if (userType === 'admin') {
    email = adminAuthEmail;
    password = adminAuthPassword;
  } else if (userType === 'ptu') {
    email = ptuAuthEmail;
    password = ptuAuthPassword;
  } else if (userType === 'ftu') {
    email = ftuAuthEmail;
    password = ftuAuthPassword;
  } else {
    throw new Error("User type not found");
  }

  await doLogin(driver, {
    email: email,
    password: password,
  });
}
