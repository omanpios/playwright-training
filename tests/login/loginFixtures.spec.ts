import { test } from "../base.ts";
import dotenv from "dotenv";

dotenv.config();

const standardUser = process.env.STANDARD_USER as string;
const lockedOutUser = process.env.LOCKED_OUT_USER as string;
const password = process.env.PASSWORD as string;

test("Login with valid creds", async ({ loginPage, inventoryPage }) => {
  await loginPage.goto();
  await loginPage.login(standardUser, password);
  await inventoryPage.haveText("Products");
});

test("Login with invalid creds", async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(standardUser, "invalid password");
  await loginPage.errorIs(
    "Epic sadface: Username and password do not match any user in this service"
  );
});

test("Login with locked out user", async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(lockedOutUser, password);
  await loginPage.errorIs(
    "Epic sadface: Sorry, this user has been locked out."
  );
});

test("Login with missing creds", async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login("", "");
  await loginPage.errorIs(
    "Epic sadface: Username is required"
  );
  await loginPage.login("user", "");
  await loginPage.errorIs(
    "Epic sadface: Password is required"
  );
});
