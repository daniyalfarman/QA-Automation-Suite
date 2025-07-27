export async function login(page) {
  await page.goto('/');
  await page.fill('input[placeholder="Username"]', 'admin');
  await page.fill('input[placeholder="Password"]', 'password');
  await page.click('button[type="submit"]');
  await page.waitForURL(/todos/);
}

export async function createTodo(page, text) {
  await page.fill('input[type="text"]', text);
  await page.click('button[type="submit"]');
  await expect(page.locator(`text=${text}`)).toBeVisible();
}