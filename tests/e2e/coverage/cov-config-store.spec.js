/**
 * Coverage tests for configuration.js store module
 * Currently at 60% stmts — exercises all mutations and getters.
 */

const { test, expect } = require('../fixtures');

test.describe('Configuration Store Coverage', () => {

    test('Exercise configuration store mutations and getters', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');

        const result = await page.evaluate(() => {
            const store = window.app && window.app.$store;
            if (!store) return null;
            const r = {};

            // Read constant getters
            r.searchSize = store.getters['configuration/CONFIG_SEARCH_SIZE'];
            r.levelSearchSize = store.getters['configuration/LEVEL_SEARCH_SIZE'];
            r.personSearchSize = store.getters['configuration/PERSON_SEARCH_SIZE'];
            r.configType = store.getters['configuration/DEFAULT_CONFIGURATION_TYPE'];
            r.configContext = store.getters['configuration/DEFAULT_CONFIGURATION_CONTEXT'];
            r.langStringRange = store.getters['configuration/LANG_STRING_RANGE'];
            r.defaultHeading = store.getters['configuration/DEFAULT_HEADING'];
            r.customPropContext = store.getters['configuration/DEFAULT_CUSTOM_PROPERTY_CONTEXT'];
            r.customPropRange = store.getters['configuration/DEFAULT_CUSTOM_PROPERTY_RANGE'];

            // Exercise config view mutations
            store.commit('configuration/setConfigView', 'detail');
            r.configView = store.getters['configuration/configView'];
            store.commit('configuration/setConfigView', 'list');

            store.commit('configuration/setConfigBusy', true);
            r.configBusy = store.getters['configuration/configBusy'];
            store.commit('configuration/setConfigBusy', false);

            store.commit('configuration/setCurrentConfig', { name: 'Test Config', id: 'cfg-1' });
            r.currentConfig = store.getters['configuration/currentConfig'];
            store.commit('configuration/setCurrentConfig', {});

            store.commit('configuration/setConfigList', [{ name: 'Config A' }, { name: 'Config B' }]);
            r.configList = store.getters['configuration/configList'];

            store.commit('configuration/setDefaultBrowserConfig', 'cfg-default');
            r.browserConfig = store.getters['configuration/defaultBrowserConfig'];
            store.commit('configuration/setDefaultBrowserConfig', '');

            store.commit('configuration/setDefaultBrowserConfigName', 'Default Config');
            r.browserConfigName = store.getters['configuration/defaultBrowserConfigName'];
            store.commit('configuration/setDefaultBrowserConfigName', '');

            store.commit('configuration/setLocalDefaultBrowserConfig', 'local-cfg');
            r.localBrowserConfig = store.getters['configuration/localDefaultBrowserConfig'];
            store.commit('configuration/setLocalDefaultBrowserConfig', '');

            // Modal mutations
            store.commit('configuration/setShowConfirmDeleteConfigModal', true);
            r.showDeleteModal = store.getters['configuration/showConfirmDeleteConfigModal'];
            store.commit('configuration/setShowConfirmDeleteConfigModal', false);

            store.commit('configuration/setShowMustBeLoggedInModal', true);
            r.showLoginModal = store.getters['configuration/showMustBeLoggedInModal'];
            store.commit('configuration/setShowMustBeLoggedInModal', false);

            store.commit('configuration/setShowBrowserConfigSetModal', true);
            r.showBrowserModal = store.getters['configuration/showBrowserConfigSetModal'];
            store.commit('configuration/setShowBrowserConfigSetModal', false);

            store.commit('configuration/setConfigToDelete', { id: 'del-cfg' });
            r.configToDelete = store.getters['configuration/configToDelete'];
            store.commit('configuration/setConfigToDelete', {});

            // Available concepts
            store.commit('configuration/setAvailableConcepts', ['concept-a', 'concept-b']);
            r.concepts = store.getters['configuration/availableConcepts'];

            // Available types
            store.commit('configuration/setAvailableTypes', ['type-a']);
            r.types = store.getters['configuration/availableTypes'];

            return r;
        });

        expect(result).toBeTruthy();
        // Constants
        expect(result.searchSize).toBe(10000);
        expect(result.levelSearchSize).toBe(10000);
        expect(result.personSearchSize).toBe(10000);
        expect(result.configType).toBe('Configuration');
        expect(result.configContext).toBe('https://schema.cassproject.org/0.4/');
        expect(result.langStringRange).toBe('http://www.w3.org/2000/01/rdf-schema#langString');
        expect(result.defaultHeading).toBe('General');
        expect(result.customPropContext).toBe('https://schema.cassproject.org/0.4/');
        expect(result.customPropRange).toBe('http://schema.org/Text');

        // Mutations
        expect(result.configView).toBe('detail');
        expect(result.configBusy).toBe(true);
        expect(result.currentConfig.name).toBe('Test Config');
        expect(result.browserConfig).toBe('cfg-default');
        expect(result.browserConfigName).toBe('Default Config');
        expect(result.localBrowserConfig).toBe('local-cfg');
        expect(result.showDeleteModal).toBe(true);
        expect(result.showLoginModal).toBe(true);
        expect(result.showBrowserModal).toBe(true);
        expect(result.configToDelete.id).toBe('del-cfg');
        expect(result.concepts.length).toBe(2);
        expect(result.types.length).toBe(1);
    });
});
