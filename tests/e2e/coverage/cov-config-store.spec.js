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
            const store = window.__stores;
            if (!store) return null;
            const r = {};

            // Read constant getters
            r.searchSize = store.configuration.CONFIG_SEARCH_SIZE;
            r.levelSearchSize = store.configuration.LEVEL_SEARCH_SIZE;
            r.personSearchSize = store.configuration.PERSON_SEARCH_SIZE;
            r.configType = store.configuration.DEFAULT_CONFIGURATION_TYPE;
            r.configContext = store.configuration.DEFAULT_CONFIGURATION_CONTEXT;
            r.langStringRange = store.configuration.LANG_STRING_RANGE;
            r.defaultHeading = store.configuration.DEFAULT_HEADING;
            r.customPropContext = store.configuration.DEFAULT_CUSTOM_PROPERTY_CONTEXT;
            r.customPropRange = store.configuration.DEFAULT_CUSTOM_PROPERTY_RANGE;

            // Exercise config view mutations
            store.configuration.setConfigView( 'detail');
            r.configView = store.configuration.configView;
            store.configuration.setConfigView( 'list');

            store.configuration.setConfigBusy( true);
            r.configBusy = store.configuration.configBusy;
            store.configuration.setConfigBusy( false);

            store.configuration.setCurrentConfig( { name: 'Test Config', id: 'cfg-1' });
            r.currentConfig = store.configuration.currentConfig;
            store.configuration.setCurrentConfig( {});

            store.configuration.setConfigList( [{ name: 'Config A' }, { name: 'Config B' }]);
            r.configList = store.configuration.configList;

            store.configuration.setDefaultBrowserConfig( 'cfg-default');
            r.browserConfig = store.configuration.defaultBrowserConfig;
            store.configuration.setDefaultBrowserConfig( '');

            store.configuration.setDefaultBrowserConfigName( 'Default Config');
            r.browserConfigName = store.configuration.defaultBrowserConfigName;
            store.configuration.setDefaultBrowserConfigName( '');

            store.configuration.setLocalDefaultBrowserConfig( 'local-cfg');
            r.localBrowserConfig = store.configuration.localDefaultBrowserConfig;
            store.configuration.setLocalDefaultBrowserConfig( '');

            // Modal mutations
            store.configuration.setShowConfirmDeleteConfigModal( true);
            r.showDeleteModal = store.configuration.showConfirmDeleteConfigModal;
            store.configuration.setShowConfirmDeleteConfigModal( false);

            store.configuration.setShowMustBeLoggedInModal( true);
            r.showLoginModal = store.configuration.showMustBeLoggedInModal;
            store.configuration.setShowMustBeLoggedInModal( false);

            store.configuration.setShowBrowserConfigSetModal( true);
            r.showBrowserModal = store.configuration.showBrowserConfigSetModal;
            store.configuration.setShowBrowserConfigSetModal( false);

            store.configuration.setConfigToDelete( { id: 'del-cfg' });
            r.configToDelete = store.configuration.configToDelete;
            store.configuration.setConfigToDelete( {});

            // Available concepts
            store.configuration.setAvailableConcepts( ['concept-a', 'concept-b']);
            r.concepts = store.configuration.availableConcepts;

            // Available types
            store.configuration.setAvailableTypes( ['type-a']);
            r.types = store.configuration.availableTypes;

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
