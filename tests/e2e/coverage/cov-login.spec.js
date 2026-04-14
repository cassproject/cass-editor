const {
  test,
  expect,
  loginAndNavigate
} = require('../fixtures');

// Coverage: LegacyLogin.vue (44%), user.js store (80%)
// user.js state: { loggedOnPerson: {}, repoInit: { ssoLogin, ssoLogout, ssoPublicKey }, lastLogin: null }

test('Login: user store initial state', async ({
  page
}) => {
  await page.goto('/#/legacyLogin?server=http://localhost/api/');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForFunction(() => window.__stores);
  const result = await page.evaluate(() => {
    const store = window.__stores;
    return {
      hasUserState: store.state.user != null,
      loggedOnPerson: store.state.user?.loggedOnPerson,
      lastLogin: store.state.user?.lastLogin,
      repoInit: store.state.user?.repoInit
    };
  });
  expect(result.hasUserState).toBe(true);
  expect(result.loggedOnPerson).toBeDefined();
  expect(result.repoInit).toBeDefined();
});
test('Login: legacy login route loads view', async ({
  page
}) => {
  await page.goto('/#/legacyLogin?server=http://localhost/api/');
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator('#app')).toBeVisible();

  // Exercise the route change and check URL
  const url = page.url();
  expect(url).toContain('Login');
});
test('Login: exercise featuresEnabled login settings', async ({
  page
}) => {
  await page.goto('/#/?server=http://localhost/api/');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForFunction(() => window.__stores);
  const result = await page.evaluate(() => {
    const store = window.__stores;

    // Exercise featuresEnabled login-related mutations
    const origLogin = store.featuresEnabled.loginEnabled;
    const origApiLogin = store.featuresEnabled.apiLoginEnabled;
    store.featuresEnabled.setLoginEnabled( !origLogin);
    const toggledLogin = store.featuresEnabled.loginEnabled;
    store.featuresEnabled.setApiLoginEnabled( !origApiLogin);
    const toggledApiLogin = store.featuresEnabled.apiLoginEnabled;

    // Restore
    store.featuresEnabled.setLoginEnabled( origLogin);
    store.featuresEnabled.setApiLoginEnabled( origApiLogin);
    return {
      toggledLogin: toggledLogin !== origLogin,
      toggledApiLogin: toggledApiLogin !== origApiLogin
    };
  });
  expect(result.toggledLogin).toBe(true);
  expect(result.toggledApiLogin).toBe(true);
});
test('Login: logged in state after loginAndNavigate', async ({
  page
}) => {
  let uid;
  uid = await loginAndNavigate(page, uid);
  const result = await page.evaluate(() => {
    const store = window.__stores;
    return {
      loggedOnPerson: store.state.user?.loggedOnPerson,
      hasName: Object.keys(store.state.user?.loggedOnPerson || {}).length > 0,
      lastLogin: store.state.user?.lastLogin
    };
  });
  expect(result.hasName).toBe(true);
});