/**
 * Coverage: PostMessage API handling in App.vue / main.js.
 * Derived from collect-coverage2.js postmessage session.
 * Exercises the window.addEventListener('message') handler with various action types.
 */

const { test, expect } = require('../fixtures');

test('PostMessage: send various postMessage actions to exercise message handler', async ({ page }) => {
    await page.goto('/#/?server=http://localhost/api/');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('#app')).toBeVisible();

    // Wait for the app to initialize its message listener
    await page.waitForFunction(() => window.app && window.app.$store);

    const messages = [
        {
            action: 'template',
            competency: { 'http://test/prop': 'value' },
            framework: { 'http://test/prop': 'value' },
            concept: { 'http://test/prop': 'value' },
            conceptScheme: { 'http://test/prop': 'value' }
        },
        { action: 'export', schema: 'cass' },
        { action: 'export', schema: 'ctdlasn' },
        { action: 'export', schema: 'case' },
        { message: 'select' },
        { action: 'set', id: 'https://test.example/id', key1: 'value1' },
    ];

    for (const msg of messages) {
        await page.evaluate((m) => window.postMessage(m, '*'), msg);
    }

    // Verify app is still functional after processing messages
    await expect(page.locator('#app')).toBeVisible();
});
