const { test, expect, loginAndNavigate } = require('../fixtures');

// Coverage: router.js (18%), App.vue (20%), SideNav.vue (30%), Topbar.vue (0%)
// Exercises lazy-loaded route components and sidebar/topbar rendering
// Note: Sidebar root ID is 'app-side-nav-bar', individual links use 'side-nav-*-link'

test('Route: welcome page loads', async ({ page }) => {
    await page.goto('/#/?server=http://localhost/api/');
    await page.waitForLoadState('domcontentloaded');
    // App.vue mounted + router resolve '/' route
    await expect(page.locator('#app')).toBeVisible();
});

test('Route: frameworks list', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('#frameworks')).toBeVisible({ timeout: 30000 });
    // SideNav container rendered
    const sideNav = page.locator('#app-side-nav-bar');
    await expect(sideNav).toBeVisible();
});

test('Route: crosswalk page', async ({ page }) => {
    await page.goto('/#/crosswalk?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#crosswalk')).toBeVisible();
});

test('Route: configuration page', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/configuration?server=http://localhost/api/');
    await expect(page.locator('#configuration')).toBeVisible();
});

test('Route: users page', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/users?server=http://localhost/api/');
    // Users page loads (exercises the /users route)
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('#app')).toBeVisible();
});

test('Route: legacy login page', async ({ page }) => {
    await page.goto('/#/legacyLogin?server=http://localhost/api/');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('#app')).toBeVisible();
});

test('SideNav: navigation links visible', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('#app-side-nav-bar')).toBeVisible({ timeout: 30000 });
    // Exercise SideNav computed properties by checking link visibility
    const navLinks = page.locator('[id^="side-nav-"][id$="-link"]');
    const count = await navLinks.count();
    expect(count).toBeGreaterThan(0);
});

test('SideNav: navigate between sections', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible({ timeout: 30000 });

    // Click configuration link in sidenav
    const configLink = page.locator('#side-nav-configurations-link');
    if (await configLink.isVisible()) {
        await configLink.click();
        await page.waitForTimeout(1000);
    }
});

test('SideNav: logged-in state shows user icon', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#side-nav-user-icon-button')).toBeVisible();
});
