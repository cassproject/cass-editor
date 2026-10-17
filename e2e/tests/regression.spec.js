// TEST-CASES.md §17 Cross-cutting regression checks (REG-01 … REG-04).
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { test, expect, unique, problems } from '../support/fixtures.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const SRC = path.join(ROOT, 'src');
const EDITOR_ORIGIN = `http://localhost:${process.env.E2E_EDITOR_PORT || '5179'}`;
const LOAD = { timeout: 60_000 };
const CORS = { 'Access-Control-Allow-Origin': '*' };

const nodeRow = (page, id) => page.locator(`li[id="${id}"] > .lode__hierarchy-item`);
const editor = (page) => page.locator('.lode__thing-editing.is-active');
const search = (page) => page.getByPlaceholder('Search for frameworks...');

/** Serves a one-framework CTDL-ASN JSON-LD graph at a fake URL; returns { url, name, competency }. */
async function serveCtdlAsnGraph(page, name, competency) {
    const id = () => `https://example.org/ce-${randomUUID()}`;
    const fid = id();
    const cid = id();
    const url = `https://example.org/ctdlasn/graph/${fid.split('/').pop()}`;
    const graph = {
        '@context': 'https://credreg.net/ctdlasn/schema/context/json',
        '@id': url,
        '@graph': [
            { '@id': fid, '@type': 'ceasn:CompetencyFramework', 'ceterms:ctid': fid.split('/').pop(), 'ceasn:name': { 'en-us': name }, 'ceasn:inLanguage': ['en-US'], 'ceasn:hasTopChild': [cid] },
            { '@id': cid, '@type': 'ceasn:Competency', 'ceterms:ctid': cid.split('/').pop(), 'ceasn:competencyText': { 'en-us': competency }, 'ceasn:isPartOf': fid, 'ceasn:isTopChildOf': fid, 'ceasn:inLanguage': ['en-US'] },
        ],
    };
    // Nothing else under example.org exists (the editor resolves the imported @ids); no internet.
    await page.route('https://example.org/**', (route) => route.fulfill({ status: 404, headers: CORS, body: 'not found' }));
    await page.route(url, (route) => route.fulfill({ headers: CORS, contentType: 'application/json', body: JSON.stringify(graph) }));
    return { url, frameworkId: fid, competencyId: cid };
}

