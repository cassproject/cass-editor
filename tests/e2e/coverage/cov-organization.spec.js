/**
 * Coverage tests for Organization views:
 * - Organizations.vue (list view at /organizations)
 * - Organization.vue (detail view at /organization)
 * These use the List (LODE) component and common mixin.
 */

const { test, expect, loginAndNavigate } = require('../fixtures');

test.describe('Organization Views Coverage', () => {

    test('Organizations list page loads', async ({ page }) => {
        await page.goto('/#/organizations?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');

        const orgPage = page.locator('.organizations');
        await expect(orgPage).toBeVisible();

        // Verify sort options are visible
        await expect(page.locator('text=Sort alphabetically')).toBeVisible();
        await expect(page.locator('text=Sort by last modified')).toBeVisible();
    });

    test('Organizations Vue data and computed properties', async ({ page }) => {
        await page.goto('/#/organizations?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');
        await expect(page.locator('.organizations')).toBeVisible();

        const vueData = await page.evaluate(() => {
            const el = document.querySelector('.organizations');
            if (el && el.__vue__) {
                const vm = el.__vue__;
                return {
                    name: vm.$options.name,
                    sortBy: vm.sortBy,
                    // computed
                    queryParams: vm.queryParams,
                    searchOptions: typeof vm.searchOptions,
                    paramObj: vm.paramObj,
                    filterByOwnedByMe: vm.filterByOwnedByMe
                };
            }
            return null;
        });
        expect(vueData).toBeTruthy();
        expect(vueData.name).toBe('Organizations');
        expect(vueData.sortBy).toBe('name.keyword');
        expect(vueData.searchOptions).toBe('string');
        expect(vueData.paramObj).toBeTruthy();
        expect(vueData.paramObj.size).toBe(20);
    });

    test('Toggle sort options on organizations page', async ({ page }) => {
        await page.goto('/#/organizations?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');
        await expect(page.locator('.organizations')).toBeVisible();

        // Click sort by last modified
        await page.locator('#schema\\:dateModified').click();
        await page.waitForTimeout(500);

        const sortAfter = await page.evaluate(() => {
            const el = document.querySelector('.organizations');
            if (el && el.__vue__) {
                return {
                    sortBy: el.__vue__.sortBy,
                    paramObj: el.__vue__.paramObj
                };
            }
            return null;
        });
        expect(sortAfter).toBeTruthy();
        expect(sortAfter.sortBy).toBe('schema:dateModified');

        // Switch back to alphabetical
        await page.locator('#name\\.keyword').click();
        await page.waitForTimeout(500);

        const sortBack = await page.evaluate(() => {
            const el = document.querySelector('.organizations');
            return el && el.__vue__ ? el.__vue__.sortBy : null;
        });
        expect(sortBack).toBe('name.keyword');
    });

    test('Organizations page exercises common mixin', async ({ page }) => {
        await page.goto('/#/organizations?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');
        await expect(page.locator('.organizations')).toBeVisible();

        // Exercise common mixin methods that Organizations uses
        const mixinData = await page.evaluate(() => {
            const el = document.querySelector('.organizations');
            if (el && el.__vue__) {
                const vm = el.__vue__;
                return {
                    hasGetName: typeof vm.getName === 'function',
                    hasOrganizationClick: typeof vm.organizationClick === 'function',
                    hasSpitEvent: typeof vm.spitEvent === 'function',
                    hasResolveNameFromUrl: typeof vm.resolveNameFromUrl === 'function'
                };
            }
            return null;
        });
        expect(mixinData).toBeTruthy();
        expect(mixinData.hasGetName).toBe(true);
        expect(mixinData.hasOrganizationClick).toBe(true);
    });
});
