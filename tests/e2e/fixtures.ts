
import { test as baseTest, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

export const test = baseTest.extend({
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

export { expect };
