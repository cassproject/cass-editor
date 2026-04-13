const { test, expect } = require('@playwright/test');
const { loginAndNavigate, createConfig } = require('../fixtures.js');

// CA-208: Suggestion mode for non-permitted edits
// As a non-owner/non-logged-in user, view mode is enforced (no edit controls)
test.skip('CA-208: Suggestion mode for unauthorized edits', async ({ page }) => {
    // Without login — user sees view-only mode
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    if (!await navigateToFramework(page)) return;
    await expect(page.locator('#framework')).toBeVisible();

    test('CA-208: Verify Can Edit Permissions for Unowned Framework', async ({ page, context }) => {
        // 1. Create a framework as logged in user
        await loginAndNavigate(page);

        await page.click('#side-nav-frameworks-link');
        await page.waitForSelector('.lode__thing-heading', { state: 'visible' });

        // Create a new framework
        await page.click('#add-new-dropdown-toggle-button');
        await page.click('#add-new-dropdown-framework');

        // Wait for creation modal content
        await page.waitForSelector('.lode__thing-editing', { state: 'visible' });

        // Fill Name
        const nameInput = page.locator('.lode__thing-editing [id="name-0"] textarea');
        await nameInput.waitFor({ state: 'visible' });
        await nameInput.fill('Test Owned Framework for CA-208');
        await nameInput.press('Tab');

        // Save
        const saveBtn = page.locator('#thing-editing-done-editing-button');
        await saveBtn.click();

        await page.waitForLoadState('networkidle');

        // Capture framework URL
        const fwkUrl = page.url();

        // 2. Log out / clear state
        await context.clearCookies();
        //Delete everything in localstorage
        await page.evaluate(() => {
            localStorage.clear();
        });

        let targetedFrameworkUrl = "/#/framework?server=http://localhost/api/&frameworkId=" + await page.evaluate(
            () => window.app.$store.state.editor.framework.shortId()
        );
        // 3. Navigate back to the framework unauthenticated
        await page.goto("about:blank", { waitUntil: 'domcontentloaded' });
        await page.goto(targetedFrameworkUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForLoadState('networkidle');


        // check permissions
        expect(await page.evaluate(
            () => window.app.$store.state.editor.framework.canEditAny(EcIdentityManager.default.getMyPks())
        )).toBe(false);
    });

    // Non-logged-in user cannot edit — suggestion mode would apply
    expect(result.canEdit).toBe(true);
});
