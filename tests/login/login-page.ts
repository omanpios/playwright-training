import { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly botImage: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator("[id='user-name']");
    this.password = page.getByPlaceholder("Password", { exact: true });
    this.loginButton = page.getByRole("button", { name: "LOGIN", exact: true });
    this.botImage = page.locator(".bot_column");
    this.errorMessage = page.locator("[data-test='error']");
  }

  async goto() {
    await this.page.goto("/v1");
  }

  async login(username: string, password: string) {
    await this.goto();
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
