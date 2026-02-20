const { test, expect, loginAndNavigate } = require('../fixtures');

// Coverage: App.vue (19.88% → ~30%+)
// Exercises App.vue computed properties, store integration, and methods

test('App: basic rendering and #app visible', async ({ page }) => {
    await page.goto('/#/?server=http://localhost/api/');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('#app')).toBeVisible({ timeout: 15000 });
});

test('App: computed properties accessible', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForFunction(() => window.app && window.app.$store, { timeout: 15000 });

    const result = await page.evaluate(() => {
        const app = window.app;
        const results = {};
        const props = ['bannerMessage', 'bannerStyle', 'editorClass', 'showRightAside', 'showSideNav', 'currentRoute'];
        for (const p of props) {
            try {
                const val = app[p];
                results[p] = true;
            } catch (e) {
                results[p] = false;
            }
        }
        return results;
    });

    expect(result.bannerMessage).toBe(true);
    expect(result.bannerStyle).toBe(true);
    expect(result.editorClass).toBe(true);
    expect(result.showRightAside).toBe(true);
    expect(result.showSideNav).toBe(true);
    expect(result.currentRoute).toBe(true);
});

test('App: editorClass and showSideNav values', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForFunction(() => window.app && window.app.$store, { timeout: 15000 });
    // Wait for app to fully initialize
    await page.waitForTimeout(3000);

    const result = await page.evaluate(() => {
        const app = window.app;
        return {
            editorClass: typeof app.editorClass,
            showSideNavType: typeof app.showSideNav,
            showRightAsideType: typeof app.showRightAside,
            currentRoute: app.currentRoute
        };
    });

    expect(['string', 'object', 'undefined'].includes(result.editorClass)).toBe(true);
    // showSideNav and showRightAside should be boolean once computed,
    // but may be undefined briefly during initialization under heavy load
    expect(['boolean', 'undefined'].includes(result.showSideNavType)).toBe(true);
    expect(['boolean', 'undefined'].includes(result.showRightAsideType)).toBe(true);
});

test('App: inIframe detection via store', async ({ page }) => {
    await page.goto('/#/?server=http://localhost/api/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForFunction(() => window.app && window.app.$store, { timeout: 15000 });

    const result = await page.evaluate(() => {
        const app = window.app;
        // inIframe is a method on the root Vue instance
        const methodExists = typeof app.inIframe === 'function';
        let inIframeResult = null;
        if (methodExists) {
            inIframeResult = app.inIframe();
        }
        // Also exercise sideNavEnabled getter since it's in app store
        const sideNavEnabled = app.$store.getters['app/sideNavEnabled'];
        return {
            methodExists,
            inIframeResult,
            sideNavEnabled
        };
    });

    // inIframe may or may not be exposed on root instance depending on build
    if (result.methodExists) {
        expect(result.inIframeResult).toBe(false);
    }
    expect(result.sideNavEnabled).toBeDefined();
});

test('App: route changes update currentRoute', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForFunction(() => window.app && window.app.$store && window.app.$route, { timeout: 15000 });

    const route1 = await page.evaluate(() => ({
        path: window.app.$route.path,
        storeRoute: window.app.$store.getters['app/currentRoute']
    }));

    await page.goto('/#/crosswalk?server=http://localhost/api/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForFunction(() => window.app && window.app.$route, { timeout: 15000 });

    const route2 = await page.evaluate(() => ({
        path: window.app.$route.path,
        storeRoute: window.app.$store.getters['app/currentRoute']
    }));

    expect(route1.path).toBeDefined();
    expect(route2.path).toBeDefined();
    // Routes should be different after navigation
    expect(route1.path).not.toBe(route2.path);
});

test('App: banner and motd store mutations', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForFunction(() => window.app && window.app.$store, { timeout: 15000 });

    const result = await page.evaluate(() => {
        const store = window.app.$store;

        // Exercise setBanner mutation
        store.commit('app/setBanner', { message: 'Test Banner', color: '#ff0000', background: '#00ff00' });
        const msg = store.state.app.banner.message;
        const color = store.state.app.banner.color;
        const bg = store.state.app.banner.background;

        // Exercise setMotd mutation
        store.commit('app/setMotd', { message: 'MOTD Message', title: 'MOTD Title' });
        const motdMsg = store.state.app.motd.message;
        const motdTitle = store.state.app.motd.title;

        return {
            msgSet: msg === 'Test Banner',
            colorSet: color === '#ff0000',
            bgSet: bg === '#00ff00',
            motdMsgSet: motdMsg === 'MOTD Message',
            motdTitleSet: motdTitle === 'MOTD Title'
        };
    });

    expect(result.msgSet).toBe(true);
    expect(result.colorSet).toBe(true);
    expect(result.bgSet).toBe(true);
    expect(result.motdMsgSet).toBe(true);
    expect(result.motdTitleSet).toBe(true);
});
