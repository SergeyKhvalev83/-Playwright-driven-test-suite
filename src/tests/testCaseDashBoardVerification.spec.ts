import { expect, test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import logger from "../utils/LoggerUtil";
import { decrypt } from "../utils/CryptojsUtil";

const authFile = "src/config/auth.json";
import dotenv from "dotenv";
dotenv.config();

test("simple login test", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();

  await loginPage.fillUsername(process.env.APP_USERNAME!);
  await loginPage.fillPassword(process.env.APP_PASSWORD!); 
  const homePage = await loginPage.clickLoginButton();
  await homePage.expectHeaderToBeVisible();
  //!!!!!!!!!!!!!!!!
  //TODO: nawigate to web application also

  logger.info("Test for login is completed");
  await page.context().storageState({ path: authFile });
  logger.info("Auth state is saved");
  await homePage.getToDoByText("Implement user authentication");
  const isFeatureTagePresented = await homePage.checkTagPresence("Feature");
  console.log(isFeatureTagePresented);
  // ASSERTION FOR FEATURE TAG
  expect(isFeatureTagePresented).toBeTruthy()

  const isPriorityTagePresented = await homePage.checkTagPresence("High Priority");
  console.log(isPriorityTagePresented);
  expect(isPriorityTagePresented).toBeTruthy()



});
