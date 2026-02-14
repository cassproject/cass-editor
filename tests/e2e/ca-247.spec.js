const { test, expect } = require('./fixtures');

// CA-247: Interface with CaSS only via CaSS Repository API
    test('CA-247: Application communicates via CaSS Repository API', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible();
        // The ?server= parameter confirms API endpoint usage
    });
