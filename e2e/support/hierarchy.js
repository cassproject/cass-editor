// Helpers for the hierarchy (drag & drop) tests, TEST-CASES.md §4.
//
// The hierarchy is vuedraggable (SortableJS) with forceFallback: true, so a drag needs real
// mouse events (down on the ".handle" icon, several moves, up); locator.dragTo's HTML5 drag
// events are ignored.
import { expect } from '@playwright/test';

/** The <li> of a competency in the hierarchy (its id attribute is the competency's id). */
export const nodeLi = (page, id) => page.locator(`li[id="${id}"]`);

/** The row (name, buttons) of a competency, without its children. */
export const nodeRow = (page, id) => nodeLi(page, id).locator('> div.lode__hierarchy-item');

/** The checkbox label used to select a competency. */
export const nodeCheckbox = (page, id) => nodeRow(page, id).locator('.check-radio-column label');

/**
 * Ticks (or unticks) a competency's checkbox and waits until the page shows that state. A click
 * landing while the hierarchy re-renders (e.g. after CaSS announces a save) can be lost, so it
 * is retried; retries are seconds apart, as two clicks within 500 ms count as a double click
 * (select with children, HierarchyNode.checkForDblClick).
 */
export async function setSelected(page, id, selected = true) {
    const box = nodeRow(page, id).locator('.check-radio-column input[type=checkbox]');
    await expect(async () => {
        if ((await box.isChecked()) !== selected) await nodeCheckbox(page, id).click();
        if (selected) await expect(box).toBeChecked({ timeout: 3_000 });
        else await expect(box).not.toBeChecked({ timeout: 3_000 });
    }).toPass({ timeout: 30_000 });
}

/**
 * The hierarchy as the page shows it: [{ id, children: [...] }] in display order, read from the
 * nested lists.
 */
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
 * The hierarchy as CaSS stored it: competency list order plus "narrows" relations (source
 * narrows target = source is a child of target). Returns { competency, narrows: [[child, parent]],
 * tree } where tree has the same shape as uiTree.
 */
export async function storedTree(page, frameworkId) {
    return await page.evaluate(async (id) => {
        // Read straight from the server (not the editor's in-memory cache) to see what was stored.
        const get = async (url) => {
            const res = await fetch(url, { cache: 'no-store', headers: { Accept: 'application/json' } });
            return res.ok ? await res.json() : null;
        };
        const fw = await get(id);
        const competency = fw.competency || [];
        const narrows = [];
        for (const rid of fw.relation || []) {
            const r = await get(rid);
            if (r && r.relationType === 'narrows') narrows.push([r.source, r.target]);
        }
        const children = {};
        const isChild = new Set();
        for (const [child, parent] of narrows) {
            if (!competency.includes(child) || !competency.includes(parent)) continue;
            (children[parent] = children[parent] || []).push(child);
            isChild.add(child);
        }
        const order = (ids) => ids.slice().sort((a, b) => competency.indexOf(a) - competency.indexOf(b));
        const build = (cid, seen) => ({
            id: cid,
            children: seen.has(cid) ? [] : order(children[cid] || []).map((c) => build(c, new Set([...seen, cid]))),
        });
        const tree = order(competency.filter((c) => !isChild.has(c))).map((c) => build(c, new Set()));
        return { competency, narrows, tree };
    }, frameworkId);
}

/** Maps a tree of ids to names (for readable assertions). */
export const named = (tree, idToName) => tree.map((n) => ({ name: idToName[n.id] ?? n.id, children: named(n.children, idToName) }));

/** Inverts seedFramework's { name: id } map. */
export const invert = (map) => Object.fromEntries(Object.entries(map).map(([k, v]) => [v, k]));

/** Waits until every seeded competency is rendered in the hierarchy. */
export async function waitForHierarchy(page, ids) {
    for (const id of ids) {
        // Generous: the hierarchy renders slowly while the shared machine is busy.
        await expect(nodeRow(page, id)).toBeVisible({ timeout: 60_000 });
    }
}

/** Where the drag's placeholder (Sortable's ghost, the dragged <li>) currently sits. */
async function ghostPlace(page) {
    return await page.evaluate(() => {
        const g = document.querySelector('.ghost-drag');
        if (!g) return null;
        return { parent: g.parentElement.id, prev: g.previousElementSibling?.id ?? null, next: g.nextElementSibling?.id ?? null };
    });
}

