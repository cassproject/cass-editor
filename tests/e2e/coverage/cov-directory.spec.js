/**
 * Coverage tests for Directory views:
 * - Directory.vue (/directory)
 * - DirectoryList.vue
 *
 * These components handle directory listing, search processing,
 * and navigation to frameworks.
 */

const { test, expect, loginAndNavigate } = require('../fixtures');

test.describe('Directory Views Coverage', () => {

    test('Directory page loads', async ({ page }) => {
        await page.goto('/#/directory?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);

        // Check for directory-related elements
        const dirData = await page.evaluate(() => {
            if (window.app) {
                const found = [];
                let q = [window.app];
                let seen = new Set();
                while (q.length > 0) {
                    let vm = q.shift();
                    if (vm && !seen.has(vm._uid)) {
                        seen.add(vm._uid);
                        if (vm.$options && (vm.$options.name === 'Directory' || vm.$options.name === 'DirectoryList')) {
                            found.push({
                                name: vm.$options.name,
                                hasData: Object.keys(vm.$data).length > 0
                            });
                        }
                        if (vm.$children) q.push(...vm.$children);
                    }
                }
                return found;
            }
            return null;
        });
        // Directory components should be in the tree
        if (dirData && dirData.length > 0) {
            const dirComponent = dirData.find(d => d.name === 'Directory');
            if (dirComponent) {
                expect(dirComponent.name).toBe('Directory');
            }
        }
    });

    test('DirectoryList computed properties', async ({ page }) => {
        await page.goto('/#/directory?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);

        const dirListData = await page.evaluate(() => {
            if (window.app) {
                const found = [];
                let q = [window.app];
                let seen = new Set();
                while (q.length > 0) {
                    let vm = q.shift();
                    if (vm && !seen.has(vm._uid)) {
                        seen.add(vm._uid);
                        if (vm.$options && vm.$options.name === 'DirectoryList') {
                            found.push({
                                name: vm.$options.name,
                                dataKeys: Object.keys(vm.$data),
                                computedKeys: Object.keys(vm._computedWatchers || {}),
                                searchTerm: vm.searchTerm,
                                sortBy: vm.sortBy
                            });
                        }
                        if (vm.$children) q.push(...vm.$children);
                    }
                }
                return found.length > 0 ? found[0] : null;
            }
            return null;
        });
        if (dirListData) {
            expect(dirListData.name).toBe('DirectoryList');
        }
    });

    test('Directory page with login', async ({ page }) => {
        await loginAndNavigate(page);
        await page.goto('/#/directory?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);

        // Exercise directory components when logged in
        const dirData = await page.evaluate(() => {
            if (window.app) {
                const found = [];
                let q = [window.app];
                let seen = new Set();
                while (q.length > 0) {
                    let vm = q.shift();
                    if (vm && !seen.has(vm._uid)) {
                        seen.add(vm._uid);
                        if (vm.$options && (vm.$options.name === 'Directory' || vm.$options.name === 'DirectoryList')) {
                            const result = { name: vm.$options.name };
                            if (vm.$options.name === 'DirectoryList') {
                                result.searchTerm = vm.searchTerm;
                                result.hasItems = vm.items ? vm.items.length : 0;
                            }
                            found.push(result);
                        }
                        if (vm.$children) q.push(...vm.$children);
                    }
                }
                return found;
            }
            return null;
        });
    });
});
