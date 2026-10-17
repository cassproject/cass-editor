// TEST-CASES.md §4 Hierarchy drag & drop (DND-01 … DND-05).
//
// The hierarchy is vuedraggable/SortableJS in fallback mode, so drags use real mouse events
// (support/hierarchy.js dragTo). Every change is checked twice: in the page and in what
// CaSS stored (the framework's competency order and its "narrows" relations, read from the server).
import { test, expect, problems } from '../support/fixtures.js';
import {
    nodeLi, nodeRow, setSelected, uiTree, storedTree, dragTo, waitForHierarchy, invert, named, tree, expectHierarchy, openFramework,
} from '../support/hierarchy.js';

/** Logs in, seeds a framework and opens it from inside the editor. */
async function setup(app, page, account, competencies) {
    await app.login(account);
    const fw = await app.seedFramework({ competencies });
    // Opening a framework CaSS cannot find yet sends the editor back to the list.
    await app.waitIndexed(`@id:"${fw.id}"`);
    await openFramework(page, fw.id);
    await waitForHierarchy(page, Object.values(fw.competencies));
    return { fw, c: fw.competencies, names: invert(fw.competencies) };
}

/** Presses a Shift+Arrow move key once the competency is (still) the selected one. */
async function moveKey(page, id, key) {
    await expect(nodeRow(page, id).locator('input[type=checkbox]')).toBeChecked();
    // Moves apply only while exactly one competency is selected.
    await expect(page.locator('ul.lode__hierarchy-ul input[type=checkbox]:checked')).toHaveCount(1);
    await page.keyboard.press(key);
}

const caret = (page, id) => nodeRow(page, id).locator('.expand-column .fa-caret-down, .expand-column .fa-caret-right');
const toolbarButton = (page, title) => page.locator(`.hierarchy-buttons button[title="${title}"]`);
const COPY = 'Copy competency';
const CUT = 'Cut competency';
const PASTE = 'Paste competency';
const CLEAR = 'Clear clipboard';

/** Checks which of copy / cut / paste / clear are enabled (they are native buttons). */
async function expectButtons(page, enabled) {
    for (const title of [COPY, CUT, PASTE, CLEAR]) {
        if (enabled.includes(title)) await expect(toolbarButton(page, title), title).toBeEnabled();
        else await expect(toolbarButton(page, title), title).toBeDisabled();
    }
}

test('DND-01 reorder siblings @P0', async ({ app, page, account, console: log }) => {
    const { fw, c, names } = await setup(app, page, account, ['Alpha', 'Bravo', 'Charlie', 'Delta']);
    await expectHierarchy(page, fw.id, names, tree('Alpha', 'Bravo', 'Charlie', 'Delta'));

    // Down: Alpha dropped between Charlie and Delta.
    await dragTo(page, c.Alpha, { before: c.Delta });
    await expectHierarchy(page, fw.id, names, tree('Bravo', 'Charlie', 'Alpha', 'Delta'));
    // Up: Delta dropped before Bravo.
    await dragTo(page, c.Delta, { before: c.Bravo });
    await expectHierarchy(page, fw.id, names, tree('Delta', 'Bravo', 'Charlie', 'Alpha'));
    expect((await storedTree(page, fw.id)).competency).toEqual([c.Delta, c.Bravo, c.Charlie, c.Alpha]);

    // No row is shown twice.
    for (const id of Object.values(c)) await expect(nodeLi(page, id)).toHaveCount(1);

    // The order persists after a reload.
    await app.open('/framework', { frameworkId: fw.id });
    await waitForHierarchy(page, Object.values(c));
    await expect.poll(async () => named(await uiTree(page), names)).toEqual(tree('Delta', 'Bravo', 'Charlie', 'Alpha'));
    for (const id of Object.values(c)) await expect(nodeLi(page, id)).toHaveCount(1);

    // No duplicate-key (or any other) Vue warnings or console errors.
    expect(problems(log)).toEqual([]);
});

