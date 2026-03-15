const {
  test,
  expect
} = require('@playwright/test');
const {
  loginAndNavigate
} = require('../fixtures.js');
test.describe('Coverage: mixins/import.js', () => {
  let uid;
  test.beforeEach(async ({
    page
  }) => {
    uid = await loginAndNavigate(page, uid);
    await page.goto('/#/import');
    await page.waitForSelector('#import', {
      state: 'visible'
    });
  });
  test('exercises import.js methods via UI interactions', async ({
    page
  }) => {
    // 1. Test clicking the info button to open Right Aside on File tab
    await page.waitForSelector('#file-import-file-info-button', {
      state: 'visible'
    });
    await page.click('#file-import-file-info-button');
    // Give right aside time to open

    // 2. Switch to URL tab
    await page.click('#import-url-tab-button');
    await expect(page.locator('#import-url-input')).toBeVisible();

    // 3. Try to import an invalid URL to trigger immediate validation errors
    await page.fill('#import-url-input', 'not-a-url');
    await page.click('#import-url-import-button');

    // wait for the error modal to appear
    await expect(page.locator('.modal-card-title', {
      hasText: 'Error'
    })).toBeVisible();

    // click close on the modal
    await page.click('.modal-card-foot .button', {
      text: 'OK'
    });

    // It should reset
    await expect(page.locator('#import-url-input')).toBeVisible();
  });
});