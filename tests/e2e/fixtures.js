const { test: baseTest, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const test = baseTest.extend({
    page: async ({ page }, use) => {
        await use(page);

        // Collect coverage after each test
        const coverage = await page.evaluate(() => window.__coverage__);
        if (coverage) {
            const coveragePath = path.join(__dirname, '..', '..', '.nyc_output', `coverage-${Date.now()}.json`);
            if (!fs.existsSync(path.dirname(coveragePath))) {
                fs.mkdirSync(path.dirname(coveragePath), { recursive: true });
            }
            fs.writeFileSync(coveragePath, JSON.stringify(coverage));
        }
    },
});

module.exports = { test, expect };