test('DND-02 nest and un-nest @P0', async ({ app, page, account, console: log }) => {
    const { fw, c, names } = await setup(app, page, account, ['Alpha', 'Bravo', 'Charlie', { name: 'Delta', children: ['Echo'] }]);
    await expectHierarchy(page, fw.id, names, tree('Alpha', 'Bravo', 'Charlie', { Delta: ['Echo'] }));
    await expect(caret(page, c.Bravo)).toHaveCount(0);
    await expect(caret(page, c.Delta)).toHaveCount(1);

    // Nest: drop Alpha onto Bravo; Bravo gets a caret.
    await dragTo(page, c.Alpha, { into: c.Bravo });
    await expectHierarchy(page, fw.id, names, tree({ Bravo: ['Alpha'] }, 'Charlie', { Delta: ['Echo'] }));
    await expect(caret(page, c.Bravo)).toHaveCount(1);
    expect((await storedTree(page, fw.id)).narrows).toContainEqual([c.Alpha, c.Bravo]);

    // Un-nest by drag: Echo out of Delta to the top level; Delta loses its caret.
    await dragTo(page, c.Echo, { before: c.Charlie });
    await expect.poll(async () => (await storedTree(page, fw.id)).narrows).not.toContainEqual([c.Echo, c.Delta]);
    // The un-nested node goes back to the top level at its place in the framework's competency
    // list (Echo is last), not necessarily where it was dropped.
    await expectHierarchy(page, fw.id, names, tree({ Bravo: ['Alpha'] }, 'Charlie', 'Delta', 'Echo'));
    await expect(caret(page, c.Delta)).toHaveCount(0);

    // Un-nest with the keyboard move: Shift+ArrowLeft on the selected Alpha.
    await setSelected(page, c.Alpha);
    await moveKey(page, c.Alpha, 'Shift+ArrowLeft');
    await expect.poll(async () => (await storedTree(page, fw.id)).narrows).toEqual([]);
    await expect.poll(async () => named(await uiTree(page), names).map((n) => n.name).sort()).toEqual(['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo']);
    await expect(caret(page, c.Bravo)).toHaveCount(0);

    // The relations persist after a reload.
    await app.open('/framework', { frameworkId: fw.id });
    await waitForHierarchy(page, Object.values(c));
    await expect.poll(async () => named(await uiTree(page), names).map((n) => n.children.length)).toEqual([0, 0, 0, 0, 0]);
    expect(problems(log)).toEqual([]);
});

test('DND-03 drop onto the framework title moves a competency to the top level @P1', async ({ app, page, account, console: log }) => {
    // Opened from inside the editor; after a deep link see the DND-03 known-bug test below.
    const { fw, c, names } = await setup(app, page, account, ['Alpha', { name: 'Delta', children: ['Echo'] }]);
    await expectHierarchy(page, fw.id, names, tree('Alpha', { Delta: ['Echo'] }));
    const dropZone = page.locator('#framework_drag');
    const rawJson = /[{}]|"obj"|"@id"/;
    expect(await dropZone.innerText()).not.toMatch(rawJson);

    await dragTo(page, c.Echo, { title: true });
    await expectHierarchy(page, fw.id, names, tree('Alpha', 'Delta', 'Echo'));
    expect((await storedTree(page, fw.id)).narrows).toEqual([]);
    await expect(caret(page, c.Delta)).toHaveCount(0);
    // The drop zone shows the framework header only, no raw JSON of the dropped item.
    expect(await dropZone.innerText()).not.toMatch(rawJson);
    await expect(dropZone.locator(':scope > :not(.lode__thing)')).toHaveCount(0);
    expect(problems(log)).toEqual([]);
});

test('DND-03 drop onto the framework title works after a deep link (known bug: title drop target disabled after reload) @P1', async ({ app, page, account, console: log }) => {
    test.fail(true, 'After a deep link Framework.vue computes canEdit before the saved login loads, so the title ignores the drop; see e2e/FINDINGS.md');
    await app.login(account);
    const fw = await app.seedFramework({ competencies: ['Alpha', { name: 'Delta', children: ['Echo'] }] });
    const c = fw.competencies;
    const names = invert(c);
    await app.waitIndexed(`@id:"${fw.id}"`);
    // A deep link (fresh page load), as a user following a shared link or reloading.
    await app.open('/framework', { frameworkId: fw.id });
    await waitForHierarchy(page, Object.values(c));
    await expectHierarchy(page, fw.id, names, tree('Alpha', { Delta: ['Echo'] }));

    // The drag itself is not checked here (with the bug the placeholder never reaches the title);
    // the outcome is.
    await dragTo(page, c.Echo, { title: true }, { mustPlace: false });
    await expect.poll(async () => (await storedTree(page, fw.id)).narrows, { timeout: 10_000 }).toEqual([]);
    await expectHierarchy(page, fw.id, names, tree('Alpha', 'Delta', 'Echo'));
    expect(problems(log)).toEqual([]);
});

