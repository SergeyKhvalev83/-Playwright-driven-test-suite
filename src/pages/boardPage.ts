import { Locator, Page, expect } from "@playwright/test";
import logger from "../utils/LoggerUtil";

export default class boardPage {
  private readonly mainHeaderLocator = "//h1[text()='Projects']";
  private readonly webAppButtonLocator =
    "button:has(h2:text('Web Application'))";
  private readonly mobileAppButtonLocator =
    "button:has(h2:text('Mobile Application'))";
  private readonly toDoColumnLocator = "//h2[text()='To Do']/parent::*";
  private readonly inProgressColumnLocator =
    "//h2[text()='In Progress']/parent::*";

  //private readonly appWebOrMibileHeaderLocator =    ".px-6 py-4 flex justify-between items-center";

  private readonly tagsContainerLocator =
    ".px-2.py-1.rounded-full.text-xs";

  constructor(private page: Page) {}

  async navigateToWebApp() {
    await this.page
      .locator(this.webAppButtonLocator)
      .click()
      .catch((error) => {
        logger.error(`Error clicking web app button: ${error}`);
        throw error; // rethrow the error if needed
      })
      .then(() => logger.info("Clicked web app button"));

    await this.page
      .locator("//h1[text()='Web Application']")
      .waitFor({ timeout: 3000 });
  }

  async navigateToMobileApp() {
    await this.page
      .locator(this.mobileAppButtonLocator)
      .click()
      .catch((error) => {
        logger.error(`Error clicking mobile app button: ${error}`);
        throw error;
      })
      .then(() => logger.info("Clicked mobile app button"));
    await this.page
      .locator("//h1[text()='Mobile Application']")
      .waitFor({ timeout: 3000 });
  }

  async expectHeaderToBeVisible() {
    await expect(this.page.locator(this.mainHeaderLocator))
      .toBeVisible({
        timeout: 3000,
      })
      .catch((error) => {
        logger.error(`Error dashboard main header visibility: ${error}`);
        throw error;
      })
      .then(() => logger.info("Dashboard main header is visible"));
  }

  async getToDoByText(toDoTitle: string): Promise<Locator | null> {
    const toDoColumn = this.page.locator(this.toDoColumnLocator);
    const listOfToDoes = toDoColumn.locator(".bg-white");
    const toDoesCount = await listOfToDoes.count();
    for (let i = 0; i < toDoesCount; i++) {
      const retrievedToDoText = await listOfToDoes
        .nth(i)
        .locator("h3")
        .innerText();
      if (retrievedToDoText == toDoTitle) {
        return listOfToDoes.nth(i);
      }
    }
    return null;
  }

  async getInProgressByText(inProgress: string): Promise<Locator | null> {
    const inProgressColumn = this.page.locator(this.inProgressColumnLocator);
    const listOfInProgressItems = inProgressColumn.locator(".bg-white");
    const inProgressItemsCount = await listOfInProgressItems.count();
    for (let i = 0; i < inProgressItemsCount; i++) {
      const retrievedInProgresItemText = await listOfInProgressItems
        .nth(i)
        .locator("h3")
        .innerText();
      console.log("INPROGRESS ITEM TEXT: ", retrievedInProgresItemText);
      if (retrievedInProgresItemText == inProgress) {
        //inProgressText = retrievedInProgresItemText;
        return listOfInProgressItems.nth(i);
      }
    }
    //return inProgressText;
    return null;
  }

  async checkTagPresenceForToDoItem(
    todoTitle: string,
    tagTitle: string
  ): Promise<boolean> {
    let isPriorityTagPresented = false;
    await this.page.waitForSelector(this.toDoColumnLocator);
    const toDoLocator = await this.getToDoByText(todoTitle);
    if (toDoLocator) {
      const featurePriorityContainer = toDoLocator.locator(
        this.tagsContainerLocator
      );
      const itemCount = await featurePriorityContainer.count();
      console.log("!!!!!!!!!!!!", itemCount);

      for (let i = 0; i < itemCount; i++) {
        const retrievedFeatureText = await featurePriorityContainer
          .nth(i)
          .textContent();
        console.log(retrievedFeatureText);
        if (retrievedFeatureText == tagTitle) {
          isPriorityTagPresented = true;
        }
      }
    }

    return isPriorityTagPresented;
  }

  async checkTagPresenceForInProgressItem(
    inProgressItemTitle: string,
    tagTitle: string
  ): Promise<boolean> {
    let isTagPresented = false;
    await this.page.waitForSelector(this.toDoColumnLocator);
    const inProgressLocator = await this.getInProgressByText(inProgressItemTitle);
    if (inProgressLocator) {
      const tagsContainer = inProgressLocator.locator(
        this.tagsContainerLocator
      );
      const itemCount = await tagsContainer.count();
      console.log("!!!!!!!!!!!!", itemCount);

      for (let i = 0; i < itemCount; i++) {
        const retrievedTagText = await tagsContainer
          .nth(i)
          .textContent();
        console.log(retrievedTagText);
        if (retrievedTagText == tagTitle) {
          isTagPresented = true;
        }
      }
    }

    return isTagPresented;
  }



  /*

  async navigateToContactTab(){

    await expect(this.page.getByRole('link', { name: this.contactsLinkLocator })).toBeVisible();
    logger.info("Contacts Tab is visible")
    await this.page.getByRole('link', { name: this.contactsLinkLocator }).click();
    logger.info("Contacts Tab is clicked")
    return new ContactPage(this.page);
    
  }

  async navigateToCaseTab(){

    await expect(this.page.getByRole('link', { name: this.contactsLinkLocator })).toBeVisible();
    logger.info("Contacts Tab is visible")
    await this.page.getByRole('link', { name: this.contactsLinkLocator }).click();
    logger.info("Contacts Tab is clicked")
    return new ContactPage(this.page);
    
  }

  */
}
