// TEST-CASES.md §16 Plugins (PLG-01).
//
// No third-party plugin is loaded: the curated plugin's manifest (on raw.githubusercontent.com) and
// the plugin pages are fakes served with page.route.
import { test, expect, problems } from '../support/fixtures.js';
import { CASS_URL } from '../support/env.js';

const EDITOR_ORIGIN = `http://localhost:${process.env.E2E_EDITOR_PORT || '5179'}`;
// The curated plugin the editor ships with (src/stores/app.js curatedPlugins).
const CURATED_ID = 'vlrcTestPlugin3';
const CURATED_URL = 'https://raw.githubusercontent.com/cassproject/cass-vlrc/master/';
const CORS = { 'Access-Control-Allow-Origin': '*' };

/**
 * A fake plugin: its manifest at <pluginUrl>manifest.json, and a page under scope that asks the
 * editor for the user's identity ("waiting") and shows what it receives.
 */
async function serveFakePlugin(page, { pluginUrl, scope, name, category, launchName }) {
    await page.route(`${pluginUrl}manifest.json`, (route) => route.fulfill({
        headers: CORS,
        contentType: 'application/json',
        body: JSON.stringify({
            name,
            scope,
            shortcuts: [{
                name: `main/${category}/${launchName}`,
                url: 'index.html',
                query_params: [{ name: 'origin', value: ':origin' }, { name: 'mode', value: 'e2e' }],
            }],
        }),
    }));
    await page.route(`${scope}**`, (route) => route.fulfill({
        contentType: 'text/html',
        body: `<!doctype html><html><head><title>${launchName}</title></head><body>
<h1 id="plugin-title">${launchName} running</h1><pre id="received"></pre>
<script>
  const timer = setInterval(() => parent.postMessage({ message: 'waiting' }, '*'), 250);
  window.addEventListener('message', (e) => {
    let data = e.data;
    try { data = JSON.parse(data); } catch (ex) { /* already an object */ }
    if (data && data.action === 'initIdentity') {
      clearInterval(timer);
      document.getElementById('received').textContent = JSON.stringify({
        action: data.action, serverParm: data.serverParm, nameParm: data.nameParm,
        hasPrivateKey: /PRIVATE KEY/.test(data.pemParm || ''), origin: e.origin });
    }
  });
</script></body></html>`,
    }));
}

const sideNav = (page) => page.locator('#app-side-nav-bar');
const pluginRow = (page, url) => page.locator('#plugin-manager tbody tr').filter({ hasText: url });

