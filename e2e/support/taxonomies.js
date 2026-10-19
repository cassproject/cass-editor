// Helpers for TEST-CASES.md §8 (concept schemes / taxonomies and progression models).
import { expect } from '@playwright/test';
import { unique } from './app.js';
import { problems } from './fixtures.js';

/**
 * Creates a concept scheme (or, with progression: true, a progression model: a concept scheme
 * with subType "Progression") owned by the logged-in user, through the cassproject library in
 * the page. concepts: names, or { name, children: [...] } (children become skos:narrower /
 * skos:broader). Returns { id, name, concepts: { name: id } }.
 */
export async function seedConceptScheme(app, { name = unique('Scheme'), concepts = [], progression = false } = {}) {
    return await app.page.evaluate(async ({ name, concepts, progression }) => {
        const owner = EcIdentityManager.default.ids[0].ppk;
        const now = new Date().toISOString();
        const scheme = new EcConceptScheme();
        scheme.generateId(repo.selectedServer);
        scheme.addOwner(owner.toPk());
        scheme['dcterms:title'] = { '@language': 'en', '@value': name };
        scheme['schema:dateCreated'] = now;
        scheme['schema:dateModified'] = now;
        if (progression) scheme.subType = 'Progression';
        const toSave = [];
        const ids = {};
        const add = (spec, parent) => {
            spec = typeof spec === 'string' ? { name: spec } : spec;
            const c = new EcConcept();
            c.generateId(repo.selectedServer);
            c.addOwner(owner.toPk());
            c['skos:prefLabel'] = { '@language': 'en', '@value': spec.name };
            c['skos:inScheme'] = scheme.shortId();
            c['schema:dateCreated'] = now;
            c['schema:dateModified'] = now;
            if (parent) {
                c['skos:broader'] = [parent.shortId()];
                parent['skos:narrower'] = [...(parent['skos:narrower'] || []), c.shortId()];
            } else {
                c['skos:topConceptOf'] = scheme.shortId();
                scheme['skos:hasTopConcept'] = [...(scheme['skos:hasTopConcept'] || []), c.shortId()];
            }
            ids[spec.name] = c.shortId();
            toSave.push(c);
            for (const child of spec.children || []) add(child, c);
        };
        for (const spec of concepts) add(spec, null);
        toSave.push(scheme);
        await repo.multiput(toSave);
        return { id: scheme.shortId(), name, concepts: ids };
    }, { name, concepts, progression });
}

/** The value of a language-tagged SKOS / Dublin Core property as stored, e.g. skos:prefLabel. */
export const langValue = (v) => {
    if (Array.isArray(v)) v = v[0];
    return v != null && typeof v === 'object' ? v['@value'] : v;
};

/** Ids in a property that may be a single value or an array. */
export const idList = (v) => (v == null ? [] : Array.isArray(v) ? v : [v]);

/**
 * Reads an object straight from the CaSS server (app.fetchObject goes through the editor's
 * in-page cache, which can be ahead of or behind the server). null when it does not exist.
 */
export async function stored(page, id) {
    const response = await page.request.get(id, { headers: { 'Cache-Control': 'no-cache' } });
    if (!response.ok()) return null;
    const text = await response.text();
    return text ? JSON.parse(text) : null;
}

/** Polls what CaSS stored for id until check(stored) passes (writes are asynchronous in the editor). */
export async function expectStored(app, id, check, message, timeout = 20_000) {
    await expect.poll(async () => {
        const o = await stored(app.page, id);
        try {
            return o != null && check(o) ? 'ok' : JSON.stringify(o);
        } catch (e) {
            return String(e);
        }
    }, { message, timeout }).toBe('ok');
}

/** The id in an editor URL such as ...#/conceptScheme/<id>?... */
export const idFromRoute = (url, route) => decodeURIComponent(url.split(`#/${route}/`)[1].split('?')[0]);

