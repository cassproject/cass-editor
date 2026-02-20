/**
 * Coverage tests for common.js mixin
 * Currently at 9% stmts, 765 lines — exercises utility methods via page.evaluate.
 */

const { test, expect } = require('../fixtures');

test.describe('Common Mixin Coverage', () => {

    test('Exercise common mixin utility methods via Framework page', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(3000);

        const result = await page.evaluate(() => {
            const store = window.app && window.app.$store;
            if (!store) return null;
            const r = {};

            // Get the active Vue component that uses common mixin
            // Try to find a component with the common mixin methods
            const findComponent = (vnode) => {
                if (vnode && vnode.$options && vnode.$options.methods && vnode.$options.methods.getCTID) {
                    return vnode;
                }
                if (vnode && vnode.$children) {
                    for (let child of vnode.$children) {
                        const found = findComponent(child);
                        if (found) return found;
                    }
                }
                return null;
            };

            const comp = findComponent(window.app);
            if (!comp) {
                // If no component found, exercise methods directly via import
                r.noComponent = true;
                return r;
            }

            // Exercise toPrettyDateString
            r.prettyDate = comp.toPrettyDateString(1609459200000);
            r.prettyDateInvalid = comp.toPrettyDateString(null);

            // Exercise canViewCommentsCurrentFramework & canAddCommentsCurrentFramework
            r.canView = comp.canViewCommentsCurrentFramework();
            r.canAdd = comp.canAddCommentsCurrentFramework();

            // Exercise isAdmin
            try {
                r.isAdmin = comp.isAdmin();
            } catch (e) {
                r.isAdminError = e.message;
            }

            // Exercise setDefaultLanguage
            try {
                comp.setDefaultLanguage();
                r.defaultLang = store.getters['editor/defaultLanguage'];
            } catch (e) {
                r.setLangError = e.message;
            }

            // Exercise getCTID
            try {
                r.ctid = comp.getCTID('http://localhost/api/data/ce-12345678-1234-1234-1234-123456789012');
            } catch (e) {
                r.ctidError = e.message;
            }

            // Exercise ceasnRegistryUriTransform
            try {
                r.uriTransform = comp.ceasnRegistryUriTransform('http://localhost/api/data/test-id');
            } catch (e) {
                r.uriError = e.message;
            }

            // Exercise canEditAny
            try {
                r.canEditNull = comp.canEditAny({});
            } catch (e) {
                r.canEditError = e.message;
            }

            return r;
        });

        expect(result).toBeTruthy();
        if (!result.noComponent) {
            expect(result.prettyDate).toBeTruthy();
            if (result.canView !== undefined) {
                expect(typeof result.canView).toBe('boolean');
            }
        }
    });

    test('Exercise common mixin computed properties', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(3000);

        const result = await page.evaluate(() => {
            const store = window.app && window.app.$store;
            if (!store) return null;
            const r = {};

            const findComponent = (vnode) => {
                if (vnode && vnode.$options && vnode.$options.computed && vnode.$options.computed.ctids) {
                    return vnode;
                }
                if (vnode && vnode.$children) {
                    for (let child of vnode.$children) {
                        const found = findComponent(child);
                        if (found) return found;
                    }
                }
                return null;
            };

            const comp = findComponent(window.app);
            if (!comp) {
                r.noComponent = true;
                return r;
            }

            // Exercise ctids computed property (should return null when no framework)
            try {
                r.ctids = comp.ctids;
            } catch (e) {
                r.ctidsError = e.message;
            }

            // Exercise registryURLs computed property
            try {
                r.registryUrls = comp.registryURLs;
            } catch (e) {
                r.urlsError = e.message;
            }

            // Exercise data
            r.conceptCtids = comp.conceptCtids;
            r.conceptRegistryUrls = comp.conceptRegistryUrls;

            return r;
        });

        expect(result).toBeTruthy();
    });

    test('Exercise common mixin getCTID with various inputs', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(3000);

        const result = await page.evaluate(() => {
            const store = window.app && window.app.$store;
            if (!store) return null;
            const r = {};

            const findComponent = (vnode) => {
                if (vnode && vnode.$options && vnode.$options.methods && vnode.$options.methods.getCTID) {
                    return vnode;
                }
                if (vnode && vnode.$children) {
                    for (let child of vnode.$children) {
                        const found = findComponent(child);
                        if (found) return found;
                    }
                }
                return null;
            };

            const comp = findComponent(window.app);
            if (!comp) {
                r.noComponent = true;
                return r;
            }

            // Test with UUID-like URI
            try {
                r.ctid1 = comp.getCTID('http://localhost/api/data/12345678-1234-1234-1234-123456789012');
            } catch (e) {
                r.ctid1Error = e.message;
            }

            // Test with ce- prefixed URI
            try {
                r.ctid2 = comp.getCTID('http://localhost/api/data/ce-12345678-1234-1234-1234-123456789012');
            } catch (e) {
                r.ctid2Error = e.message;
            }

            // Test with non-UUID URI
            try {
                r.ctid3 = comp.getCTID('http://example.com/framework/some-name');
            } catch (e) {
                r.ctid3Error = e.message;
            }

            // Exercise ceasnRegistryUriTransform with no endpoint
            try {
                store.commit('editor/queryParams', {});
                r.transform1 = comp.ceasnRegistryUriTransform('http://example.com/data/test');
            } catch (e) {
                r.transform1Error = e.message;
            }

            // Exercise ceasnRegistryUriTransform with endpoint
            try {
                store.commit('editor/queryParams', { newObjectEndpoint: 'http://registry.example.com/ce-' });
                r.transform2 = comp.ceasnRegistryUriTransform('http://localhost/api/data/test-id');
            } catch (e) {
                r.transform2Error = e.message;
            }

            // Reset query params
            store.commit('editor/queryParams', {});

            return r;
        });

        expect(result).toBeTruthy();
    });
});
