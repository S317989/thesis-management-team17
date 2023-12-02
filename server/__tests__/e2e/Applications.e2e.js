const request = require("supertest");
const app = require("../../app");

const { Builder, By, until } = require("selenium-webdriver");

describe("End to end tests for list of applications", () => {
  let driver;
  let baseURL = `http://localhost:5173`;

  const doLogin = async () => {
    await driver.get(baseURL);

    await driver.sleep(1000);

    // perform login
    let usernameBox = await driver.findElement(By.id("username"));
    usernameBox.clear();
    usernameBox.sendKeys("d12571@polito.it");
    let passwordBox = await driver.findElement(By.id("password"));
    passwordBox.clear();
    passwordBox.sendKeys("d12571");

    await driver.sleep(1000);

    const submitButton = await driver.findElement(By.css("button.c480bc568"));

    // remove disabled property from button
    await driver.executeScript(
      "arguments[0].removeAttribute('disabled')",
      submitButton
    );

    // click submit button with js
    await submitButton.click();

    await driver.sleep(1000);

    await driver.get(baseURL);

    await driver.sleep(1000);
  };

  const doLogout = async () => {
    // click on the drop menu
    const logoutDropdown = await driver.findElement(By.id("dropdown-basic"));
    await logoutDropdown.click();

    // click on logout
    const logout = await driver.findElement(By.id("logout-id"));
    await logout.click();

    await driver.sleep(1000);
  }

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test("Should show list of applications after clicking on Applications tab in the navbar", async () => {
    await doLogin();

    await driver.get(baseURL);

    await driver.sleep(1000);

     // Find the "Applications" link by its text
     const applicationsLink = await driver.findElement(By.linkText('Applications'));

     // Click the "Applications" link
     await applicationsLink.click();
 
     // Wait for some time (you can replace this with proper waits)
     await driver.sleep(1000);
 
     // Assert that the navigation to the correct route occurred
     const currentUrl = await driver.getCurrentUrl();
     expect(currentUrl).toContain("/browse-applications");

      await doLogout();
    
  }, 20000);

});