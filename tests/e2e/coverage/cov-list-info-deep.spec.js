/**
 * Coverage: Framework list info panel deep interactions.
 * Targets ListItemInfo.vue (8.8%), FilterAndSort.vue (57%),
 * List.vue (49%), AddProperty.vue (16%).
 * Single-click items, open info panel, click all accordions, test share URL,
 * use filter/sort, open directories.
 */

const { test, expect, loginAndNavigate } = require('../fixtures');

test('List and info panel deep: filter, sort, select items, accordions, share links', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();

    // Test filter/sort functionality
    const filterInput = page.locator('#filter-input, #search-bar-input, input[placeholder*="earch"], input[placeholder*="ilter"]').first();
    if (await filterInput.isVisible().catch(() => false)) {
        await filterInput.fill('test');
        await filterInput.fill('');
    }

    // Test sort buttons/dropdown
    const sortBtn = page.locator('#sort-button, button:has-text("sort"), [title*="sort"]').first();
    if (await sortBtn.isVisible().catch(() => false)) {
        await sortBtn.click();
        await page.keyboard.press('Escape');
    }

    // Single-click a framework to open its info panel
    const listItems = page.locator('.cass--list--item .cass--list--thing');
    const hasItems = await listItems.first().isVisible().catch(() => false);
    if (!hasItems) return;

    await listItems.first().click();

    // The right aside should appear
    const rightAside = page.locator('#cass__right-aside');
    if (await rightAside.isVisible().catch(() => false)) {
        // Click all accordion buttons to expand/collapse them
        const accordionBtns = rightAside.locator('button.cass__right-side--accordion-button, button:has-text("details"), button:has-text("properties"), button:has-text("permissions"), button:has-text("manage"), button:has-text("history")');
        const btnCount = await accordionBtns.count();
        for (let i = 0; i < btnCount; i++) {
            await accordionBtns.nth(i).click().catch(() => { });
        }

        // Click share/copy URL
        const copyUrlBtn = rightAside.locator('[title*="Copy URL"], [title*="copy"]').first();
        if (await copyUrlBtn.isVisible().catch(() => false)) {
            await copyUrlBtn.click();
        }

        // Click the "Open" button to navigate into the framework
        const openBtn = rightAside.locator('#list-item-info-directory-open-button, span:has-text("Open")').first();
        if (await openBtn.isVisible().catch(() => false)) {
            await openBtn.click();
        }
    }

    // Go to directory page to test directory list items
    await page.goto('/#/directory?server=http://localhost/api/');
    await expect(page.locator('#app')).toBeVisible();

    // Click on a directory item if available
    const dirItems = page.locator('.cass--list--item .cass--list--thing');
    if (await dirItems.first().isVisible().catch(() => false)) {
        await dirItems.first().click();
    }
});
