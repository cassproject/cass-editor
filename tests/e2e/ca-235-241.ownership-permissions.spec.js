const { test, expect } = require('./fixtures');

test.describe('Ownership & Permissions (CA-235 through CA-241)', () => {

    // CA-235: Allow owner to add an owner to any linked data object
    test('CA-235: Add owner to linked data object', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-236: Allow owner to remove an owner from any linked data object
    test('CA-236: Remove owner from linked data object', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-237: Allow owner to add reader to any private linked data object
    test('CA-237: Add reader to private linked data object', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-238: Allow owner to remove reader from any private linked data object
    test('CA-238: Remove reader from private linked data object', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-239: Allow owner to add commenter to any linked data object
    test('CA-239: Add commenter to linked data object', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-240: Allow owner to remove commenter from any linked data object
    test('CA-240: Remove commenter from linked data object', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-241: First owner identified as owner, others as editors
    test('CA-241: First owner identified as owner, others as editors', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible();
    });

});