/** Imports a framework through Import → URL Source and waits for the preview. */
async function importFromUrl(app, page, url) {
    await navTo(page, 'Import', /#\/import/);
    await page.locator('.import-tab button', { hasText: 'URL Source' }).click();
    await page.getByPlaceholder('paste your url here...').fill(url);
    await page.locator('#import-from-url .button', { hasText: /Import framework/ }).click();
    await expect(page.getByText('Processed, ready to edit')).toBeVisible(LOAD);
}

/** Adds a "requires" relation (shown as a link-type, thing-as-property value) to a seeded framework. */
async function addRequiresRelation(page, frameworkId, source, target) {
    await page.evaluate(async ({ frameworkId, source, target }) => {
        const f = await EcFramework.get(frameworkId);
        const r = new EcAlignment();
        r.generateId(repo.selectedServer);
        r.source = source;
        r.target = target;
        r.relationType = 'requires';
        r.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
        f.addRelation(r.shortId());
        await repo.multiput([r, f]);
    }, { frameworkId, source, target });
}

/** Follows a side-navigation link (retrying: a click can land while the previous view is still busy). */
async function navTo(page, label, url) {
    const link = page.locator('#app-side-nav-bar').getByText(label, { exact: true }).first();
    // The URL changes only once the route's lazy component has loaded; clicking again would cancel
    // that navigation, so wait a while before one retry.
    await link.click();
    try {
        await expect(page).toHaveURL(url, { timeout: 20_000 });
    } catch {
        await link.click();
        await expect(page).toHaveURL(url, { timeout: 20_000 });
    }
}

/** Opens the edit modal of a competency row (a click on a busy page is sometimes lost, so it is retried). */
async function editCompetency(page, id) {
    const row = nodeRow(page, id);
    await expect(async () => {
        await row.hover();
        await row.locator('.edit-button').first().click();
        await expect(editor(page)).toBeVisible({ timeout: 5_000 });
    }).toPass({ timeout: 30_000 });
}

/** Plain text of a CaSS (lang)string value. */
const text = (v) => {
    if (v == null) return v;
    if (Array.isArray(v)) return v.map(text).join('|');
    if (typeof v === 'object') return v['@value'];
    return v;
};

// ---------------------------------------------------------------------------------------------
// REG-01 Console cleanliness sweep
// ---------------------------------------------------------------------------------------------

test('REG-01 console cleanliness sweep @P0', async ({ app, page, account, console }) => {
    test.slow(); // seven screens in one test
    // Page errors are collected per screen below (and checked there) instead of by the fixture.
    test.info().annotations.push({ type: 'allow-page-errors' });
    const found = {};
    const visited = async (screen) => {
        found[screen] = [...problems(console), ...console.pageErrors.map((e) => `uncaught: ${e}`)];
        console.messages.length = 0;
        console.pageErrors.length = 0;
    };

    await app.login(account);
    const a = await app.seedFramework({ name: unique('Sweep source'), competencies: [{ name: 'Sweep parent', description: 'Parent text', children: ['Sweep child'] }, 'Sweep sibling'] });
    const b = await app.seedFramework({ name: unique('Sweep target'), competencies: ['Target one', 'Target two'] });
    await app.waitIndexed(`@id:"${a.id}"`);
    await app.waitIndexed(`@id:"${b.id}"`);
    const source = await serveCtdlAsnGraph(page, unique('Sweep import'), 'Imported competency');

    // Frameworks list.
    await app.open('/frameworks');
    console.messages.length = 0;
    console.pageErrors.length = 0;
    await search(page).fill(a.name);
    const item = page.locator('li.cass--list--item').filter({ hasText: a.name }).first();
    await expect(item).toBeVisible(LOAD);
    await visited('frameworks list');

    // Open the framework.
    await item.click();
    await page.getByText(/^\s*open framework\s*$/i).click();
    await expect(page).toHaveURL(/#\/framework/);
    await expect(page.getByText('Sweep child').first()).toBeVisible(LOAD);
    await visited('framework');

    // Collapse all / expand all.
    await page.locator('.lode__hierarchy .hierarchy-buttons .fa-caret-down').first().click();
    await expect(page.getByText('Sweep child')).toHaveCount(0);
    await page.locator('.lode__hierarchy .hierarchy-buttons .fa-caret-right').first().click();
    await expect(page.getByText('Sweep child').first()).toBeVisible();
    await visited('framework: collapse/expand all');

    // Import from URL.
    await importFromUrl(app, page, source.url);
    await expect(page.getByText('Imported competency').first()).toBeVisible();
    await visited('import from URL');

    // Crosswalk to the alignment step.
    await navTo(page, 'Crosswalk Frameworks', /#\/crosswalk/);
    const step = (label) => page.locator('.crosswalk__steps .step-item.current').filter({ hasText: label });
    await expect(step('select source')).toBeVisible();
    await search(page).fill(a.name);
    await page.locator('.crosswalk__list').getByText(a.name, { exact: true }).click();
    // The lists slide: wait until only the target list is left before picking from it.
    await expect(step('select target')).toBeVisible();
    await expect(page.locator('.crosswalk__list')).toHaveCount(1);
    await search(page).fill(b.name);
    await page.locator('.crosswalk__list').getByText(b.name, { exact: true }).click();
    await expect(step('align frameworks')).toBeVisible();
    await expect(page.getByText('Target two').first()).toBeVisible(LOAD);
    await expect(page.getByText('Sweep child').first()).toBeVisible();
    await visited('crosswalk: align step');

    // Configurations.
    await navTo(page, 'Configurations', /#\/configuration/);
    await expect(page.getByRole('heading', { name: 'Configuration', exact: true })).toBeVisible(LOAD);
    await visited('configurations');

    // Assertion timeline.
    await navTo(page, 'Timeline', /#\/timeline/);
    await expect(page.getByText('Assertion Timeline').first()).toBeVisible();
    await visited('timeline');

    const expected = Object.fromEntries(Object.keys(found).map((k) => [k, []]));
    expect(found, 'console errors, Vue warnings and uncaught errors per screen').toEqual(expected);
});

// ---------------------------------------------------------------------------------------------
// REG-02 jsonld document loader
// ---------------------------------------------------------------------------------------------

/**
 * Seeds a framework and a directory, makes https://schema.cassproject.org unreachable and shows
 * both in the frameworks list and the framework view. Returns the schema URLs requested from the
 * remote host and from the app's own origin.
 */
async function browseOffline(app, page, account) {
    await app.login(account);
    const token = unique('Offline schema');
    const fw = await app.seedFramework({ name: token, competencies: [{ name: 'Offline parent', children: ['Offline child'] }] });
    // A directory too, so the list renders a Directory (whose schema is loaded on display).
    const directoryName = `${token} directory`;
    await page.evaluate(async (name) => {
        const d = new EcDirectory();
        d.generateId(repo.selectedServer);
        d.name = name;
        d.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
        await repo.saveTo(d);
    }, directoryName);
    await app.waitIndexed(`@id:"${fw.id}"`);

    // schema.cassproject.org is unreachable; record anything that still tries it.
    const remote = [];
    await page.route('https://schema.cassproject.org/**', (route) => {
        remote.push(route.request().url());
        return route.abort('internetdisconnected');
    });
    // The editor only goes remote for a schema its startup preload (from the app's own copy) has not
    // loaded yet, so the app's copy is slowed down as on a slow network. route.fallback() then serves
    // it from disk (the schemas fixture).
    await page.route(`${EDITOR_ORIGIN}/schema.cassproject.org/**`, async (route) => {
        await new Promise((resolve) => setTimeout(resolve, 3_000));
        await route.fallback();
    });
    const local = [];
    page.on('request', (r) => {
        if (r.url().startsWith(`${EDITOR_ORIGIN}/schema.cassproject.org/`)) local.push(r.url());
    });

    await app.open('/frameworks');
    await search(page).fill(token);
    await expect(page.locator('li.cass--list--item').filter({ hasText: fw.name }).first()).toBeVisible(LOAD);
    await expect(page.getByText(directoryName).first()).toBeVisible(LOAD);

    await app.open('/framework', { frameworkId: fw.id });
    await expect(page.getByText(fw.name).first()).toBeVisible(LOAD);
    await expect(page.getByText('Offline child').first()).toBeVisible(LOAD);
    return { remote, local };
}

test('REG-02 schema.cassproject.org contexts load from the app origin, names render offline @P0', async ({ app, page, account }) => {
    const { remote, local } = await browseOffline(app, page, account);
    expect(local.some((u) => u.includes('/schema.cassproject.org/0.4/'))).toBe(true);
    // Remote schema requests: see the known-bug test below.
    test.info().annotations.push({ type: 'remote schema requests', description: `${remote.length}: ${[...new Set(remote)].join(', ')}` });
});

test('REG-02 nothing is requested from https://schema.cassproject.org (known bug: loadSchema fetches the remote host) @P0', async ({ app, page, account }) => {
    test.fail(true, 'Thing.vue/ThingEditing.vue loadSchema fetch a missing type schema straight from https://schema.cassproject.org, up to ~160 times per page; see e2e/FINDINGS.md');
    const { remote } = await browseOffline(app, page, account);
    expect([...new Set(remote)], 'requests to https://schema.cassproject.org').toEqual([]);
});

// ---------------------------------------------------------------------------------------------
// REG-03 Async-component $parent chains
// ---------------------------------------------------------------------------------------------

test.describe('REG-03 async-component $parent chains @P1', () => {
    const PARENT_CHAIN = /reading '(name|update|add|remove|removeByValue|saveThing|shortId|parent|expandedThing)'|is not a function/;
    const parentChainProblems = (console) => [...problems(console), ...console.pageErrors].filter((p) => PARENT_CHAIN.test(p));

    test('property value edit and property delete save through the parent chain', async ({ app, page, account, console }) => {
        await app.login(account);
        const fw = await app.seedFramework({ name: unique('Parent chain'), competencies: [{ name: 'Chain parent', children: [{ name: 'Chain child', description: 'Description to delete' }] }] });
        const childId = fw.competencies['Chain child'];
        await app.open('/framework', { frameworkId: fw.id });
        await expect(page.getByText('Chain child').first()).toBeVisible(LOAD);

        // Property value edit (FW-05): PropertyString.blur → Property.updatePropertyString → update().
        await editCompetency(page, childId);
        const name = editor(page).locator('.lode__name textarea').first();
        await name.fill('Chain child renamed');
        await name.press('Tab');
        await expect.poll(async () => text((await app.fetchObject(childId))?.name)).toBe('Chain child renamed');

        // Property delete: × → Confirm Remove Property → Property.remove via ancestorWith('remove').
        await editor(page).locator('.lode__description .fa-times').first().click();
        await page.locator('.modal.is-active').getByRole('button', { name: 'Confirm Remove Property' }).click();
        await expect.poll(async () => (await app.fetchObject(childId))?.description ?? null).toBeNull();
        await editor(page).getByText('done', { exact: true }).click();
        await expect(editor(page)).toHaveCount(0);
        await expect(page.getByText('Chain child renamed').first()).toBeVisible();

        expect(parentChainProblems(console)).toEqual([]);
        expect(problems(console)).toEqual([]);
    });

    test('"scroll to" and "details" on a link-type (thing-as-property) value', async ({ app, page, account, console }) => {
        await app.login(account);
        const fw = await app.seedFramework({ name: unique('Thing as property'), competencies: ['Required competency', 'Requiring competency'] });
        await addRequiresRelation(page, fw.id, fw.competencies['Requiring competency'], fw.competencies['Required competency']);
        await app.open('/framework', { frameworkId: fw.id });
        await expect(page.getByText('Requiring competency').first()).toBeVisible(LOAD);
        await page.locator('#framework-editor-toolbar').getByText(/^\s*tertiary\s*$/i).click();

        const link = nodeRow(page, fw.competencies['Requiring competency']).locator('.click-to-load').filter({ hasText: 'Required competency' });
        await expect(link).toBeVisible(LOAD);
        await link.hover();
        await link.getByText('scroll to').click();
        await expect(page.locator(`[id="scroll-${fw.competencies['Required competency'].split('/').pop()}"]`)).toBeInViewport();

        // details → Single modal; its parentName comes from walking $parent to the owning Thing.
        await link.hover();
        await link.getByRole('button', { name: /details/ }).click();
        const modal = page.locator('.modal.is-active').filter({ hasText: 'return to framework editor' });
        await expect(modal).toBeVisible();
        await expect(modal.getByText('Required competency').first()).toBeVisible();
        await modal.getByRole('button', { name: 'return to framework editor' }).click();
        await expect(modal).toHaveCount(0);

        expect(parentChainProblems(console)).toEqual([]);
        expect(problems(console)).toEqual([]);
    });

    // Not in TEST-CASES.md's list, but the same kind of path: HierarchyNode.moveLeft reads
    // this.$parent.$parent.parent (a fixed two hops) to find the grandparent container.
    test('Shift+ArrowLeft moves a selected child up a level (HierarchyNode.moveLeft)', async ({ app, page, account, console }) => {
        await app.login(account);
        const fw = await app.seedFramework({ name: unique('Move left'), competencies: [{ name: 'Left parent', children: ['Left child'] }, 'Left other'] });
        const childId = fw.competencies['Left child'];
        await app.open('/framework', { frameworkId: fw.id });
        await expect(page.getByText('Left child').first()).toBeVisible(LOAD);
        await expect(page.locator(`li[id="${fw.competencies['Left parent']}"] li[id="${childId}"]`)).toHaveCount(1);

        await page.locator(`label[for="${childId}checkbox"]`).click();
        await expect(page.locator(`input[id="${childId}checkbox"]`)).toBeChecked();
        await page.keyboard.press('Shift+ArrowLeft');

        await expect(page.locator(`li[id="${fw.competencies['Left parent']}"] li[id="${childId}"]`)).toHaveCount(0);
        await expect(page.locator(`li[id="${childId}"]`)).toHaveCount(1);
        await expect.poll(async () => {
            const relations = [].concat((await app.fetchObject(fw.id))?.relation ?? []);
            return relations.length;
        }).toBe(0);

        expect(parentChainProblems(console)).toEqual([]);
        expect(problems(console)).toEqual([]);
    });

    test('editing in the import preview and "done editing"', async ({ app, page, account, console }) => {
        await app.login(account);
        const name = unique('Import chain');
        const source = await serveCtdlAsnGraph(page, name, 'Imported to edit');
        await importFromUrl(app, page, source.url);

        // Edit the imported competency in the preview and finish with "done".
        await editCompetency(page, source.competencyId);
        const box = editor(page).locator('textarea').first();
        await box.fill('Imported and edited');
        await box.press('Tab');
        await editor(page).getByText('done', { exact: true }).click();
        await expect(editor(page)).toHaveCount(0);
        await expect(page.getByText('Imported and edited').first()).toBeVisible();

        // "done editing" moves the import on to its light view.
        await page.locator('.button', { hasText: /^\s*done editing\s*$/ }).click();
        await expect(page.getByText('view in editor')).toBeVisible();
        await expect.poll(async () => text((await app.fetchObject(source.competencyId))?.['ceasn:competencyText'] ?? (await app.fetchObject(source.competencyId))?.name))
            .toContain('Imported and edited');

        expect(parentChainProblems(console)).toEqual([]);
        expect(problems(console)).toEqual([]);
    });
});

// ---------------------------------------------------------------------------------------------
// REG-04 Store method conventions
// ---------------------------------------------------------------------------------------------

/** Every .js/.vue file under src. */
const sourceFiles = (dir = SRC) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    if (d.isDirectory()) return sourceFiles(p);
    return /\.(js|vue)$/.test(d.name) ? [p] : [];
});
const rel = (p) => path.relative(ROOT, p).replace(/\\/g, '/');

/**
 * Pinia store members the source uses: useXStore().member, members of variables assigned from
 * useXStore(), and mapState/mapActions/mapWritableState(useXStore, [...] | {...}).
 * Returns [{ store: 'useXStore', member, where }].
 */
function storeMemberUses() {
    const uses = [];
    for (const file of sourceFiles()) {
        // Comments out (a // inside a string such as a URL only loses the rest of that line).
        const code = fs.readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:'"\\])\/\/.*$/gm, '$1');
        const where = rel(file);
        for (const m of code.matchAll(/\b(use\w+Store)\(\)\.(\w+)/g)) uses.push({ store: m[1], member: m[2], where });
        const vars = {};
        for (const m of code.matchAll(/\b(?:const|let|var)\s+(\w+)\s*=\s*(use\w+Store)\(\)(?!\s*\.)/g)) (vars[m[1]] ??= new Set()).add(m[2]);
        for (const [name, stores] of Object.entries(vars)) {
            if (stores.size !== 1) continue; // the same name used for different stores: ambiguous
            const store = [...stores][0];
            for (const m of code.matchAll(new RegExp(`(?<![\\w.$])${name}\\.(\\w+)`, 'g'))) uses.push({ store, member: m[1], where });
        }
        for (const m of code.matchAll(/\bmap(?:State|Actions|WritableState)\(\s*(use\w+Store)\s*,\s*(\[[^\]]*\]|\{[^}]*\})/g)) {
            const members = m[2].startsWith('[')
                ? [...m[2].matchAll(/['"](\w+)['"]/g)].map((x) => x[1])
                : [...m[2].matchAll(/:\s*['"](\w+)['"]/g)].map((x) => x[1]);
            for (const member of members) uses.push({ store: m[1], member, where });
        }
    }
    return uses;
}

test.describe('REG-04 store method conventions @P2', () => {
    test('no Vuex left: no this.$store, mapGetters, mapMutations or vuex imports', async () => {
        const offenders = [];
        for (const file of sourceFiles()) {
            const code = fs.readFileSync(file, 'utf8');
            for (const re of [/this\.\$store\b/, /\bmapGetters\b/, /\bmapMutations\b/, /from\s+['"]vuex['"]/, /require\(\s*['"]vuex['"]\s*\)/]) {
                if (re.test(code)) offenders.push(`${rel(file)}: ${re}`);
            }
        }
        expect(offenders).toEqual([]);
        const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
        expect(Object.keys({ ...pkg.dependencies, ...pkg.devDependencies })).not.toContain('vuex');
    });

    test('Pinia store members used by the source exist on the stores', async ({ app, page }) => {
        const uses = storeMemberUses();
        expect(uses.length).toBeGreaterThan(100);
        await app.open('/frameworks');
        const missing = await page.evaluate((uses) => {
            const globals = window.app.$.appContext.config.globalProperties;
            const out = [];
            for (const u of uses) {
                const useStore = globals[u.store];
                if (typeof useStore !== 'function') {
                    out.push(`${u.where}: ${u.store} is not a known store`);
                    continue;
                }
                const store = useStore();
                if (!(u.member in store)) out.push(`${u.where}: ${u.store}().${u.member}`);
            }
            return [...new Set(out)].sort();
        }, uses);
        expect(missing, 'store members used in src that the store does not define').toEqual([]);
    });

    test('npm run lint has no errors', async () => {
        // Same command as `npm run lint` (package.json), as JSON.
        let output;
        try {
            output = execSync('npx eslint --ext .js,.vue src -f json', { cwd: ROOT, maxBuffer: 64 * 1024 * 1024, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
        } catch (e) {
            output = e.stdout; // eslint exits 1 when it reports errors
        }
        const results = JSON.parse(output);
        const errors = results.flatMap((r) => r.messages.filter((m) => m.severity === 2).map((m) => `${rel(r.filePath)}:${m.line} ${m.ruleId}: ${m.message}`));
        expect(errors).toEqual([]);
    });
});
