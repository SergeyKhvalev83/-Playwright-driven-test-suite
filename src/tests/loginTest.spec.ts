import { test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import logger from "../utils/LoggerUtil";
//import { decrypt } from "../utils/CryptojsUtil";

const authFile = "src/config/auth.json";
import dotenv from 'dotenv';
dotenv.config();


/*
test("simple login test with self heal", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.fillUsername_selfheal("demo_selfheal");
});

*/

test("Verify 'Implement user authentication' is in the 'To Do' column", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
    await loginPage.fillUsername(process.env.APP_USERNAME!);//decrypt()
  await loginPage.fillPassword(process.env.APP_PASSWORD!);//decrypt(process.env.PASSWORD!)
  const homePage = await loginPage.clickLoginButton();
  await homePage.expectHeaderToBeVisible();
  logger.info("Test for login is completed");
  await page.context().storageState({ path: authFile });
  logger.info("Auth state is saved");
 homePage.getToDoByText('Implement user authentication');



});

