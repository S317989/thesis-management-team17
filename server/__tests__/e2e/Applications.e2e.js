const request = require("supertest");
const app = require("../../index");

const { Builder, By, until } = require("selenium-webdriver");

describe("End to end tests for list of applications", () => {

  async function isElementVisible(selector) {
    try {
      const element = await driver.findElement(By.css(selector));
      return await element.isDisplayed();
    } catch (error) {
      // If the element is not found, consider it not visible
      return false;
    }
  }
  
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

    const submitButton = await driver.findElement(By.css("button.c1939bbc3.cc78b8bf3.ce1155df5.c1d2ca6e3.c331afe93"));

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
    const isNavbarCollapsed = await isElementVisible('.navbar-toggler-icon');

    if (!isNavbarCollapsed) {
      // Navbar is not collapsed, click the "Logout" link directly
      const logoutLinkButton = await driver.findElement(By.css('#link-logout-navbar-button'));

      await logoutLinkButton.click();
    } else {
      // Navbar is collapsed, trigger the collapse by clicking the hamburger menu icon
      const hamburgerMenuIcon = await driver.findElement(By.css('.navbar-toggler-icon'));
      await hamburgerMenuIcon.click();

      // Explicit wait for the menu to be fully expanded (adjust timeout as needed)
      await driver.wait(until.elementLocated(By.css('.nav-item')), 5000);

      // Now locate and click the "Logout" link
      const logoutLinkButton = await driver.findElement(By.id('link-logout-navbar-button'));
      await logoutLinkButton.click();
    }

  }
 //try to use wait instead of sleep for better synchro
  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test("Should show list of applications after clicking on Applications tab in the navbar and see info applications opening a modal", async () => {
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
     //const currentUrl = await driver.getCurrentUrl();
     await driver.wait(until.urlContains("/browse-applications"), 5000);

      // Verify the presence of a specific table on the page
      const tableElement = await driver.findElement(By.id('applications-table'));

      // Check if the table element is present
      await driver.wait(until.elementIsVisible(tableElement), 5000);

     // Assuming driver is your Selenium WebDriver instance
      const infoIcon = await driver.findElement(By.css('.info-icon'));

      // Click the info icon
      await infoIcon.click();

    // Wait for some time (you can replace this with proper waits)
    await driver.sleep(1000);

    // Check if the modal is visible
    const modalContent = await driver.findElement(By.css(".modal-content"));

    // Check if the modal content is visible
    const isModalVisible = await modalContent.isDisplayed();
    expect(isModalVisible).toBe(true);

    const closeButton = await driver.findElement(By.css(".modal-header [aria-label='Close']"));
    await closeButton.click();

    await driver.sleep(1000);

  // Check if the modal is no longer visible
  expect(await isElementVisible("proposal-modal-id")).toBe(false);



      await doLogout();
    
  }, 20000);

});