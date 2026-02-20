/**
 * Coverage tests for ListItemInfo.vue component
 * 1693 lines, 9.02% stmts — exercises data initialization and computed properties.
 */

const { test, expect } = require('@playwright/test');
const { loginAndNavigate } = require('../fixtures');

test.describe('Coverage: ListItemInfo.vue', () => {
    test.beforeEach(async ({ page }) => {
        await loginAndNavigate(page);
    });

    test('exercises ListItemInfo component via UI interactions', async ({ page }) => {
        // 1. Navigate to frameworks list
        await page.goto('/#/frameworks');
        await page.waitForSelector('#frameworks', { state: 'visible' });

        // Wait for list to populate
        await page.waitForSelector('.cass--list--item', { state: 'visible' });

        // 2. Click a framework list item to open Right Aside (ListItemInfo)
        const firstFrameworkItem = page.locator('.cass--list--item').first();
        await firstFrameworkItem.waitFor({ state: 'visible' });
        await firstFrameworkItem.click();

        // 3. Verify right aside opens
        const rightAside = page.locator('#cass__right-aside');
        await expect(rightAside).toBeVisible();

        // 4. Interact with Accordions
        const detailsBtn = page.locator('#list-item-info-details-accordion-button');
        if (await detailsBtn.isVisible()) {
            await detailsBtn.click();
        }

        const propsBtn = page.locator('#list-item-info-properties-accordion-button');
        if (await propsBtn.isVisible()) {
            await propsBtn.click();
        }

        const descBtn = page.locator('#list-item-info-description-accordion-button');
        if (await descBtn.isVisible()) {
            await descBtn.click();
        }

        // 5. Click "Open Component" button from Right Aside
        const openBtn = page.locator('#list-item-info-open-object-button');
        if (await openBtn.isVisible()) {
            await openBtn.click();
            // It could be a directory or a framework depending on what was clicked first
            await page.waitForTimeout(1000);
            await page.goto('/#/frameworks');
            await page.waitForSelector('.cass--list--item', { state: 'visible' });
        }

        // 6. Test on a Competency inside the framework
        const firstCompInfo = page.locator('.lode__list-item .fa-info-circle').first();
        if (await firstCompInfo.count() > 0) {
            await firstCompInfo.click();
            await expect(rightAside).toBeVisible();

            if (await detailsBtn.isVisible()) await detailsBtn.click();
            if (await descBtn.isVisible()) await descBtn.click();
        }
    });
});
