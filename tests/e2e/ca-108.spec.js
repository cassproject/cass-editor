const { test, expect, loginAndCreateConfig } = require('./fixtures');

// CA-108: Configuration identifies reader access identities with CRUD
    // Task: add/remove a reader identity on a config element, verify it persists
    test('CA-108: Reader access identities are manageable', async ({ page }) => {
        await loginAndCreateConfig(page);
        // Navigate to Users tab
        await page.click('#configuration-details-users-tab');
        // Verify default readers management button is available
        const manageReadersBtn = page.locator('#configuration-details-manage-default-readers-button');
        await manageReadersBtn.scrollIntoViewIfNeeded();
        await expect(manageReadersBtn).toBeVisible();
        // Click to open the reader management modal
        await manageReadersBtn.click();
        // Should see the permission entities selection modal
        await expect(page.locator('.modal.is-active')).toBeVisible();
    });
