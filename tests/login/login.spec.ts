import test from "@playwright/test";

test("Login with valid creds", async ({ page }) => {
  await page.goto("/v1");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.locator("[data-test='password']").fill("secret_sauce");
  await page.getByRole("button", { name: "LOGIN", exact: true }).click();
});
