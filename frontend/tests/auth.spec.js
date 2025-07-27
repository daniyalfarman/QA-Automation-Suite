import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Login with valid credentials", async ({ page }) => {
    await page.getByPlaceholder("Enter your username").fill("admin");
    await page.getByPlaceholder("Enter your password").fill("password");
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/todos/);
    await expect(page.locator("text=Todo App")).toBeVisible();
  });

  test("Login with invalid credentials", async ({ page }) => {
    await page.getByPlaceholder("Enter your username").fill("wrong");
    await page.getByPlaceholder("Enter your password").fill("wrong");
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/$/); // Stay on login page
    await expect(page.getByText("Invalid username or password")).toBeVisible();
  });

  test("Logout functionality", async ({ page }) => {
    // Login first
    await page.getByPlaceholder("Enter your username").fill("admin");
    await page.getByPlaceholder("Enter your password").fill("password");
    await page.click('button[type="submit"]');

    // Then logout
    await page.click("text=Logout");
    await expect(page).toHaveURL("/");
    await expect(page.getByText("Welcome Back")).toBeVisible();
  });
});
