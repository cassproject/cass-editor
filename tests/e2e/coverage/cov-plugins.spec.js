/**
 * Coverage tests for PluginManager.vue and related plugin components.
 * PluginManager uses pluginUtil mixin (23.03%) and has its own data/computed.
 */

const { test, expect, loginAndNavigate } = require('../fixtures');

test.describe('Plugins Coverage', () => {

    test('Plugin Manager page loads', async ({ page }) => {
        await page.goto('/#/pluginManager?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');

        const pluginManager = page.locator('#plugin-manager');
        await expect(pluginManager).toBeVisible();

        // Verify title and description
        await expect(page.locator('text=Plugin Management')).toBeVisible();
        await expect(page.locator('text=Plugins provide the capability')).toBeVisible();
    });

    test('PluginManager data and computed properties', async ({ page }) => {
        await page.goto('/#/pluginManager?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');
        await expect(page.locator('#plugin-manager')).toBeVisible();

        // Wait for plugin list to finish building
        await page.waitForTimeout(2000);

        const vueData = await page.evaluate(() => {
            const el = document.querySelector('#plugin-manager');
            if (el && el.__vue__) {
                const vm = el.__vue__;
                return {
                    name: vm.$options.name,
                    pluginManagerBusy: vm.pluginManagerBusy,
                    pluginManagerViewMode: vm.pluginManagerViewMode,
                    showConfirmDeletePluginModal: vm.showConfirmDeletePluginModal,
                    pluginListLength: vm.pluginList ? vm.pluginList.length : 0,
                    // computed
                    currentPluginIsReadOnly: vm.currentPluginIsReadOnly,
                    curatedPlugins: vm.curatedPlugins
                };
            }
            return null;
        });
        expect(vueData).toBeTruthy();
        expect(vueData.name).toBe('PluginManager');
        expect(vueData.pluginManagerViewMode).toBe('list');
        expect(vueData.showConfirmDeletePluginModal).toBe(false);
    });

    test('Add new plugin button navigates to detail view', async ({ page }) => {
        await page.goto('/#/pluginManager?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');
        await expect(page.locator('#plugin-manager')).toBeVisible();

        // Wait for plugin list to load
        await page.waitForTimeout(2000);

        const addBtn = page.locator('#plugin-manager-add-new-plugin-button');
        if (await addBtn.isVisible()) {
            await addBtn.click();
            await page.waitForTimeout(500);

            // Should be in detail view now
            const viewMode = await page.evaluate(() => {
                const el = document.querySelector('#plugin-manager');
                return el && el.__vue__ ? el.__vue__.pluginManagerViewMode : null;
            });
            expect(viewMode).toBe('detail');
        }
    });

    test('Exercise pluginUtil mixin methods', async ({ page }) => {
        await page.goto('/#/pluginManager?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');
        await expect(page.locator('#plugin-manager')).toBeVisible();
        await page.waitForTimeout(2000);

        // Exercise various pluginUtil methods through the Vue component
        const methodResults = await page.evaluate(() => {
            const el = document.querySelector('#plugin-manager');
            if (!el || !el.__vue__) return null;
            const vm = el.__vue__;
            const results = {};

            // Exercise generateNewPluginObject
            const newPlugin = vm.generateNewPluginObject();
            results.newPlugin = newPlugin;

            // Exercise showListView and showDetailView
            vm.showDetailView();
            results.afterDetail = vm.pluginManagerViewMode;
            vm.showListView();
            results.afterList = vm.pluginManagerViewMode;

            // Exercise cancelPluginDelete
            vm.showConfirmDeletePluginModal = true;
            vm.cancelPluginDelete();
            results.afterCancelDelete = vm.showConfirmDeletePluginModal;

            // Exercise backFromEditCurrentPlugin
            vm.pluginManagerViewMode = 'detail';
            vm.backFromEditCurrentPlugin();
            results.afterBack = vm.pluginManagerViewMode;

            return results;
        });
        expect(methodResults).toBeTruthy();
        expect(methodResults.newPlugin.id).toBe('newPluginId');
        expect(methodResults.newPlugin.url).toBe('');
        expect(methodResults.newPlugin.isCurated).toBe(false);
        expect(methodResults.newPlugin.isOwned).toBe(true);
        expect(methodResults.afterDetail).toBe('detail');
        expect(methodResults.afterList).toBe('list');
        expect(methodResults.afterCancelDelete).toBe(false);
        expect(methodResults.afterBack).toBe('list');
    });
});
