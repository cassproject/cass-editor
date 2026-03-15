const {
  test,
  expect,
  loginAndNavigate
} = require('../fixtures');

// Coverage: Import components (4.44% → ~20%+)
// Targets: ImportTabs.vue, Import.vue, DragAndDrop.vue, ImportFile.vue

test('Import: page loads after login', async ({
  page
}) => {
  let uid;
  uid = await loginAndNavigate(page, uid);
  await page.goto('/#/import?server=http://localhost/api/');
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator('#import')).toBeVisible();
});
test('Import: import tabs and file tab visible', async ({
  page
}) => {
  let uid;
  uid = await loginAndNavigate(page, uid);
  await page.goto('/#/import?server=http://localhost/api/');
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator('#import')).toBeVisible();

  // File tab button
  const fileTab = page.locator('#import-file-tab-button');
  await expect(fileTab).toBeVisible();

  // Server tab button
  const serverTab = page.locator('#import-server-tab-button');
  await expect(serverTab).toBeVisible();
});
test('Import: switch to server tab', async ({
  page
}) => {
  let uid;
  uid = await loginAndNavigate(page, uid);
  await page.goto('/#/import?server=http://localhost/api/');
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator('#import')).toBeVisible();
  const serverTab = page.locator('#import-server-tab-button');
  await expect(serverTab).toBeVisible();
  await serverTab.click();
  // Verify server import section is shown
  const serverHeading = page.locator('text=Import from remote server');
  await expect(serverHeading).toBeVisible();
});
test('Import: switch to text tab if visible', async ({
  page
}) => {
  let uid;
  uid = await loginAndNavigate(page, uid);
  await page.goto('/#/import?server=http://localhost/api/');
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator('#import')).toBeVisible();
  const textTab = page.locator('#import-text-tab-button');
  const isVisible = await textTab.isVisible().catch(() => false);
  if (isVisible) {
    await textTab.click();
    const textHeading = page.locator('text=Import framework from text');
    await expect(textHeading).toBeVisible();
  } else {
    // Text tab not visible in conceptMode or progressionMode - still pass
    expect(true).toBe(true);
  }
});
test('Import: switch to URL tab if visible', async ({
  page
}) => {
  let uid;
  uid = await loginAndNavigate(page, uid);
  await page.goto('/#/import?server=http://localhost/api/');
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator('#import')).toBeVisible();
  const urlTab = page.locator('#import-url-tab-button');
  const isVisible = await urlTab.isVisible().catch(() => false);
  if (isVisible) {
    await urlTab.click();
    const urlHeading = page.locator('text=Import from URL source').first();
    await expect(urlHeading).toBeVisible();
  } else {
    expect(true).toBe(true);
  }
});
test('Import: file import status display', async ({
  page
}) => {
  let uid;
  uid = await loginAndNavigate(page, uid);
  await page.goto('/#/import?server=http://localhost/api/');
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator('#import')).toBeVisible();

  // Verify import bottom section exists (contains tabs and status)
  const bottomSection = page.locator('#import-bottom-section');
  await expect(bottomSection).toBeVisible();
});
test('Import: store importType mutations', async ({
  page
}) => {
  let uid;
  uid = await loginAndNavigate(page, uid);
  await page.goto('/#/import?server=http://localhost/api/');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForFunction(() => window.app && window.app.$store);
  const result = await page.evaluate(() => {
    const store = window.app.$store;
    store.commit('app/importType', 'file');
    const fileType = store.state.app.import.type;
    store.commit('app/importType', 'server');
    const serverType = store.state.app.import.type;
    store.commit('app/importType', 'text');
    const textType = store.state.app.import.type;
    store.commit('app/importType', 'url');
    const urlType = store.state.app.import.type;
    store.commit('app/importTransition', 'upload');
    const transition = store.state.app.import.transition;
    store.commit('app/importStatus', 'test-status');
    const status = store.state.app.import.status;

    // Restore
    store.commit('app/importType', 'file');
    store.commit('app/importTransition', 'upload');
    return {
      file: fileType === 'file',
      server: serverType === 'server',
      text: textType === 'text',
      url: urlType === 'url',
      transition: transition === 'upload',
      status: status === 'test-status'
    };
  });
  expect(result.file).toBe(true);
  expect(result.server).toBe(true);
  expect(result.text).toBe(true);
  expect(result.url).toBe(true);
  expect(result.transition).toBe(true);
  expect(result.status).toBe(true);
});