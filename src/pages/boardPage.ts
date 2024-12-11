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
  private readonly doneColumnLocator = "//h2[text()='Done']/parent::*";

  private readonly tagsContainerLocator = ".px-2.py-1.rounded-full.text-xs";

  constructor(private page: Page) {}

  async navigateToWebApp() {
    await this.page
      .locator(this.webAppButtonLocator)
      .click()
      .catch((error) => {
        logger.error(`Error clicking web app button: ${error}`);
        throw error;
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

  async getToDoItemByText(toDoTitle: string): Promise<Locator | null> {
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

  async getInProgressItemByText(inProgress: string): Promise<Locator | null> {
    const inProgressColumn = this.page.locator(this.inProgressColumnLocator);
    const listOfInProgressItems = inProgressColumn.locator(".bg-white");
    const inProgressItemsCount = await listOfInProgressItems.count();
    for (let i = 0; i < inProgressItemsCount; i++) {
      const retrievedInProgresItemText = await listOfInProgressItems
        .nth(i)
        .locator("h3")
        .innerText();
      if (retrievedInProgresItemText == inProgress) {
        return listOfInProgressItems.nth(i);
      }
    }
    return null;
  }

  async getDoneItemByText(doneItemTitle: string): Promise<Locator | null> {
    const doneColumn = this.page.locator(this.doneColumnLocator);
    const listOfDoneItems = doneColumn.locator(".bg-white");
    const doneItemsCount = await listOfDoneItems.count();
    for (let i = 0; i < doneItemsCount; i++) {
      const retrievedDoneItemText = await listOfDoneItems
        .nth(i)
        .locator("h3")
        .innerText();
      if (retrievedDoneItemText == doneItemTitle) {
        return listOfDoneItems.nth(i);
      }
    }
    return null;
  }

  async checkTagPresenceForToDoItem(
    todoTitle: string,
    tagTitle: string
  ): Promise<boolean> {
    let isPriorityTagPresented = false;
    await this.page.waitForSelector(this.toDoColumnLocator);
    const toDoLocator = await this.getToDoItemByText(todoTitle);
    if (toDoLocator) {
      const featurePriorityContainer = toDoLocator.locator(
        this.tagsContainerLocator
      );
      const itemCount = await featurePriorityContainer.count();

      for (let i = 0; i < itemCount; i++) {
        const retrievedFeatureText = await featurePriorityContainer
          .nth(i)
          .textContent();
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
    const inProgressLocator = await this.getInProgressItemByText(
      inProgressItemTitle
    );
    if (inProgressLocator) {
      const tagsContainer = inProgressLocator.locator(
        this.tagsContainerLocator
      );
      const itemCount = await tagsContainer.count();

      for (let i = 0; i < itemCount; i++) {
        const retrievedTagText = await tagsContainer.nth(i).textContent();
        if (retrievedTagText == tagTitle) {
          isTagPresented = true;
        }
      }
    }

    return isTagPresented;
  }

  async checkTagPresenceForDoneItem(
    doneItemTitle: string,
    tagTitle: string
  ): Promise<boolean> {
    let isTagPresented = false;
    await this.page.waitForSelector(this.toDoColumnLocator);
    const doneItemLocator = await this.getDoneItemByText(doneItemTitle);
    if (doneItemLocator) {
      const tagsContainer = doneItemLocator.locator(this.tagsContainerLocator);
      const itemCount = await tagsContainer.count();
      for (let i = 0; i < itemCount; i++) {
        const retrievedTagText = await tagsContainer.nth(i).textContent();
        if (retrievedTagText == tagTitle) {
          isTagPresented = true;
        }
      }
    }

    return isTagPresented;
  }
}