test.describe('DND-04 move via arrows @P2', () => {
    // Moves are the Shift+Arrow keys on the one selected competency; blocked moves do nothing.

    test('DND-04 Shift+Arrow moves the selected competency up, down, right and left @P2', async ({ app, page, account, console: log }) => {
        const { fw, c, names } = await setup(app, page, account, ['Alpha', 'Bravo', 'Charlie']);
        await setSelected(page, c.Charlie);

        await moveKey(page, c.Charlie, 'Shift+ArrowUp');
        await expectHierarchy(page, fw.id, names, tree('Alpha', 'Charlie', 'Bravo'));
        await moveKey(page, c.Charlie, 'Shift+ArrowDown');
        await expectHierarchy(page, fw.id, names, tree('Alpha', 'Bravo', 'Charlie'));
        // Right: becomes a child of the sibling above.
        await moveKey(page, c.Charlie, 'Shift+ArrowRight');
        await expectHierarchy(page, fw.id, names, tree('Alpha', { Bravo: ['Charlie'] }));
        await expect(caret(page, c.Bravo)).toHaveCount(1);
        // Left: back to the top level. Only the structure is checked here; where it lands is the
        // DND-04 Shift+ArrowLeft known-bug test below.
        await moveKey(page, c.Charlie, 'Shift+ArrowLeft');
        await expect.poll(async () => (await storedTree(page, fw.id)).narrows).toEqual([]);
        await expect.poll(async () => named(await uiTree(page), names).map((n) => `${n.name}:${n.children.length}`).sort())
            .toEqual(['Alpha:0', 'Bravo:0', 'Charlie:0']);
        await expect(caret(page, c.Bravo)).toHaveCount(0);
        expect((await storedTree(page, fw.id)).narrows).toEqual([]);
        expect(problems(log)).toEqual([]);
    });

    test('DND-04 Shift+ArrowLeft puts the competency right after its former parent (known bug: lands one place above the last item) @P2', async ({ app, page, account, console: log }) => {
        test.fail(true, 'Hierarchy.move inserts the moved competency with splice(-1, 0, id), one place above the last item, not after its old parent; see e2e/FINDINGS.md');
        const { fw, c, names } = await setup(app, page, account, ['Alpha', 'Bravo', 'Charlie']);
        await setSelected(page, c.Charlie);
        await moveKey(page, c.Charlie, 'Shift+ArrowRight');
        await expectHierarchy(page, fw.id, names, tree('Alpha', { Bravo: ['Charlie'] }));
        await moveKey(page, c.Charlie, 'Shift+ArrowLeft');
        await expect.poll(async () => (await storedTree(page, fw.id)).narrows).toEqual([]);
        // Charlie comes back right after Bravo, its former parent, in the page and in CaSS.
        await expect.poll(async () => named(await uiTree(page), names), { timeout: 10_000 }).toEqual(tree('Alpha', 'Bravo', 'Charlie'));
        expect((await storedTree(page, fw.id)).competency).toEqual([c.Alpha, c.Bravo, c.Charlie]);
        expect(problems(log)).toEqual([]);
    });

    test('DND-04 blocked moves do nothing @P2', async ({ app, page, account, console: log }) => {
        const { fw, c, names } = await setup(app, page, account, ['Alpha', 'Bravo', 'Charlie']);
        // Alpha is first and top level: up, left and right (no sibling above) are blocked.
        await setSelected(page, c.Alpha);
        await moveKey(page, c.Alpha, 'Shift+ArrowUp');
        await moveKey(page, c.Alpha, 'Shift+ArrowLeft');
        await moveKey(page, c.Alpha, 'Shift+ArrowRight');
        // A permitted move afterwards shows that the blocked ones changed nothing.
        await moveKey(page, c.Alpha, 'Shift+ArrowDown');
        await expectHierarchy(page, fw.id, names, tree('Bravo', 'Alpha', 'Charlie'));
        // Start over with a fresh selection: unticking Alpha right after the move is sometimes
        // undone when the hierarchy re-renders for CaSS's save notice (Alpha is back in the
        // selection), so reload instead.
        await app.open('/framework', { frameworkId: fw.id });
        await waitForHierarchy(page, Object.values(c));

        // Charlie is last: down is blocked.
        await setSelected(page, c.Charlie);
        await moveKey(page, c.Charlie, 'Shift+ArrowDown');
        await moveKey(page, c.Charlie, 'Shift+ArrowUp');
        await expectHierarchy(page, fw.id, names, tree('Bravo', 'Charlie', 'Alpha'));
        const stored = await storedTree(page, fw.id);
        expect(stored.narrows).toEqual([]);
        expect(stored.competency).toEqual([c.Bravo, c.Charlie, c.Alpha]);
        expect(problems(log)).toEqual([]);
    });
});

