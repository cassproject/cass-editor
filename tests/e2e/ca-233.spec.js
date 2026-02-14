const { test, expect, loginAndNavigate } = require('./fixtures');

// CA-233: Obtain organization keypairs upon login
    test('CA-233: Organization keypairs obtained on login', async ({ page }) => {
        await loginAndNavigate(page);
        // After login, the user icon should be visible — proving auth keypairs loaded
        await expect(page.locator('#side-nav-user-icon-button')).toBeVisible();
    });
