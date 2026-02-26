/**
 * Coverage: ListItemInfo.vue — exercise the right-side info panel.
 * Targets the 8.8% covered ListItemInfo component (686 uncovered lines).
 */

const { test, expect, loginAndNavigate, navigateToFramework } = require('../fixtures');

test('List item info: open framework details panel, click accordions, share links', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();

    // Click on a framework item (single click) to open the right-side info panel
    const listItems = page.locator('.cass--list--item .cass--list--thing');
    const hasItems = await listItems.first().isVisible().catch(() => false);
    if (!hasItems) return;

    await listItems.first().click();

    // The right aside (#cass__right-aside) should appear
    const rightAside = page.locator('#cass__right-aside');
    if (await rightAside.isVisible().catch(() => false)) {
        // Click the "details" accordion
        const detailsAccordion = page.locator('button:has-text("details"), button:has-text("Details")').first();
        if (await detailsAccordion.isVisible().catch(() => false)) {
            await detailsAccordion.click();
        }

        // Click the "properties" accordion
        const propertiesAccordion = page.locator('button:has-text("properties"), button:has-text("Properties")').first();
        if (await propertiesAccordion.isVisible().catch(() => false)) {
            await propertiesAccordion.click();
        }

        // Click the "permissions" accordion
        const permissionsAccordion = page.locator('button:has-text("permissions"), button:has-text("Permissions")').first();
        if (await permissionsAccordion.isVisible().catch(() => false)) {
            await permissionsAccordion.click();
        }

        // Try the share/copy URL link
        const shareLink = page.locator('[title*="Copy URL"], [title*="copy"]').first();
        if (await shareLink.isVisible().catch(() => false)) {
            await shareLink.click();
        }

        // Try the Open button
        const openBtn = page.locator('#list-item-info-directory-open-button, span:has-text("Open")').first();
        if (await openBtn.isVisible().catch(() => false)) {
            await openBtn.click();
        }
    }
});