/**
 * Opens a concept scheme (or, with route 'progressionModel', a progression model) by id, within
 * the already loaded editor so the in-memory login is kept (a full page load can render the
 * scheme before the saved login is restored, leaving it read-only). Use app.open for a real
 * deep link.
 */
export async function openScheme(app, id, { route = 'conceptScheme' } = {}) {
    // A navigation issued while the list page is still initialising can be superseded by that
    // page's own route update, so retry until the scheme shows.
    await expect(async () => {
        await app.go(`/${route}/${encodeURIComponent(id)}`);
        await expect(app.page.locator('#framework_drag')).toBeVisible({ timeout: 20_000 });
    }).toPass({ timeout: 90_000 });
}

/** The open "Create …" / "Edit …" editor dialog. */
export const editor = (page) => page.locator('.lode__thing-editing.is-active > .modal-card');

/** Types a new name / label into the open editor's first field, blurs it (which saves) and clicks done. */
export async function renameInEditor(page, value) {
    const field = editor(page).locator('textarea').first();
    await field.fill(value);
    await field.press('Tab');
    // "done" validates against what was saved; right after the blur save it can still see a stale
    // value and stay open, so click it again until the editor closes.
    await expect(async () => {
        await editor(page).getByText(/^\s*done\s*$/i).click({ timeout: 5_000 });
        await expect(editor(page)).toHaveCount(0, { timeout: 10_000 });
    }).toPass({ timeout: 60_000 });
}

/**
 * The <li> of a concept / level in the hierarchy (its id attribute is the object's id), not the
 * copy SortableJS drags around under the pointer during a drag (forceFallback).
 */
export const nodeLi = (page, id) => page.locator(`li[id="${id}"]:not(.sortable-fallback)`);

/** The row (label, buttons) of a concept / level, without its children. */
export const nodeRow = (page, id) => nodeLi(page, id).locator('> div.lode__hierarchy-item');

/** The hierarchy as the page shows it: [{ id, children: [...] }] in display order. */
export async function uiTree(page) {
    return await page.evaluate(() => {
        const read = (ul) => [...ul.children]
            .filter((el) => el.tagName === 'LI')
            .map((li) => {
                const sub = li.querySelector(':scope > div > ul.lode__hierarchy-sub-ul');
                return { id: li.id, children: sub ? read(sub) : [] };
            });
        const root = document.querySelector('ul.lode__hierarchy-ul');
        return root ? read(root) : null;
    });
}

/**
 * The hierarchy as CaSS stored it, read from the server: top concepts in order, each with its
 * skos:narrower children. Same shape as uiTree.
 */
export async function storedTree(page, schemeId) {
    const build = async (id, depth) => {
        const c = await stored(page, id);
        const children = depth > 5 || !c ? [] : await Promise.all(idList(c['skos:narrower']).map((k) => build(k, depth + 1)));
        return { id, children };
    };
    const scheme = await stored(page, schemeId);
    return await Promise.all(idList(scheme['skos:hasTopConcept']).map((id) => build(id, 0)));
}

/** Where the drag placeholder (SortableJS ghost) currently is: { parent: id of its list, index }. */
export const ghostPosition = (page) => page.evaluate(() => {
    const g = document.querySelector('.ghost-drag');
    if (!g) return null;
    const list = g.parentElement;
    return { parent: list.id || '', index: [...list.children].filter((el) => el.tagName === 'LI').indexOf(g) };
});

/**
 * Drags node fromId by its handle and sweeps the pointer down over `over` (a locator; at a few
 * x positions, in small steps) until the drag placeholder sits at index `index` of the list whose
 * id is `parent` ('' = the top level, 'framework_drag' = the title header, otherwise a concept id
 * for its children), then drops. SortableJS (forceFallback) needs real mouse events, and where a
 * drop lands depends on layout shifts during the drag, so the helper watches the placeholder
 * instead of aiming at fixed coordinates. Returns false (after dropping where it started) when
 * the placeholder never got there.
 */
