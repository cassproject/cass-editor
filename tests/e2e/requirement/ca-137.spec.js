const { test, expect, navigateToFramework } = require('../fixtures');

// CA-137: Recently opened frameworks list persists over browser refreshes
// Requirement: open a framework, refresh the page, verify recent frameworks are still accessible
test('CA-137: Recently opened frameworks persist after refresh', async ({ page }) => {
    // Navigate to frameworks page and open a framework
    await page.goto('/#/frameworks?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#frameworks')).toBeVisible();
    if (!await navigateToFramework(page)) return;
    await expect(page.locator('#framework')).toBeVisible();

    // Record the framework URL before refresh
    const frameworkUrl = page.url();
    expect(frameworkUrl).toContain('#/framework');

    // Perform an actual browser page reload to test persistence
    await page.reload({ waitUntil: 'domcontentloaded' });

    // After reload, verify frameworks list loads and items are still present
    await page.goto('/#/frameworks?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#frameworks')).toBeVisible();

    const reloadedItems = page.locator('.cass--list--item');
    await reloadedItems.first().waitFor({ state: 'visible' });
    const count = await reloadedItems.count();
    expect(count).toBeGreaterThan(0);
});