/** Clicks a launcher in the side navigation and checks the plugin page gets the user's identity. */
async function launchAndCheck(page, account, { scope, category, launchName }) {
    await expect(sideNav(page).getByText(category, { exact: true })).toBeVisible();
    await sideNav(page).getByText(launchName, { exact: true }).click();
    // The URL changes once the container's lazy-loaded route component has loaded.
    await expect(page).toHaveURL(/#\/pluginContainer/, { timeout: 60_000 });
    await expect(page.locator('h3.title', { hasText: launchName })).toBeVisible();
    const frame = page.locator('iframe#pluginFrame');
    await expect(frame).toHaveAttribute('src', `${scope}index.html?origin=${EDITOR_ORIGIN}&mode=e2e`);
    const plugin = page.frameLocator('iframe#pluginFrame');
    await expect(plugin.locator('#plugin-title')).toHaveText(`${launchName} running`);
    await expect(plugin.locator('#received')).not.toBeEmpty();
    const received = JSON.parse(await plugin.locator('#received').textContent());
    expect(received).toEqual({
        action: 'initIdentity',
        serverParm: CASS_URL,
        nameParm: account.name,
        hasPrivateKey: true,
        origin: EDITOR_ORIGIN,
    });
}

test.describe('PLG-01 plugin manager', () => {
    test('PLG-01 curated plugins list, enable and launch a curated plugin @P2', async ({ app, page, account, console }) => {
        const plugin = { pluginUrl: CURATED_URL, scope: `${EDITOR_ORIGIN}/__e2e_plugin/`, name: 'E2E Curated Plugin', category: 'E2E Tools', launchName: 'E2E Launch' };
        await app.login(account, '/pluginManager');
        await serveFakePlugin(page, plugin);

        await expect(page.getByRole('heading', { name: 'Plugin Management' })).toBeVisible();
        const row = pluginRow(page, CURATED_URL);
        await expect(row).toBeVisible();
        await expect(row.locator('.fa-check')).toBeVisible(); // curated
        await expect(row.locator(`input[id="${CURATED_ID}pluginEnabledSwitch"]`)).not.toBeChecked();

        // Details (read-only for a curated plugin) show what the manifest says.
        await row.getByTitle('View plugin').click();
        await expect(page.getByRole('heading', { name: 'Plugin details' })).toBeVisible();
        await page.getByText('load manifest data', { exact: true }).click();
        await expect(page.getByText(plugin.name, { exact: true })).toBeVisible();
        await expect(page.locator('#plugin-manager').getByText(plugin.launchName, { exact: true })).toBeVisible();
        await expect(page.locator('#plugin-manager').getByText('origin=:origin')).toBeVisible();
        await page.getByText('back', { exact: true }).click();

        // Enable it: its launcher appears in the side navigation.
        await expect(sideNav(page).getByText(plugin.launchName, { exact: true })).toHaveCount(0);
        await pluginRow(page, CURATED_URL).locator(`label[for="${CURATED_ID}pluginEnabledSwitch"]`).click();
        await expect(pluginRow(page, CURATED_URL).locator(`input[id="${CURATED_ID}pluginEnabledSwitch"]`)).toBeChecked();

        await launchAndCheck(page, account, plugin);

        expect(problems(console), 'console errors / Vue warnings').toEqual([]);
    });

    test('PLG-01 add, launch and remove a local plugin @P2', async ({ app, page, account, console }) => {
        const pluginUrl = `${EDITOR_ORIGIN}/__e2e_local_plugin/`;
        const plugin = { pluginUrl, scope: `${EDITOR_ORIGIN}/__e2e_local_plugin/app/`, name: 'E2E Local Plugin', category: 'E2E Local', launchName: 'E2E Local Launch' };
        await app.login(account, '/pluginManager');
        await serveFakePlugin(page, plugin);
        await expect(pluginRow(page, CURATED_URL)).toBeVisible();

        await page.getByTitle('Add New Plugin').click();
        await expect(page.getByRole('heading', { name: 'Plugin details' })).toBeVisible();
        // An invalid URL is refused.
        await page.locator('#plugin-manager input[type=url]').fill('not a url');
        await page.getByText('save plugin', { exact: true }).click();
        await expect(page.getByText('A valid URL is required for a plugin')).toBeVisible();

        await page.locator('#plugin-manager input[type=url]').fill(pluginUrl);
        await page.getByText('load manifest data', { exact: true }).click();
        await expect(page.getByText(plugin.name, { exact: true })).toBeVisible();
        await page.getByText('save plugin', { exact: true }).click();

        const row = pluginRow(page, pluginUrl);
        await expect(row).toBeVisible();
        await expect(row.locator('.fa-check')).toHaveCount(0); // not curated
        await expect(row.locator(`input[id="${pluginUrl}pluginEnabledSwitch"]`)).toBeChecked(); // saved plugins start enabled

        await launchAndCheck(page, account, plugin);

        // Remove it again.
        await app.go('/pluginManager');
        await pluginRow(page, pluginUrl).getByTitle('Delete plugin').click();
        const confirm = page.locator('.modal.is-active').filter({ hasText: 'Remove Plugin?' });
        await expect(confirm).toBeVisible();
        await confirm.getByRole('button', { name: 'Remove' }).click();
        await expect(pluginRow(page, pluginUrl)).toHaveCount(0);
        await expect(sideNav(page).getByText(plugin.launchName, { exact: true })).toHaveCount(0);
        expect(await page.evaluate(() => localStorage.getItem('cassAuthoringToolLocalPlugins'))).not.toContain(pluginUrl);

        expect(problems(console), 'console errors / Vue warnings').toEqual([]);
    });
});
