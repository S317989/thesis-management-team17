const request = require("supertest");
const app = require("../../index");

const { Builder, By, Key, until } = require("selenium-webdriver");

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

  async function checkAndCollapseNavbar() {
    const isNavbarCollapsed = await isElementVisible('.navbar-toggler-icon');
    if (isNavbarCollapsed) {
      const hamburgerMenuIcon = await driver.findElement(By.css('.navbar-toggler-icon'));
      await hamburgerMenuIcon.click();
    }
  }

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

  async function doLogout() {
    await checkAndCollapseNavbar();

    const logoutLinkButton = await driver.findElement(By.css('#link-logout-navbar-button'));
    await logoutLinkButton.click();
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
    await checkAndCollapseNavbar();

    await driver.sleep(1000);
      // Explicit wait for the menu to be fully expanded (adjust timeout as needed)
      await driver.wait(until.elementLocated(By.css('.nav-link')), 5000);


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

describe("End to end tests for list of All Proposals", () => {

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

  async function checkAndCollapseNavbar() {
    const isNavbarCollapsed = await isElementVisible('.navbar-toggler-icon');
    if (isNavbarCollapsed) {
      const hamburgerMenuIcon = await driver.findElement(By.css('.navbar-toggler-icon'));
      await hamburgerMenuIcon.click();
    }
  }

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

  async function doLogout() {
    await checkAndCollapseNavbar();

    const logoutLinkButton = await driver.findElement(By.css('#link-logout-navbar-button'));
    await logoutLinkButton.click();
  }
 //try to use wait instead of sleep for better synchro
  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test("Should show list of thesis proposals, open cards, filter and close", async () => {
    await doLogin();

    await driver.get(baseURL);
    await checkAndCollapseNavbar();

    await driver.sleep(1000);
      // Explicit wait for the menu to be fully expanded (adjust timeout as needed)
      await driver.wait(until.elementLocated(By.css('.nav-link')), 5000);


     // Find the "Applications" link by its text
     const proposalsLink = await driver.findElement(By.linkText('All Proposals'));

     // Click the "Applications" link
     await proposalsLink.click();
 
     // Wait for some time (you can replace this with proper waits)
     await driver.sleep(1000);
 
     // Assert that the navigation to the correct route occurred
     //const currentUrl = await driver.getCurrentUrl();
     await driver.wait(until.urlContains("/browse-proposals"), 5000);

        // Trigger the dropdown to open (if needed)
    const filterButton = await driver.findElement(By.id('dropdown-basic')); // Replace with the actual ID of your filter button
    await filterButton.click();

    // Click on the "Title" clickable text
    const titleClickableText = await driver.findElement(By.id("clickable-Title"));
    await titleClickableText.click();

    // Insert an input text in the "Title" field
    const titleInput = await driver.findElement(By.id("input-Title"));
    await titleInput.sendKeys("Ex");

    // Press Enter on the keyboard
    await titleInput.sendKeys(Key.RETURN);

     // Find the card element by its text content
     const cardElement = await driver.findElement(By.xpath('//div[@class="card-header" and text()="AI Research Project"]'));

     // Click on the card
     await cardElement.click();

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

describe("End to end tests for active proposal and create a New Proposal succesfully", () => {

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

  async function checkAndCollapseNavbar() {
    const isNavbarCollapsed = await isElementVisible('.navbar-toggler-icon');
    if (isNavbarCollapsed) {
      const hamburgerMenuIcon = await driver.findElement(By.css('.navbar-toggler-icon'));
      await hamburgerMenuIcon.click();
    }
  }

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

  async function doLogout() {
    await checkAndCollapseNavbar();

    const logoutLinkButton = await driver.findElement(By.css('#link-logout-navbar-button'));
    await logoutLinkButton.click();
  }
 //try to use wait instead of sleep for better synchro
  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test.only("create a new Proposal", async () => {
    await doLogin();

    await driver.get(baseURL);
    await checkAndCollapseNavbar();

    await driver.sleep(1000);
      // Explicit wait for the menu to be fully expanded (adjust timeout as needed)
      await driver.wait(until.elementLocated(By.css('.nav-link')), 5000);


     // Find the "Applications" link by its text
     const proposalsLink = await driver.findElement(By.linkText('My Proposals'));

     // Click the "Applications" link
     await proposalsLink.click();
 
     // Wait for some time (you can replace this with proper waits)
     await driver.sleep(1000);
 
     // Assert that the navigation to the correct route occurred
     //const currentUrl = await driver.getCurrentUrl();
     await driver.wait(until.urlContains("/my-proposals"), 5000);

     const addButton = await driver.findElement(By.className("add-button"));

    await addButton.click();

      // Check if the modal is visible
    const modalContent = await driver.findElement(By.css(".modal-content"));

    // Check if the modal content is visible
    const isModalVisible = await modalContent.isDisplayed();
    expect(isModalVisible).toBe(true);

    // Find and interact with the Title input field
    const titleInput = await driver.findElement(By.id("field-item-enabled"));
    await titleInput.sendKeys("Your Title");

    // Find and interact with the Type input field
    const typeInput = await driver.findElement(By.id("field-item-enabled"));
    await typeInput.sendKeys("Your Type");

    // Find and interact with the Expiration date input (assuming you have a date picker)
    const expirationInput = await driver.findElement(By.id("field-item-enabled"));
    await expirationInput.sendKeys("2023-12-31");

    // Find and interact with the Description textarea
    const descriptionTextarea = await driver.findElement(By.id("description-input-textarea"));
    await descriptionTextarea.sendKeys("Your Description");

    // Find and interact with the Required Knowledge textarea
    const requiredKnowledgeTextarea = await driver.findElement(By.id("knowledge-input-textarea"));
    await requiredKnowledgeTextarea.sendKeys("Your Required Knowledge");

    // Find and interact with the Notes textarea
    const notesTextarea = await driver.findElement(By.id("notes-input-textarea"));
    await notesTextarea.sendKeys("Your Notes");

    // Find and interact with the Level radio button (choose "MsC")
    const levelMsCRadioButton = await driver.findElement(By.id("Msc-input-button"));
    await levelMsCRadioButton.click();

    // Find and interact with the Save button
    const saveButton = await driver.findElement(By.id("save-button"));
    await saveButton.click();


     // Check if the modal content is visible
     const isModalClosed = await modalContent.isDisplayed();
     expect(isModalClosed).toBe(false);
    //can add check on errors on fields input in other tests

      await doLogout();
    
  }, 20000);

});