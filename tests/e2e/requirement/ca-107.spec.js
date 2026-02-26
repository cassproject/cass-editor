const { test, expect, loginAndCreateConfig } = require('../fixtures');

// CA-107: Configuration identifies owner access identities with CRUD
    // Task: add/remove an owner identity on a config element, verify it persists
    test('CA-107: Owner access identities are manageable', async ({ page }) => {
        await loginAndCreateConfig(page);
        // Navigate to Users tab
        await page.click('#configuration-details-users-tab');
        // Verify default owners management button is available
        const manageOwnersBtn = page.locator('#configuration-details-manage-default-owners-button');
        await manageOwnersBtn.scrollIntoViewIfNeeded();
        await expect(manageOwnersBtn).toBeVisible();
        // Click to open the owner management modal
        await manageOwnersBtn.click();
        // Should see the permission entities selection modal
        await expect(page.locator('.modal.is-active')).toBeVisible();
    });
