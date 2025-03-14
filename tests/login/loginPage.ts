import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  private error: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.getByPlaceholder("Username");
    this.password = page.locator("[data-test='password']");
    this.loginButton = page.getByRole("button", { name: "LOGIN", exact: true });
    this.error = page.locator("[data-test='error']");
  }

  async goto() {
    await this.page.goto("/v1");
  }

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async errorIs(text: string) {
    await expect(this.error).toHaveText(text);
  }
}
