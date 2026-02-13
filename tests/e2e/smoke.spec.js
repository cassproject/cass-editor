
const { test, expect } = require('./fixtures');

test('welcome page elements', async ({ page }) => {
    await page.goto('/?server=http://localhost/api/');
    await expect(page.locator('#welcome')).toBeVisible();
    await expect(page.locator('h1.title')).toContainText('Welcome to CaSS');
});
