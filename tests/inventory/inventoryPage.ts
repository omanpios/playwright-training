import { expect, Locator, Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly header: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator(".product_label");
  }
  async haveText(text: string) {
    await expect(this.header).toHaveText(text);
  }
  
}
