const { test, expect } = require('../fixtures');

// CA-218: Selection of two frameworks to crosswalk
    test('CA-218: Two framework selection for crosswalk', async ({ page }) => {
    await page.goto('/#/crosswalk?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
        await expect(page.locator('#crosswalk')).toBeVisible();
        await expect(page.locator('.crosswalk__steps')).toBeVisible();
        // First step allows framework selection
        const steps = page.locator('.step-item');
        await expect(steps.first()).toBeVisible();
    });