/**
 * Drags competency `fromId` by its handle until the drop placeholder is where `where` says, then
 * drops it. where: { into: parentId } (as first child of a competency), { before: id } or
 * { after: id } (a sibling of id), or { title: true } (the framework title). The pointer glides
 * over the target row (re-measured at each step, as rows shift while dragging) and is released
 * as soon as the placeholder is in place; SortableJS runs in fallback mode, hence real mouse
 * events. Fails if no position over the target puts the placeholder there, unless mustPlace is
 * false (the drop is then made wherever the placeholder ended up, for tests that check the outcome).
 */
export async function dragTo(page, fromId, where, { mustPlace = true } = {}) {
    const target = where.title ? page.locator('#framework_drag')
        : nodeRow(page, where.into ?? where.before ?? where.after);
    const placed = (g) => g != null && (
        where.title ? g.parent === 'framework_drag'
            : where.into ? g.parent === where.into && g.prev == null
                : where.before ? g.next === where.before
                    : g.prev === where.after);
    // Fractions of the target's height to try, in order.
    const ys = where.title ? [0.5, 0.3, 0.7, 0.9]
        : where.into ? [0.85, 0.9, 0.93, 0.95, 0.97, 0.99, 1.02, 1.05]
            : where.before ? [0.2, 0.1, 0.3, 0.05, 0.4]
                : [0.75, 0.8, 0.7, 0.85, 0.6, 0.9];
    const row = nodeRow(page, fromId);
    await row.hover();
    const handle = row.locator('.handle-button');
    await expect(handle).toBeVisible();
    const hb = await handle.boundingBox();
    const start = { x: hb.x + hb.width / 2, y: hb.y + hb.height / 2 };
    await page.mouse.move(start.x, start.y);
    await page.mouse.down();
    // Sortable starts dragging after the pointer has moved a little.
    await page.mouse.move(start.x + 5, start.y + 5, { steps: 5 });
    await expect(page.locator('.ghost-drag')).toHaveCount(1);
    let last = null;
    for (let attempt = 0; attempt < 2 && !placed(last); attempt++) {
        for (const y of ys) {
            const tb = await target.boundingBox();
            // The title is reached in one jump, so rows on the way do not capture the drag.
            await page.mouse.move(tb.x + tb.width * 0.4, tb.y + tb.height * y, { steps: where.title ? 1 : 8 });
            last = await ghostPlace(page);
            if (placed(last)) break;
        }
    }
    await page.mouse.up();
    await expect(page.locator('.ghost-drag')).toHaveCount(0);
    if (!mustPlace) return;
    expect(placed(last), `drop position for ${JSON.stringify(where)}; placeholder was at ${JSON.stringify(last)}`).toBeTruthy();
}

/**
 * Builds an expected tree for named(): tree('A', { B: ['C'] }) is A and B at the top, C under B.
 */
export const tree = (...items) => items.flatMap((item) => (typeof item === 'string'
    ? [{ name: item, children: [] }]
    : Object.entries(item).map(([name, children]) => ({ name, children: tree(...children) }))));

/** Waits until both the page and CaSS show `expected` (a tree()) for the framework. */
export async function expectHierarchy(page, frameworkId, names, expected) {
    await expect.poll(async () => named(await uiTree(page), names), { message: 'hierarchy shown in the page' }).toEqual(expected);
    await expect.poll(async () => named((await storedTree(page, frameworkId)).tree, names), { message: 'hierarchy stored in CaSS' }).toEqual(expected);
    // The page re-renders when CaSS announces the save (websocket); it must end up agreeing.
    await expect.poll(async () => named(await uiTree(page), names), { message: 'hierarchy shown in the page after saving' }).toEqual(expected);
}

/**
 * Opens a framework by navigating inside the already loaded editor (as a user does from the
 * frameworks list), after app.login. A deep link / reload (app.open('/framework', { frameworkId }))
 * leaves the drop target on the framework title disabled (the DND-03 known-bug test in
 * hierarchy.spec.js), so the hierarchy tests open frameworks this way. Retries because a navigation issued while the
 * frameworks list is still initialising can be superseded by the list's own route update.
 */
export async function openFramework(page, frameworkId) {
    await expect(async () => {
        await page.evaluate((id) => window.app.$router.push({ name: 'framework', params: { frameworkId: id } }), frameworkId);
        await expect(page.locator('#framework .lode__hierarchy')).toBeAttached({ timeout: 15_000 });
    }).toPass({ timeout: 120_000 });
}
