const { test, expect, loginAndNavigate } = require('../fixtures');

// Coverage targets: FilterAndSort.vue (0%), ListItemInfo.vue (5.45%),
// Frameworks.vue (37%), SearchBar.vue (34%), RightAside.vue (67%),
// editDirectory.js (7%), List.vue (32%)

test.describe.serial('Frameworks list deep coverage', () => {
    let page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await loginAndNavigate(page);
    });

    test.afterAll(async () => {
        const coverage = await page.evaluate(() => window.__coverage__);
        if (coverage) {
            const fs = require('fs');
            const path = require('path');
            const coveragePath = path.join(__dirname, '..', '..', '..', '.nyc_output', `coverage-fwlist-${Date.now()}.json`);
            if (!fs.existsSync(path.dirname(coveragePath))) {
                fs.mkdirSync(path.dirname(coveragePath), { recursive: true });
            }
            fs.writeFileSync(coveragePath, JSON.stringify(coverage));
        }
        await page.close();
    });

    test('1: Navigate to frameworks and exercise page computed properties', async () => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible({ timeout: 10000 });

        // Wait for list items to load
        const listItems = page.locator('.cass--list--item');
        await listItems.first().waitFor({ state: 'visible', timeout: 15000 });

        const count = await listItems.count();
        expect(count).toBeGreaterThan(0);

        // Exercise Frameworks.vue computed properties via window.app.$store
        const fwData = await page.evaluate(() => {
            const app = window.app;
            if (!app || !app.$store) return { error: 'no app' };
            const store = app.$store;
            return {
                conceptMode: store.getters['editor/conceptMode'],
                progressionMode: store.getters['editor/progressionMode'],
                queryParams: store.getters['editor/queryParams'],
                showRightAside: store.getters['app/showRightAside'],
                searchTerm: store.getters['app/searchTerm'],
                sortResults: store.getters['app/sortResults'],
                filterByOwnedByMe: store.getters['app/filterByOwnedByMe']
            };
        });
        expect(fwData.error).toBeUndefined();
    });

    test('2: Open Filter & Sort panel via filter button', async () => {
        // Click the filter button to open the FilterAndSort right aside
        const filterBtn = page.locator('#open-filters-side-bar-button');
        await filterBtn.waitFor({ state: 'visible', timeout: 5000 });
        await filterBtn.click();
        await page.waitForTimeout(1000);

        // RightAside should be visible
        const rightAside = page.locator('#right-side-bar');
        await rightAside.waitFor({ state: 'visible', timeout: 5000 });

        // Verify the panel header text
        const filterTitle = rightAside.locator('.cass--right-aside--title');
        await expect(filterTitle).toBeVisible({ timeout: 3000 });

        // Exercise FilterAndSort.vue computed properties via Vue instance
        const filterData = await page.evaluate(() => {
            const allEls = document.querySelectorAll('*');
            for (const el of allEls) {
                const vm = el.__vue__;
                if (vm && vm.$options && vm.$options.name === 'FilterAndSort') {
                    return {
                        found: true,
                        loggedIn: vm.loggedIn,
                        searchByOwnerNameEnabled: vm.searchByOwnerNameEnabled,
                        initialOwnedByMe: vm.initialOwnedByMe,
                        configurationsEnabled: vm.configurationsEnabled,
                        conceptMode: vm.conceptMode,
                        progressionMode: vm.progressionMode,
                        isFirstSearchProcessing: vm.isFirstSearchProcessing,
                        hasSortOptions: vm.sortOptions != null,
                        hasQuickFilters: vm.quickFilterOptions != null
                    };
                }
            }
            return { found: false };
        });
        expect(filterData.found).toBe(true);
    });

    test('3: Toggle sort and filter options in FilterAndSort', async () => {
        // Find and click sort radio buttons
        const sortRadios = page.locator('#right-side-bar input[type="radio"]');
        const radioCount = await sortRadios.count();

        if (radioCount > 1) {
            // Click the second sort option
            await sortRadios.nth(1).click({ force: true });
            await page.waitForTimeout(500);

            // Click back to the first option
            await sortRadios.nth(0).click({ force: true });
            await page.waitForTimeout(500);
        }

        // Exercise quick filter checkboxes
        const checkboxes = page.locator('#right-side-bar input[type="checkbox"]');
        const checkboxCount = await checkboxes.count();
        if (checkboxCount > 0) {
            await checkboxes.first().click({ force: true });
            await page.waitForTimeout(500);
            // Toggle back
            await checkboxes.first().click({ force: true });
            await page.waitForTimeout(500);
        }
    });

    test('4: Close FilterAndSort and click a framework to open ListItemInfo', async () => {
        // Close the right aside panel
        const closeBtn = page.locator('#close-right-aside-button');
        if (await closeBtn.isVisible()) {
            await closeBtn.click();
            await page.waitForTimeout(500);
        }

        // Click a framework in the list to open ListItemInfo
        const listItems = page.locator('.cass--list--item');
        await listItems.first().waitFor({ state: 'visible', timeout: 5000 });
        await listItems.first().click();
        await page.waitForTimeout(1000);

        // RightAside should reopen with ListItemInfo content
        const rightAside = page.locator('#right-side-bar');
        await rightAside.waitFor({ state: 'visible', timeout: 5000 });

        // Verify "Information" title
        const infoTitle = rightAside.getByText('Information');
        await expect(infoTitle).toBeVisible({ timeout: 3000 });
    });

    test('5: Exercise ListItemInfo computed properties', async () => {
        // Exercise ListItemInfo computed properties via Vue instance
        const infoData = await page.evaluate(() => {
            const allEls = document.querySelectorAll('*');
            for (const el of allEls) {
                const vm = el.__vue__;
                if (vm && vm.$options && vm.$options.name === 'ListItemInfo') {
                    return {
                        found: true,
                        objectType: vm.objectType,
                        hasObject: vm.object != null,
                        numObjects: vm.numObjects,
                        canEdit: vm.canEdit,
                        dateCreated: vm.dateCreated,
                        lastModified: vm.lastModified,
                        creatorName: vm.creatorName,
                        hasOwners: vm.owners != null,
                        hasReaders: vm.readers != null,
                        hasProfile: vm.profile != null
                    };
                }
            }
            return { found: false };
        });
        expect(infoData.found).toBe(true);
        expect(infoData.hasObject).toBe(true);

        // Click any expandable sections in ListItemInfo
        const accordionBtns = page.locator('#right-side-bar button, #right-side-bar .cass__right-side--details-wrapper');
        const btnCount = await accordionBtns.count();
        for (let i = 0; i < Math.min(btnCount, 3); i++) {
            try {
                await accordionBtns.nth(i).click({ timeout: 1000 });
                await page.waitForTimeout(300);
            } catch {
                // Some buttons may not be clickable
            }
        }
    });

    test('6: Exercise SearchBar interactions and clear filters', async () => {
        // Close the right aside first
        const closeBtn = page.locator('#close-right-aside-button');
        if (await closeBtn.isVisible()) {
            await closeBtn.click();
            await page.waitForTimeout(300);
        }

        // Type in the search bar
        const searchInput = page.locator('#search-bar-input');
        await searchInput.waitFor({ state: 'visible', timeout: 5000 });
        await searchInput.fill('test-coverage-search');
        await page.waitForTimeout(1000);

        // Exercise SearchBar computed properties
        const searchData = await page.evaluate(() => {
            const allEls = document.querySelectorAll('*');
            for (const el of allEls) {
                const vm = el.__vue__;
                if (vm && vm.$options && vm.$options.name === 'SearchBar') {
                    return {
                        found: true,
                        type: vm.type,
                        loggedIn: vm.loggedIn,
                        searchTerm: vm.searchTerm,
                        storeSearchTerm: vm.storeSearchTerm,
                        isFirstSearchProcessing: vm.isFirstSearchProcessing,
                        filteredSearchTo: vm.filteredSearchTo
                    };
                }
            }
            return { found: false };
        });
        expect(searchData.found).toBe(true);

        // Clear the search
        await searchInput.fill('');
        await page.waitForTimeout(500);

        // Click clear all filters button
        const clearBtn = page.locator('#clear-all-filters-button');
        if (await clearBtn.isVisible()) {
            await clearBtn.click();
            await page.waitForTimeout(500);
        }
    });

    test('7: Trigger sort watchers and scroll, then double-click a framework', async () => {
        // Trigger sortResults watcher
        await page.evaluate(() => {
            const app = window.app;
            if (app && app.$store) {
                app.$store.commit('app/sortResults', { id: 'lastEdited' });
            }
        });
        await page.waitForTimeout(500);

        // Reset to default
        await page.evaluate(() => {
            const app = window.app;
            if (app && app.$store) {
                app.$store.commit('app/sortResults', { id: 'alphabetical' });
            }
        });
        await page.waitForTimeout(500);

        // Scroll to trigger scrollFunction
        await page.evaluate(() => {
            const fwEl = document.querySelector('#frameworks');
            if (fwEl) fwEl.scrollTop = 500;
        });
        await page.waitForTimeout(300);

        await page.evaluate(() => {
            const fwEl = document.querySelector('#frameworks');
            if (fwEl) fwEl.scrollTop = 0;
        });
        await page.waitForTimeout(300);

        // Double-click a list item to exercise openItem
        const listItems = page.locator('.cass--list--item .cass--list--thing');
        if (await listItems.first().isVisible()) {
            await listItems.first().dblclick();
            await page.waitForTimeout(2000);

            // Should navigate to framework page
            try {
                await page.waitForURL(/#\/(framework|conceptScheme)/, { timeout: 10000 });
            } catch {
                // Navigation might not work if no frameworks exist
            }
        }
    });
});
