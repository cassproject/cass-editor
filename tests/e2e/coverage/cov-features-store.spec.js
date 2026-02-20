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
            const store = window.app && window.app.$store;
            if (!store) return null;
            const r = {};

            // Read defaults
            r.defaultCrosswalk = store.state.featuresEnabled.crosswalkEnabled;
            r.defaultUserMgmt = store.state.featuresEnabled.userManagementEnabled;
            r.defaultConfigs = store.state.featuresEnabled.configurationsEnabled;
            r.defaultSearchOwner = store.state.featuresEnabled.searchByOwnerNameEnabled;
            r.defaultPlugins = store.state.featuresEnabled.pluginsEnabled;
            r.defaultLogin = store.state.featuresEnabled.loginEnabled;
            r.defaultLegacy = store.getters['featuresEnabled/legacyLoginEnabled'];
            r.defaultApi = store.getters['featuresEnabled/apiLoginEnabled'];
            r.defaultShare = store.state.featuresEnabled.shareEnabled;
            r.defaultShareLink = store.state.featuresEnabled.shareLink;
            r.defaultOwned = store.getters['featuresEnabled/ownedByMe'];

            // Toggle all off
            store.commit('featuresEnabled/crosswalkEnabled', false);
            r.crosswalkOff = store.state.featuresEnabled.crosswalkEnabled;

            store.commit('featuresEnabled/userManagementEnabled', false);
            r.userMgmtOff = store.state.featuresEnabled.userManagementEnabled;

            store.commit('featuresEnabled/configurationsEnabled', false);
            r.configsOff = store.state.featuresEnabled.configurationsEnabled;

            store.commit('featuresEnabled/searchByOwnerNameEnabled', false);
            r.searchOwnerOff = store.state.featuresEnabled.searchByOwnerNameEnabled;

            store.commit('featuresEnabled/pluginsEnabled', false);
            r.pluginsOff = store.state.featuresEnabled.pluginsEnabled;

            store.commit('featuresEnabled/loginEnabled', false);
            r.loginOff = store.state.featuresEnabled.loginEnabled;

            store.commit('featuresEnabled/legacyLoginEnabled', false);
            r.legacyOff = store.getters['featuresEnabled/legacyLoginEnabled'];

            store.commit('featuresEnabled/apiLoginEnabled', true);
            r.apiOn = store.getters['featuresEnabled/apiLoginEnabled'];

            store.commit('featuresEnabled/shareEnabled', false);
            r.shareOff = store.state.featuresEnabled.shareEnabled;

            store.commit('featuresEnabled/shareLink', true);
            r.shareLinkOn = store.state.featuresEnabled.shareLink;

            store.commit('featuresEnabled/ownedByMe', true);
            r.ownedOn = store.getters['featuresEnabled/ownedByMe'];

            // Restore defaults
            store.commit('featuresEnabled/crosswalkEnabled', true);
            store.commit('featuresEnabled/userManagementEnabled', true);
            store.commit('featuresEnabled/configurationsEnabled', true);
            store.commit('featuresEnabled/searchByOwnerNameEnabled', true);
            store.commit('featuresEnabled/pluginsEnabled', true);
            store.commit('featuresEnabled/loginEnabled', true);
            store.commit('featuresEnabled/legacyLoginEnabled', true);
            store.commit('featuresEnabled/apiLoginEnabled', false);
            store.commit('featuresEnabled/shareEnabled', true);
            store.commit('featuresEnabled/shareLink', false);
            store.commit('featuresEnabled/ownedByMe', false);

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
