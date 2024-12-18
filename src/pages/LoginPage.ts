import { Page } from "@playwright/test";
import boardPage from "./boardPage";
import logger from "../utils/LoggerUtil";

export default class LoginPage {
  private readonly usernameInputSelector = "#username";
  private readonly passwordInputSelector = "#password";
  private readonly loginButtonSelector = "//button[@type='submit']";

  constructor(private page: Page) {}

  async quickLogin(username: string, password: string) {
    await this.navigateToLoginPage();
    await this.fillUsername(username);
    await this.fillPassword(password);
    return await this.clickLoginButton();
  }

  async navigateToLoginPage() {
    await this.page.goto(process.env.LOGIN_PAGE!);
    logger.info("Navigated to demo app");
  }

  async fillUsername(username: string) {
    await this.page.locator(this.usernameInputSelector).fill(username);
    logger.info("Send username");
  }

  async fillPassword(password: string) {
    await this.page.locator(this.passwordInputSelector).fill(password);
    logger.info("Send password");
  }

  async clickLoginButton() {
    await this.page
      .locator(this.loginButtonSelector)
      .click()
      .catch((error) => {
        logger.error(`Error clicking login button: ${error}`);
        throw error; 
      })
      .then(() => logger.info("Clicked login button"));

    const dashBoard = new boardPage(this.page);
    return dashBoard;
  }
}
