
import { test, expect } from './fixtures';

test('welcome page elements', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#welcome')).toBeVisible(); 
  await expect(page.locator('h1.title')).toContainText('Welcome to CaSS');
});
