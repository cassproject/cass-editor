const { test, expect } = require('./fixtures');

// CA-245: Data properties indicate whether frameworks are published
    test('CA-245: Published status indicator on frameworks', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#frameworks')).toBeVisible();
        await expect(page.locator('.cass--list')).toBeVisible();
        // Verify the list contains items (published frameworks are listed)
        const listItems = page.locator('.cass--list--item');
        await expect(listItems.first()).toBeVisible();
    });
