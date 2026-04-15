const {
  test,
  expect
} = require('@playwright/test');
const {
  loginAndNavigate
} = require('../fixtures.js');
test.describe('Coverage: DirectoryList.vue', () => {
  let uid;
  test.beforeEach(async ({
    page
  }) => {
    uid = await loginAndNavigate(page, uid);
    await page.goto('/#/frameworks');
  });
  test('creates a directory and exercises DirectoryList', async ({
    page
  }) => {
    // Wait for frameworks page to load
    await page.waitForSelector('#frameworks', {
      state: 'visible'
    });

    // Trigger the Add Directory modal directly via store to bypass 
    // flaky dropdown menu animations and interaction intercepts in Playwright
    await page.evaluate(() => {
      window.__stores.app.setShowModal({ component: 'AddDirectory' });
    });

    // Fill out modal and create
    await expect(page.locator('#add-directory-name-input')).toBeVisible();
    await page.fill('#add-directory-name-input', 'Coverage Test Directory');
    await page.click('#add-directory-create-button');

    // It should automatically redirect to /directory
    await page.waitForURL(/.*#\/directory/);
    await page.waitForSelector('#directoryList', {
      state: 'visible'
    });

    // Now perform a search
    await expect(page.locator('#search-bar-input')).toBeVisible();
    await page.fill('#search-bar-input', 'NonExistentTestItem404');

    // Wait for search result text
    await expect(page.locator('.no-results')).toBeVisible();

    // Clear search
    await page.fill('#search-bar-input', '');
  });
});