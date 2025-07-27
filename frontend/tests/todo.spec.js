import { test, expect } from "@playwright/test";

test.describe("Todo CRUD Operations", () => {
  const baseTodoText = "TestTodo-" + Date.now(); // Unique identifier for each test run

  test.beforeEach(async ({ page }) => {
    // Login and clear todos before each test
    await page.goto("/");
    await page.getByPlaceholder("Enter your username").fill("admin");
    await page.getByPlaceholder("Enter your password").fill("password");
    await page.click('button[type="submit"]');
    await page.waitForURL(/todos/);
  });

  test("Create a new todo", async ({ page }) => {
    const todoText = `${baseTodoText}-Create`;
    await page.getByPlaceholder("Add a new todo...").fill(todoText);
    await page.click('button[type="submit"]');

    await expect(page.getByText(todoText)).toBeVisible();
  });

  test("Edit an existing todo", async ({ page }) => {
    const originalText = `${baseTodoText}-EditOriginal`;
    const updatedText = `${baseTodoText}-EditUpdated`;

    // Create todo to edit
    await page.getByPlaceholder("Add a new todo...").fill(originalText);
    await page.click('button[type="submit"]');

    // Edit the todo
    await page
      .locator(`.todo-content:has-text("${originalText}")`)
      .locator(".edit-button")
      .click();
    await page.locator(".edit-input").fill(updatedText);
    await page.keyboard.press("Enter");

    // Verify
    await expect(page.getByText(updatedText)).toBeVisible();
    await expect(page.getByText(originalText)).toBeHidden();
  });

  test("Delete a todo", async ({ page }) => {
    const todoText = `${baseTodoText}-Delete`;

    // Create todo to delete
    await page.getByPlaceholder("Add a new todo...").fill(todoText);
    await page.click('button[type="submit"]');

    // Delete the todo
    await page
      .locator(`.todo-content:has-text("${todoText}")`)
      .locator(".delete-button")
      .click();
    await expect(page.getByText(todoText)).toBeHidden();
  });

  test("Verify todo persistence after refresh", async ({ page }) => {
    const todoText = `${baseTodoText}-Persist`;
    await page.getByPlaceholder("Add a new todo...").fill(todoText);
    await page.click('button[type="submit"]');

    await page.reload();
    await expect(page.getByText(todoText)).toBeVisible();
  });
});
