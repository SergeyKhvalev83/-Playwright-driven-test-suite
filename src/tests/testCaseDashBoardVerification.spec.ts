import { expect, test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import logger from "../utils/LoggerUtil";
import dotenv from "dotenv";
dotenv.config();

test("WEB_APP:_Verify_'Implement_user_authentication'_is_in_the 'To_Do'_column_and_Confirm_tags:_'Feature'_'High Priority'", async ({
  page,
}) => {
  const expectedToDo = "Implement user authentication";
  const expectedFeatureTag = "Feature";
  const expectedPriorityTag = "High Priority";
  logger.info("TEST CASE TITLE: fWEB_APP:_Verify_'Implement_user_authentication'_is_in_the 'To_Do'_column_and_Confirm_tags:_'Feature'_'High Priority'");

  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();

  await loginPage.fillUsername(process.env.APP_USERNAME!);
  await loginPage.fillPassword(process.env.APP_PASSWORD!);
  const homePage = await loginPage.clickLoginButton();
  await homePage.expectHeaderToBeVisible();
  logger.info("Login is completed successfully");
  homePage.navigateToWebApp();
  logger.info("Web app clicked successfully");
  const actualToDoLocator = await homePage.getToDoItemByText(expectedToDo);
  const actualToDoText = await actualToDoLocator?.locator("h3").innerText();
  logger.info(`ACTUAL RESULT: ${actualToDoText}, EXPECTED RESULT: ${expectedToDo}`);
  expect(actualToDoText).toBe(expectedToDo);

  const isFeatureTagePresented = await homePage.checkTagPresenceForToDoItem(
    expectedToDo,
    expectedFeatureTag
  );
  logger.info(
    `Does tag ${expectedFeatureTag} is presented: ${isFeatureTagePresented}`
  );
  expect(isFeatureTagePresented).toBeTruthy();

  const isPriorityTagePresented = await homePage.checkTagPresenceForToDoItem(
    expectedToDo,
    expectedPriorityTag
  );
  logger.info(
    `Does tag ${expectedPriorityTag} is presented: ${isPriorityTagePresented}`
  );
  expect(isPriorityTagePresented).toBeTruthy();
});

test("WEB_APP:_Verify_'Fix_navigation_bug'_is_in_the_'To_Do_column_Confirm_tags:_'Bug'", async ({
  page,
}) => {
  const expectedFixBugToDo = "Fix navigation bug";
  const expectedBugTag = "Bug";
  logger.info("TEST CASE TITLE: WEB_APP:_Verify_'Fix_navigation_bug'_is_in_the_'To_Do_column_Confirm_tags:_'Bug'");


  const loginPage = new LoginPage(page);

  await loginPage.navigateToLoginPage();
  await loginPage.fillUsername(process.env.APP_USERNAME!);
  await loginPage.fillPassword(process.env.APP_PASSWORD!);
  const homePage = await loginPage.clickLoginButton();
  await homePage.expectHeaderToBeVisible();
  logger.info("Login is completed successfully");
  homePage.navigateToWebApp();
  logger.info("Web app clicked successfully");
  const actualFixBugToDoLocator = await homePage.getToDoItemByText(
    expectedFixBugToDo
  );
  const actualFixBugToDoText = await actualFixBugToDoLocator
    ?.locator("h3")
    .innerText();
    logger.info(`ACTUAL RESULT: ${actualFixBugToDoText}, EXPECTED RESULT: ${expectedFixBugToDo}`);

  expect(actualFixBugToDoText).toBe(expectedFixBugToDo);

  const isBugTagePresented = await homePage.checkTagPresenceForToDoItem(
    expectedFixBugToDo,
    expectedBugTag
  );
  logger.info(
    `Does tag ${expectedBugTag} is presented: ${isBugTagePresented}`
  );  expect(isBugTagePresented).toBeTruthy();
});

test("WEB_APP:_Verify_'Design system updates'_is_in_the_'In Progress'_column_and_Confirm tags: 'Design'", async ({
  page,
}) => {
  const expectedInProgressText = "Design system updates";
  const expectedDesignTag = "Design";
  logger.info("TEST CASE TITLE: WEB_APP:_Verify_'Design system updates'_is_in_the_'In Progress'_column_and_Confirm tags: 'Design'");

  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.fillUsername(process.env.APP_USERNAME!);
  await loginPage.fillPassword(process.env.APP_PASSWORD!);
  const homePage = await loginPage.clickLoginButton();
  await homePage.expectHeaderToBeVisible();
  logger.info("Login is completed successfully");
  homePage.navigateToWebApp();
  logger.info("Web app clicked successfully");

  const actualInProgressItemLocator = await homePage.getInProgressItemByText(
    expectedInProgressText
  );
  const actualInProgressItemText = await actualInProgressItemLocator
    ?.locator("h3")
    .innerText();
    logger.info(`ACTUAL RESULT: ${actualInProgressItemText}, EXPECTED RESULT: ${expectedInProgressText}`);

  expect(actualInProgressItemText).toBe(expectedInProgressText);

  const isDesignTagPresented = await homePage.checkTagPresenceForInProgressItem(
    expectedInProgressText,
    expectedDesignTag
  );
  logger.info(`Does tag ${expectedDesignTag} is presented: ${isDesignTagPresented}`);
  expect(isDesignTagPresented).toBeTruthy();
});

test("MOBILE_APP: Verify_'Push notification system'_is_in_the_'To_Do'_column_and_Confirm tags: 'Feature'", async ({
  page,
}) => {
  const expectedToDoText = "Push notification system";
  const expectedTag = "Feature";
  logger.info("TEST CASE TITLE: MOBILE_APP: Verify_'Push notification system'_is_in_the_'To_Do'_column_and_Confirm tags: 'Feature'");

  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.fillUsername(process.env.APP_USERNAME!);
  await loginPage.fillPassword(process.env.APP_PASSWORD!);
  const homePage = await loginPage.clickLoginButton();
  await homePage.expectHeaderToBeVisible();
  logger.info("Login is completed successfully");
  await homePage.navigateToMobileApp();
  logger.info("Mobile app clicked successfully");

  const actualInToDoItemLocator = await homePage.getToDoItemByText(
    expectedToDoText
  );
  const actualInProgressItemText = await actualInToDoItemLocator
    ?.locator("h3")
    .innerText();
    logger.info(`ACTUAL RESULT: ${actualInProgressItemText}, EXPECTED RESULT: ${expectedToDoText}`);

  expect(actualInProgressItemText).toBe(expectedToDoText);

  const isFeatureTagPresented = await homePage.checkTagPresenceForToDoItem(
    expectedToDoText,
    expectedTag
  );
  `Does tag ${expectedTag} is presented: ${isFeatureTagPresented}`
  expect(isFeatureTagPresented).toBeTruthy();
});

test("MOBILE_APP:Verify_'Offline mode'_is_in_the_'In Progress'_column_and_Confirm tags:_'Feature'_&_'High Priority'", async ({
  page,
}) => {
  const expectedInProgressText = "Offline mode";
  const expectedFeatureTag = "Feature";
  const expectedPriorityTag = "High Priority";
  logger.info("TEST CASE TITLE: MOBILE_APP:Verify_'Offline mode'_is_in_the_'In Progress'_column_and_Confirm tags:_'Feature'_&_'High Priority'");


  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.fillUsername(process.env.APP_USERNAME!);
  await loginPage.fillPassword(process.env.APP_PASSWORD!);
  const homePage = await loginPage.clickLoginButton();
  await homePage.expectHeaderToBeVisible();
  logger.info("Login is completed successfully");
  await homePage.navigateToMobileApp();
  logger.info("Mobile app clicked successfully");

  const actualInProgressItemLocator = await homePage.getInProgressItemByText(
    expectedInProgressText
  );
  const actualInProgressItemText = await actualInProgressItemLocator
    ?.locator("h3")
    .innerText();
    logger.info(`ACTUAL RESULT: ${actualInProgressItemText}, EXPECTED RESULT: ${expectedInProgressText}`);

  expect(actualInProgressItemText).toBe(expectedInProgressText);

  const isFeatureTagPresented =
    await homePage.checkTagPresenceForInProgressItem(
      expectedInProgressText,
      expectedFeatureTag
    );
    `Does tag ${expectedFeatureTag} is presented: ${isFeatureTagPresented}`
  expect(isFeatureTagPresented).toBeTruthy();

  const isPriorityTagPresented =
    await homePage.checkTagPresenceForInProgressItem(
      expectedInProgressText,
      expectedPriorityTag
    );
    `Does tag ${expectedPriorityTag} is presented: ${isPriorityTagPresented}`
    expect(isPriorityTagPresented).toBeTruthy();
});

test("MOBILE_APP:_Verify_'App_icon_design'_is_in_the_'Done'_column_and_Confirm tags:_'Design", async ({
  page,
}) => {
  const expectedDoneItemText = "App icon design";
  const expectedTag = "Design";

  logger.info("TEST CASE TITLE: MOBILE_APP:_Verify_'App_icon_design'_is_in_the_'Done'_column_and_Confirm tags:_'Design'");

  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.fillUsername(process.env.APP_USERNAME!);
  await loginPage.fillPassword(process.env.APP_PASSWORD!);
  const homePage = await loginPage.clickLoginButton();
  await homePage.expectHeaderToBeVisible();
  logger.info("Login is completed successfully");
  await homePage.navigateToMobileApp();
  logger.info("Mobile app clicked successfully");

  const actualDoneItemLocator = await homePage.getDoneItemByText(
    expectedDoneItemText
  );
  const actualDoneItemText = await actualDoneItemLocator
    ?.locator("h3")
    .innerText();
    logger.info(`ACTUAL RESULT: ${actualDoneItemText}, EXPECTED RESULT: ${expectedDoneItemText}`);

  expect(actualDoneItemText).toBe(expectedDoneItemText);

  const isFeatureTagPresented = await homePage.checkTagPresenceForDoneItem(
    expectedDoneItemText,
    expectedTag
  );
  `Does tag ${expectedTag} is presented: ${isFeatureTagPresented}`
  expect(isFeatureTagPresented).toBeTruthy();
});
