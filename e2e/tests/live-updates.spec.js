// Live updates over the CaSS websocket: an open editor is told about changes made elsewhere.
import { test, expect, unique } from '../support/fixtures.js';
import { App } from '../support/app.js';

test.describe('Live updates', () => {
    test('a deletion elsewhere does not break an open editor @P1', async ({ app, page, account }) => {
        // Record the change notices the editor's websocket receives.
        const notices = [];
        page.on('websocket', (ws) => ws.on('framereceived', (frame) => notices.push(String(frame.payload))));

        await app.login(account);
        const fw = await app.seedFramework({ name: unique('Live updates'), competencies: ['Stays', 'Deleted elsewhere'] });
        const deletedId = fw.competencies['Deleted elsewhere'];
        await app.open('/framework', { frameworkId: fw.id });
        await expect(page.getByText('Deleted elsewhere').first()).toBeVisible();

        // The same user, in another tab, deletes a competency of the framework open in the first tab.
        const other = await page.context().newPage();
        const app2 = new App(other);
        await app2.open('/frameworks');
        await expect.poll(() => other.evaluate(() => EcIdentityManager.default.ids.length)).toBeGreaterThan(0);
        const guid = deletedId.split('/').pop();
        const refetch = page.waitForResponse((res) => res.url().includes(guid) && res.request().method() !== 'DELETE', { timeout: 30_000 });
        await other.evaluate(async (id) => {
            await repo.deleteRegistered(await EcCompetency.get(id), null, null, EcIdentityManager.default);
        }, deletedId);
        await expect.poll(() => app2.fetchObject(deletedId)).toBeNull();

        // CaSS announces the deletion; the first editor re-fetches the object, gets nothing, and must
        // not throw (an uncaught error fails the test, see fixtures.js).
        await expect.poll(() => notices.some((n) => n.includes(guid)), { timeout: 30_000 }).toBe(true);
        await refetch;
        await expect(page.getByText('Stays').first()).toBeVisible();
        await other.close();
    });
});