test.describe('DND-05 copy / cut / paste @P1', () => {
    test('DND-05 copy and paste links the competency under the selected one @P1', async ({ app, page, account, console: log }) => {
        const { fw, c, names } = await setup(app, page, account, ['Alpha', 'Bravo', { name: 'Delta', children: ['Echo'] }]);
        await expectButtons(page, []);

        await setSelected(page, c.Echo);
        await expectButtons(page, [COPY, CUT]);
        await toolbarButton(page, COPY).click();
        await expect(nodeRow(page, c.Echo)).toHaveClass(/is-copied/);
        // The copied item is the only selection, so there is nowhere to paste yet.
        await expectButtons(page, [COPY, CUT, CLEAR]);

        await setSelected(page, c.Bravo);
        await expectButtons(page, [PASTE, CLEAR]);
        await toolbarButton(page, PASTE).click();

        // Paste links: the same competency is placed under Bravo too (a new "narrows" relation);
        // no new competency is created.
        await expectHierarchy(page, fw.id, names, tree('Alpha', { Bravo: ['Echo'] }, { Delta: ['Echo'] }));
        const stored = await storedTree(page, fw.id);
        expect(stored.competency).toHaveLength(4);
        expect(stored.narrows).toEqual(expect.arrayContaining([[c.Echo, c.Delta], [c.Echo, c.Bravo]]));
        expect(stored.narrows).toHaveLength(2);
        // The clipboard is emptied by the paste.
        await expect(toolbarButton(page, PASTE)).toBeDisabled();
        await expect(toolbarButton(page, CLEAR)).toBeDisabled();
        expect(problems(log)).toEqual([]);
    });

    test('DND-05 cut and paste moves the competency with its children @P1', async ({ app, page, account, console: log }) => {
        const { fw, c, names } = await setup(app, page, account, ['Alpha', 'Bravo', { name: 'Delta', children: ['Echo'] }]);
        await setSelected(page, c.Delta);
        await expectButtons(page, [COPY, CUT]);
        await toolbarButton(page, CUT).click();
        await expect(nodeRow(page, c.Delta)).toHaveClass(/is-cut/);
        await expectButtons(page, [COPY, CUT, CLEAR]);

        await setSelected(page, c.Bravo);
        await expectButtons(page, [PASTE, CLEAR]);
        await toolbarButton(page, PASTE).click();

        await expectHierarchy(page, fw.id, names, tree('Alpha', { Bravo: [{ Delta: ['Echo'] }] }));
        const stored = await storedTree(page, fw.id);
        expect(stored.competency).toHaveLength(4);
        expect(stored.narrows).toEqual(expect.arrayContaining([[c.Delta, c.Bravo], [c.Echo, c.Delta]]));
        expect(stored.narrows).toHaveLength(2);
        await expect(toolbarButton(page, PASTE)).toBeDisabled();
        await expect(toolbarButton(page, CLEAR)).toBeDisabled();
        expect(problems(log)).toEqual([]);
    });

    test('DND-05 clear clipboard @P1', async ({ app, page, account, console: log }) => {
        const { fw, c, names } = await setup(app, page, account, ['Alpha', 'Bravo']);
        await setSelected(page, c.Alpha);
        await toolbarButton(page, COPY).click();
        await expect(nodeRow(page, c.Alpha)).toHaveClass(/is-copied/);
        await expect(toolbarButton(page, CLEAR)).toBeEnabled();

        await toolbarButton(page, CLEAR).click();
        await expect(toolbarButton(page, CLEAR)).toBeDisabled();
        await expect(nodeRow(page, c.Alpha)).not.toHaveClass(/is-copied/);
        // With an empty clipboard, selecting another node does not enable paste.
        await setSelected(page, c.Bravo);
        await expectButtons(page, []);
        await expectHierarchy(page, fw.id, names, tree('Alpha', 'Bravo'));
        expect(problems(log)).toEqual([]);
    });
});
