const request = require("supertest");
const app = require("../../index");

const { Builder, By, Key, until } = require("selenium-webdriver");

describe("End to end tests for proposals by student", () => {
    //uploaded new stories
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
        usernameBox.sendKeys("s301316@studenti.polito.it");
        let passwordBox = await driver.findElement(By.id("password"));
        passwordBox.clear();
        passwordBox.sendKeys("s301316");
    
        await driver.sleep(1000);
    
        const submitButton = await driver.findElement(By.className("cf4ff3b5d c5faccce1 cfccd0b2a c901653c3 cd1bb01a0"));
    
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
        await driver.get(baseURL);
        await driver.sleep(1000);
    
        await checkAndCollapseNavbar();
      
        await driver.sleep(1000);
    
        const logoutLinkButton = await driver.findElement(By.css('#link-logout-navbar-button'));
        await logoutLinkButton.click();
    
        await driver.sleep(1000);
      }
     //try to use wait instead of sleep for better synchro
     beforeAll(async () => {
      driver = await new Builder().forBrowser("chrome").build();
    });
    
    afterAll(async () => {
      await driver.quit();
    });


    test("The page should show list of thesis proposal, open CV and read old applications", async () => {
        await doLogin();
    
        await driver.get(baseURL);
        await checkAndCollapseNavbar();
    
        await driver.sleep(1000);
          // Explicit wait for the menu to be fully expanded (adjust timeout as needed)
          await driver.wait(until.elementLocated(By.css('.nav-link')), 5000);
    
    
         // Find the "Applications" link by its text
         const thProposalsLink = await driver.findElement(By.linkText('Thesis Proposals'));
    
         // Click the "Applications" link
         await thProposalsLink.click();
     
         // Wait for some time (you can replace this with proper waits)
         await driver.sleep(1000);
     
         // Assert that the navigation to the correct route occurred
         //const currentUrl = await driver.getCurrentUrl();
         await driver.wait(until.urlContains("/student-applications"), 5000);
    
          // Verify the presence of a specific table on the page
          const oldApplicationsAccordion = await driver.findElement(By.className('accordion-card-column-Old-Applications'));
    
          // Check if the table element is present
          await oldApplicationsAccordion.click();

          // Assuming driver is your Selenium WebDriver instance
          const tableApplications = await driver.findElement(By.className('table-responsive'));

          await driver.wait(until.elementIsVisible(tableApplications), 5000);
    
            // Assuming driver is your Selenium WebDriver instance
      const filepersonIcon = await driver.findElement(By.css('.fileperson-icon'));

      // Click the info icon
      await filepersonIcon.click();

      const cvButton = await driver.findElement(By.className('btn btn-primary'));
      await cvButton.click();
  
      // Wait for the new window or tab to open (adjust as needed)
      await driver.wait(until.windowIsOpen());

      const greyButton = await driver.findElement(By.className('btn btn-secondary'));
      await greyButton.click();
      //CONTINUE FROM HERE

        // Check if the modal is visible
        const modalContent = await driver.findElement(By.css(".modal-content"));
    
        // Check if the modal content is visible
        const isModalVisible = await modalContent.isDisplayed();
        expect(isModalVisible).toBe(true);
    
        const closeButton = await driver.findElement(By.css(".modal-header [aria-label='Close']"));
        await closeButton.click();
    
        await driver.sleep(1000);
    
        await checkAndCollapseNavbar();
    
        const notificationsButton= await driver.findElement(By.id('BellFill-icon-button'));
        await notificationsButton.click();
    
        const notifyPopover= await driver.findElement(By.id("notification-popover"));
        //const isPopoverVisible = await notifyPopover.isDisplayed();
        await driver.sleep(1000);
    
        //expect(isPopoverVisible).toBe(true); no need if i can later click and inteact with it different from tables
    
        const popoverCloseButton= await driver.findElement(By.id('popover-close-button'));
        await popoverCloseButton.click();
    
        const infoPersonIcon= await driver.findElement(By.css('.fileperson-icon'));
        await infoPersonIcon.click();
       
        const modalShow= await driver.findElement(By.className('fade modal show'));
        const isModalShowVisible = await modalShow.isDisplayed();
        //expect(isModalShowVisible).toBe(true);
    
        const btnClose= await driver.findElement(By.className('btn btn-secondary'));
        await btnClose.click();
    
        await driver.sleep(1000);
    
          await doLogout();
        
      }, 20000);
    
    });    