/**
 * Coverage tests for featuresEnabled.js store module
 * Currently at 47% stmts — exercises all 11 feature flag mutations and getters.
 */

const { test, expect } = require('../fixtures');

test.describe('Features Enabled Store Coverage', () => {

    test('Exercise all feature flag mutations', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');

        const result = await page.evaluate(() => {
            const store = window.__stores;
            if (!store) return null;
            const r = {};

            // Read defaults
            r.defaultCrosswalk = store.featuresEnabled.crosswalkEnabled;
            r.defaultUserMgmt = store.featuresEnabled.userManagementEnabled;
            r.defaultConfigs = store.featuresEnabled.configurationsEnabled;
            r.defaultSearchOwner = store.featuresEnabled.searchByOwnerNameEnabled;
            r.defaultPlugins = store.featuresEnabled.pluginsEnabled;
            r.defaultLogin = store.featuresEnabled.loginEnabled;
            r.defaultLegacy = store.featuresEnabled.legacyLoginEnabled;
            r.defaultApi = store.featuresEnabled.apiLoginEnabled;
            r.defaultShare = store.featuresEnabled.shareEnabled;
            r.defaultShareLink = store.featuresEnabled.shareLink;
            r.defaultOwned = store.featuresEnabled.ownedByMe;

            // Toggle all off
            store.featuresEnabled.setCrosswalkEnabled( false);
            r.crosswalkOff = store.featuresEnabled.crosswalkEnabled;

            store.featuresEnabled.setUserManagementEnabled( false);
            r.userMgmtOff = store.featuresEnabled.userManagementEnabled;

            store.featuresEnabled.setConfigurationsEnabled( false);
            r.configsOff = store.featuresEnabled.configurationsEnabled;

            store.featuresEnabled.setSearchByOwnerNameEnabled( false);
            r.searchOwnerOff = store.featuresEnabled.searchByOwnerNameEnabled;

            store.featuresEnabled.setPluginsEnabled( false);
            r.pluginsOff = store.featuresEnabled.pluginsEnabled;

            store.featuresEnabled.setLoginEnabled( false);
            r.loginOff = store.featuresEnabled.loginEnabled;

            store.featuresEnabled.setLegacyLoginEnabled( false);
            r.legacyOff = store.featuresEnabled.legacyLoginEnabled;

            store.featuresEnabled.setApiLoginEnabled( true);
            r.apiOn = store.featuresEnabled.apiLoginEnabled;

            store.featuresEnabled.setShareEnabled( false);
            r.shareOff = store.featuresEnabled.shareEnabled;

            store.featuresEnabled.setShareLink( true);
            r.shareLinkOn = store.featuresEnabled.shareLink;

            store.featuresEnabled.setOwnedByMe( true);
            r.ownedOn = store.featuresEnabled.ownedByMe;

            // Restore defaults
            store.featuresEnabled.setCrosswalkEnabled( true);
            store.featuresEnabled.setUserManagementEnabled( true);
            store.featuresEnabled.setConfigurationsEnabled( true);
            store.featuresEnabled.setSearchByOwnerNameEnabled( true);
            store.featuresEnabled.setPluginsEnabled( true);
            store.featuresEnabled.setLoginEnabled( true);
            store.featuresEnabled.setLegacyLoginEnabled( true);
            store.featuresEnabled.setApiLoginEnabled( false);
            store.featuresEnabled.setShareEnabled( true);
            store.featuresEnabled.setShareLink( false);
            store.featuresEnabled.setOwnedByMe( false);

            return r;
        });

        expect(result).toBeTruthy();
        // Defaults
        expect(result.defaultCrosswalk).toBe(true);
        expect(result.defaultUserMgmt).toBe(true);
        expect(result.defaultConfigs).toBe(true);
        expect(result.defaultSearchOwner).toBe(true);
        expect(result.defaultPlugins).toBe(true);
        expect(result.defaultLogin).toBe(true);
        expect(result.defaultLegacy).toBe(true);
        expect(result.defaultApi).toBe(false);
        expect(result.defaultShare).toBe(true);
        expect(result.defaultShareLink).toBe(false);
        expect(result.defaultOwned).toBe(false);

        // Toggled values
        expect(result.crosswalkOff).toBe(false);
        expect(result.userMgmtOff).toBe(false);
        expect(result.configsOff).toBe(false);
        expect(result.searchOwnerOff).toBe(false);
        expect(result.pluginsOff).toBe(false);
        expect(result.loginOff).toBe(false);
        expect(result.legacyOff).toBe(false);
        expect(result.apiOn).toBe(true);
        expect(result.shareOff).toBe(false);
        expect(result.shareLinkOn).toBe(true);
        expect(result.ownedOn).toBe(true);
    });
});
