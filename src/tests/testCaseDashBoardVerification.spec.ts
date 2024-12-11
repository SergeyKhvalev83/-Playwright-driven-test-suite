import { expect, test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import logger from "../utils/LoggerUtil";

const authFile = "src/config/auth.json";
import dotenv from "dotenv";
dotenv.config();

test("Verify_'Implement_user_authentication'_is_in_the 'To_Do'_column_and_Confirm_tags:_'Feature'_'High Priority'", async ({
  page,
}) => {
  const expectedToDo = "Implement user authentication";
  const expectedFeatureTag = "Feature";
  const expectedPriorityTag = "High Priority";
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();

  await loginPage.fillUsername(process.env.APP_USERNAME!);
  await loginPage.fillPassword(process.env.APP_PASSWORD!);
  const homePage = await loginPage.clickLoginButton();
  await homePage.expectHeaderToBeVisible();

  homePage.navigateToWebApp();

  logger.info("Test for login is completed");
  await page.context().storageState({ path: authFile });
  logger.info("Auth state is saved");
  const actualToDoLocator = await homePage.getToDoByText(expectedToDo);
  const actualToDoText = await actualToDoLocator?.locator("h3").innerText()
  console.log("ACTUAL RECIEVED: ", actualToDoText)
  expect(actualToDoText).toBe(expectedToDo);

  const isFeatureTagePresented = await homePage.checkTagPresenceForToDoItem(expectedToDo, expectedFeatureTag);
  console.log(isFeatureTagePresented);
  expect(isFeatureTagePresented).toBeTruthy();

  const isPriorityTagePresented = await homePage.checkTagPresenceForToDoItem(expectedToDo, 
    expectedPriorityTag
  );
  console.log(isPriorityTagePresented);
  expect(isPriorityTagePresented).toBeTruthy();
});

test("Verify_'Fix_navigation_bug'_is_in_the_'To_Do_column_Confirm_tags:_'Bug'", async ({
  page,
}) => {
  const expectedFixBugToDo = "Fix navigation bug";
  const expectedBugTag = "Bug";
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.fillUsername(process.env.APP_USERNAME!);
  await loginPage.fillPassword(process.env.APP_PASSWORD!);
  const homePage = await loginPage.clickLoginButton();
  await homePage.expectHeaderToBeVisible();
  homePage.navigateToWebApp();
  const actualFixBugToDoLocator = await homePage.getToDoByText(expectedFixBugToDo);
  const actualFixBugToDoText = await actualFixBugToDoLocator?.locator("h3").innerText();
  expect(actualFixBugToDoText).toBe(expectedFixBugToDo);

  const isBugTagePresented = await homePage.checkTagPresenceForToDoItem(expectedFixBugToDo,
    expectedBugTag
  );
  console.log(isBugTagePresented);
  expect(isBugTagePresented).toBeTruthy();


});

//TODO!!!!
test("Verify_'Design system updates'_is_in_the_'In Progress'_column_and_Confirm tags: 'Design'", async ({
  page,
}) => {
  const expectedInProgressText = "Design system updates";
  const expectedDesignTag = "Design";
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.fillUsername(process.env.APP_USERNAME!);
  await loginPage.fillPassword(process.env.APP_PASSWORD!);
  const homePage = await loginPage.clickLoginButton();
  await homePage.expectHeaderToBeVisible();
  homePage.navigateToWebApp();
  const actualInProgressItemLocator = await homePage.getInProgressByText(expectedInProgressText);
  const actualInProgressItemText = await actualInProgressItemLocator?.locator("h3").innerText();
  expect(actualInProgressItemText).toBe(expectedInProgressText);

  const isDesignTagPresented = await homePage.checkTagPresenceForInProgressItem(expectedInProgressText,
    expectedDesignTag
  );
  console.log(isDesignTagPresented);
  expect(isDesignTagPresented).toBeTruthy();


});