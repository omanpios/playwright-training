import { test, expect } from "@playwright/test";
import { LoginPage } from "./login-page";
import dotenv from "dotenv";

dotenv.config();

test("Login with valid credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const username = process.env.STANDARD_USER as string;
  const password = process.env.PASSWORD as string;
  await loginPage.login(username, password);
});

test("Login with invalid credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const username = process.env.LOCKED_OUT_USER as string;
  await loginPage.login(username, "password");
  await expect(loginPage.errorMessage).toHaveText(
    /Epic sadface: Username and password do not match any user in this service/
  );
});

test("Login with locked out user", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const username = process.env.LOCKED_OUT_USER as string;
  const password = process.env.PASSWORD as string;
  await loginPage.login(username, password);
  await expect(loginPage.errorMessage).toHaveText(
    /Epic sadfaces: Sorry, this user has been locked out/
  );
});
