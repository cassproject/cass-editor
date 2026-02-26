const { test, expect } = require('../fixtures');

// CA-213: Crosswalking process between two frameworks
    test('CA-213: Crosswalk page loads with step indicators', async ({ page }) => {
    await page.goto('/#/crosswalk?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
        await expect(page.locator('#crosswalk')).toBeVisible();
        // Verify step indicators are present
        await expect(page.locator('.crosswalk__steps')).toBeVisible();
        const steps = page.locator('.step-item');
        const stepCount = await steps.count();
        expect(stepCount).toBeGreaterThanOrEqual(3);
    });
