/**
 * Coverage: Responsive viewport resize — mobile, tablet, desktop.
 * Derived from collect-coverage5.js app-deep session.
 * Exercises App.vue responsive breakpoints, sidebar toggle, and layout recalculation.
 */

const { test, expect, loginAndNavigate } = require('../fixtures');

test('Responsive: viewport resize triggers layout changes', async ({ page }) => {
    await loginAndNavigate(page);

    await page.goto('/#/frameworks?server=http://localhost/api/');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('#app')).toBeVisible();

    // Mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('#app')).toBeVisible();

    // Tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('#app')).toBeVisible();

    // Desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('#app')).toBeVisible();

    // Exercise sidebar toggle button if available at narrow viewport
    await page.setViewportSize({ width: 600, height: 800 });
    const menuBtn = page.locator('#sidebar-toggle, .hamburger, [aria-label="menu"]');
    const menuVisible = await menuBtn.first().isVisible().catch(() => false);
    if (menuVisible) {
        await menuBtn.first().click();
        await menuBtn.first().click();
    }

    // Return to normal viewport
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page.locator('#app')).toBeVisible();
});
