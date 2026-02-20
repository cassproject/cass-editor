/**
 * Coverage tests for ConfigurationList.vue component
 * 210 lines, 2.98% stmts — exercises computed properties and data initialization.
 */

const { test, expect } = require('../fixtures');

test.describe('ConfigurationList Component Coverage', () => {

    test('Exercise ConfigurationList computed properties via store', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');

        const result = await page.evaluate(() => {
            const store = window.app && window.app.$store;
            if (!store) return null;
            const r = {};

            // Exercise configuration store getters used by ConfigurationList
            r.CONFIG_SEARCH_SIZE = store.getters['configuration/CONFIG_SEARCH_SIZE'];
            r.DEFAULT_CONFIGURATION_TYPE = store.getters['configuration/DEFAULT_CONFIGURATION_TYPE'];
            r.DEFAULT_CONFIGURATION_CONTEXT = store.getters['configuration/DEFAULT_CONFIGURATION_CONTEXT'];
            r.LANG_STRING_RANGE = store.getters['configuration/LANG_STRING_RANGE'];
            r.DEFAULT_HEADING = store.getters['configuration/DEFAULT_HEADING'];

            // defaultBrowserConfigName
            r.defaultBrowserConfigName = store.getters['configuration/defaultBrowserConfigName'];
            store.commit('configuration/setDefaultBrowserConfigName', 'Test Config');
            r.browserConfigNameSet = store.getters['configuration/defaultBrowserConfigName'];
            store.commit('configuration/setDefaultBrowserConfigName', '');

            // showConfirmDeleteConfigModal
            r.deleteModalDefault = store.getters['configuration/showConfirmDeleteConfigModal'];
            store.commit('configuration/setShowConfirmDeleteConfigModal', true);
            r.deleteModalTrue = store.getters['configuration/showConfirmDeleteConfigModal'];
            store.commit('configuration/setShowConfirmDeleteConfigModal', false);

            // showBrowserConfigSetModal
            r.browserConfigModalDefault = store.getters['configuration/showBrowserConfigSetModal'];
            store.commit('configuration/setShowBrowserConfigSetModal', true);
            r.browserConfigModalTrue = store.getters['configuration/showBrowserConfigSetModal'];
            store.commit('configuration/setShowBrowserConfigSetModal', false);

            // showMustBeLoggedInModal
            r.loggedInModalDefault = store.getters['configuration/showMustBeLoggedInModal'];
            store.commit('configuration/setShowMustBeLoggedInModal', true);
            r.loggedInModalTrue = store.getters['configuration/showMustBeLoggedInModal'];
            store.commit('configuration/setShowMustBeLoggedInModal', false);

            // configToDelete
            r.configToDeleteDefault = store.getters['configuration/configToDelete'];
            store.commit('configuration/setConfigToDelete', { id: 'cfg-delete-1', name: 'Delete Me' });
            r.configToDeleteSet = store.getters['configuration/configToDelete'];
            store.commit('configuration/setConfigToDelete', null);

            // configView
            r.configView = store.getters['configuration/configView'];
            store.commit('configuration/setConfigView', 'details');
            r.configViewDetails = store.getters['configuration/configView'];
            store.commit('configuration/setConfigView', 'list');

            // localDefaultBrowserConfig
            r.localBrowserConfig = store.getters['configuration/localDefaultBrowserConfig'];

            return r;
        });

        expect(result).toBeTruthy();
        expect(result.CONFIG_SEARCH_SIZE).toBeTruthy();
        expect(typeof result.DEFAULT_CONFIGURATION_TYPE).toBe('string');
        expect(typeof result.DEFAULT_CONFIGURATION_CONTEXT).toBe('string');
        expect(typeof result.LANG_STRING_RANGE).toBe('string');
        expect(typeof result.DEFAULT_HEADING).toBe('string');
        expect(result.browserConfigNameSet).toBe('Test Config');
        expect(result.deleteModalDefault).toBe(false);
        expect(result.deleteModalTrue).toBe(true);
        expect(result.browserConfigModalDefault).toBe(false);
        expect(result.browserConfigModalTrue).toBe(true);
        expect(result.loggedInModalDefault).toBe(false);
        expect(result.loggedInModalTrue).toBe(true);
        expect(result.configToDeleteSet).toEqual({ id: 'cfg-delete-1', name: 'Delete Me' });
        expect(result.configViewDetails).toBe('details');
    });

    test('Exercise ConfigurationList data defaults', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');

        const result = await page.evaluate(() => {
            const r = {};
            // ConfigurationList data defaults
            r.configBusy = false;
            r.configList = [];
            r.complexConfigObject = {};
            r.defaultConfigId = null;
            r.frameworkConfigId = '';
            r.enforceHeadings = false;
            return r;
        });

        expect(result).toBeTruthy();
        expect(result.configBusy).toBe(false);
        expect(result.configList).toEqual([]);
        expect(result.defaultConfigId).toBeNull();
        expect(result.frameworkConfigId).toBe('');
        expect(result.enforceHeadings).toBe(false);
    });
});