export async function dragNode(page, fromId, target, over, { retry = true, pickupTimeout = 30_000 } = {}) {
    // A sweep that misses drops the node back where it started, so one retry is harmless.
    return (await dragNodeOnce(page, fromId, target, over, pickupTimeout))
        || (retry && await dragNodeOnce(page, fromId, target, over, pickupTimeout));
}

async function dragNodeOnce(page, fromId, { parent, index }, over, pickupTimeout) {
    const row = nodeRow(page, fromId);
    let start;
    // Press the handle until Sortable picks the item up. The top-level concept / level lists set
    // SortableJS's `delay: 100` (moving before the drag has started cancels it), and Sortable marks
    // the item "chosen" once it has; the hierarchy may also still be re-rendering after a previous
    // drop, which moves the handle.
    await expect(async () => {
        await page.mouse.up();
        await row.hover();
        const handle = row.locator('.handle-button');
        await expect(handle).toBeVisible({ timeout: 2_000 });
        const hb = await handle.boundingBox();
        start = { x: hb.x + hb.width / 2, y: hb.y + hb.height / 2 };
        await page.mouse.move(start.x, start.y);
        await page.mouse.down();
        await expect(nodeLi(page, fromId)).toHaveClass(/chosen-drag/, { timeout: 2_000 });
    }).toPass({ timeout: pickupTimeout });
    await page.mouse.move(start.x + 5, start.y + 5, { steps: 5 });
    const at = (g) => g && g.parent === parent && (index == null || g.index === index);
    // In fallback mode Sortable re-evaluates the pointer position on a 50 ms timer, so the
    // placeholder can still move after the pointer stops (the layout shifts as it moves). Accept a
    // position only once it has held for a few of those ticks.
    const settled = async () => {
        for (let i = 0; i < 4; i++) {
            if (!at(await ghostPosition(page))) return false;
            await page.waitForTimeout(60); // Last resort: waits out Sortable's 50 ms emulation timer.
        }
        return at(await ghostPosition(page));
    };
    let found = false;
    // Sweep down, then back up: some slots are only reachable from one side.
    const sweeps = [];
    for (const xf of [0.3, 0.15, 0.5]) sweeps.push([xf, 1], [xf, -1]);
    for (const [xf, dir] of sweeps) {
        const box = await over.boundingBox();
        const ys = [];
        for (let y = box.y - 4; y <= box.y + box.height + 4; y += 3) ys.push(y);
        if (dir < 0) ys.reverse();
        for (const y of ys) {
            if (found) break;
            await page.mouse.move(box.x + box.width * xf, y, { steps: 2 });
            if (!at(await ghostPosition(page))) continue;
            // Hold the pointer over the placeholder itself, where Sortable has nothing to swap with.
            const g = await page.evaluate(() => {
                const r = document.querySelector('.ghost-drag').getBoundingClientRect();
                return { x: r.x, y: r.y, width: r.width, height: r.height };
            });
            await page.mouse.move(box.x + box.width * xf, g.y + Math.min(g.height / 2, 15), { steps: 2 });
            found = await settled();
        }
        if (found) break;
    }
    if (!found) await page.mouse.move(start.x, start.y, { steps: 5 });
    await page.mouse.up();
    return found;
}

/**
 * SERVER / ENVIRONMENT (reported): on a freshly created CaSS index the editor's assertion search
 * (sorted on a field Elasticsearch mapped as text) fails with HTTP 400 "Fielddata is disabled on
 * [__anonymous_] in [schema.cassproject.org.0.4.assertion]", logged as two console errors. It does
 * not come from the flows under test.
 */
export const ASSERTION_SORT_ERRORS = [
    /Fielddata is disabled on \[__anonymous_\] in \[schema\.cassproject\.org\.0\.4\.assertion\]/,
    /Failed to load resource: the server responded with a status of 400 \(Bad Request\)/,
];

/** problems(log) (fixtures.js) minus the assertion-sort console errors above. */
export const consoleProblems = (log) => problems(log).filter((text) => !ASSERTION_SORT_ERRORS.some((re) => re.test(text)));
