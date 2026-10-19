// TEST-CASES.md §7 Crosswalk (XW-01 … XW-04).
import { test, expect, unique } from '../support/fixtures.js';
import {
    crosswalkState, stepList, pickFramework, goCrosswalk, sourceColumn, targetColumn, nodeRow, startCrosswalk, waitForAlign,
    relationOptions, chooseSourceRelation, plusButton, checkButton, crosswalkButton, seedAlignment,
    storedAlignments, sortAlignments, stored,
} from '../support/crosswalk.js';
import { consoleProblems } from '../support/taxonomies.js';

/** Logs in and seeds a source and a target framework (unique names) owned by the user. */
async function seedPair(app, account, { source = ['S1', 'S2'], target = ['T1', 'T2', 'T3'] } = {}) {
    await app.login(account);
    const tag = unique('XW');
    const src = await app.seedFramework({ name: `${tag} source`, competencies: source.map((n) => `${n} ${tag}`) });
    const tgt = await app.seedFramework({ name: `${tag} target`, competencies: target.map((n) => `${n} ${tag}`) });
    // Short names: S1 -> id.
    const ids = (fw) => Object.fromEntries(Object.entries(fw.competencies).map(([n, id]) => [n.split(' ')[0], id]));
    src.c = ids(src);
    tgt.c = ids(tgt);
    await app.waitIndexed(`@id:"${src.id}"`);
    await app.waitIndexed(`@id:"${tgt.id}"`);
    return { src, tgt };
}

/**
 * Picks a relation type to use: "is enabled by" when the configuration offers it, else the first
 * other than "narrows" (the types offered depend on the configuration in effect).
 */
async function pickRelation(page, sourceRow, avoid = ['narrows']) {
    const options = (await relationOptions(page, sourceRow)).filter((o) => !avoid.includes(o.value));
    expect(options.length).toBeGreaterThan(0);
    return options.find((o) => o.value === 'isEnabledBy') ?? options[0];
}

test.describe('Crosswalk', () => {
    test('XW-01 full alignment flow @P0', async ({ app, page, account, console: log }) => {
        const { src, tgt } = await seedPair(app, account);

        await goCrosswalk(app);
        await expect(page.locator('.step-item.current')).toContainText('select source');
        // "Owned by me" defaults on.
        await expect(page.locator('#ownedByMe')).toBeChecked();
        await pickFramework(page, src.name);
        await expect(page.locator('.step-item.current')).toContainText('select target');
        await pickFramework(page, tgt.name);
        await waitForAlign(page, src, tgt);

        // The source competency's "add" control is a real, clickable button (regression: it was a
        // pseudo-button), shown on hover.
        const s1 = nodeRow(sourceColumn(page), src.c.S1);
        const add = s1.locator('.crosswalk-buttons__source__create');
        expect(await add.evaluate((el) => el.tagName)).toBe('BUTTON');
        await expect(add).toHaveText(/^\s*add\s*$/i);
        await expect(add).toBeEnabled();
        // No target can be picked before a source and relation are chosen.
        await expect(targetColumn(page).locator('.crosswalk-buttons__target')).toHaveCount(0);

        // Hidden until the pointer is over the source competency.
        await page.mouse.move(0, 0);
        await expect(add).toBeHidden();
        await s1.hover();
        await expect(add).toBeVisible();
        await add.click();
        const relation = await pickRelation(page, s1);
        await s1.locator('.crosswalk-buttons__source__select select').selectOption(relation.value);
        // The source shows the relation tag.
        await expect(s1.locator('.crosswalk-buttons__source__type')).toHaveText(relation.label);
        // Other sources cannot start an alignment meanwhile.
        await expect(nodeRow(sourceColumn(page), src.c.S2).locator('.crosswalk-buttons__source__create')).toBeDisabled();

        // "+" on every target; pick two of them.
        const t = Object.fromEntries(['T1', 'T2', 'T3'].map((n) => [n, nodeRow(targetColumn(page), tgt.c[n])]));
        for (const row of Object.values(t)) {
            await expect(plusButton(row)).toBeVisible();
            await expect(checkButton(row)).toBeHidden();
        }
        await plusButton(t.T1).click();
        await plusButton(t.T2).click();
        // Chosen targets show a check, the others keep their "+".
        for (const row of [t.T1, t.T2]) {
            await expect(checkButton(row)).toBeVisible();
            await expect(plusButton(row)).toBeHidden();
        }
        await expect(plusButton(t.T3)).toBeVisible();
        await expect(checkButton(t.T3)).toBeHidden();

        await crosswalkButton(page, 'apply alignments').click();
        await expect(page.locator('.crosswalk-topbar .tag')).toHaveText('adding 2');
        // The source now carries an alignment tag with the relation and the count.
        const alignTag = s1.locator('.crosswalk__align_link');
        await expect(alignTag).toHaveCount(1);
        await expect(alignTag).toContainText(relation.label);
        await expect(alignTag).toContainText('2');
        await expect(s1).toHaveClass(/is-crosswalk-aligned/);
        await expect(t.T1).toHaveClass(/is-crosswalk-aligned/);
        await expect(t.T3).toHaveClass(/not-crosswalk-aligned/);

        // Save & review: the summary lists the pending alignments and both (owned) frameworks.
        await crosswalkButton(page, 'save & review').click();
        await expect(page.locator('.step-item.current')).toContainText('save & review');
        const summary = page.locator('.crosswalk__summary');
        await expect(summary).toContainText('2 alignments ready to add');
        await expect(summary.locator('#saveToSourceFramework')).toBeChecked();
        await expect(summary.locator('#saveToTargetFramework')).toBeChecked();
        await expect(summary.locator('label[for=saveToSourceFramework]')).toHaveText(src.name);
        await expect(summary.locator('label[for=saveToTargetFramework]')).toHaveText(tgt.name);
        await summary.getByText('save alignments').click();
        // Saving to both frameworks returns to the frameworks list.
        await expect(page).toHaveURL(/#\/frameworks/);

        // Stored: two alignments of the chosen type, listed on both frameworks, owned by the user.
        const expected = sortAlignments([
            { source: src.c.S1, target: tgt.c.T1, relationType: relation.value },
            { source: src.c.S1, target: tgt.c.T2, relationType: relation.value },
        ]);
        await expect.poll(async () => sortAlignments(await storedAlignments(page, src.id))).toEqual(expected);
        await expect.poll(async () => sortAlignments(await storedAlignments(page, tgt.id))).toEqual(expected);

        // Opening the crosswalk again shows the saved alignments.
        await startCrosswalk(app, src, tgt);
        const again = nodeRow(sourceColumn(page), src.c.S1).locator('.crosswalk__align_link');
        await expect(again).toContainText(relation.label);
        await expect(again).toContainText('2');
        expect(consoleProblems(log)).toEqual([]);
    });
    test('XW-02 step transitions @P1', async ({ app, page, account, console: log }) => {
        const { src, tgt } = await seedPair(app, account);
        const otherName = `${src.name} other`;
        const other = await app.seedFramework({ name: otherName, competencies: [`O1 ${otherName}`] });
        await app.waitIndexed(`@id:"${other.id}"`);

        await goCrosswalk(app);
        await expect(stepList(page)).toBeVisible();
        // Record the slide-fade transition classes the steps enter with.
        await page.evaluate(() => {
            window.__e2eTransitions = [];
            const note = (el) => {
                if (el.nodeType !== 1) return;
                const cls = String(el.className);
                if (/slide-fade-enter/.test(cls)) window.__e2eTransitions.push(cls);
            };
            new MutationObserver((records) => {
                for (const r of records) {
                    if (r.type === 'attributes') note(r.target);
                    for (const n of r.addedNodes || []) note(n);
                }
            }).observe(document.getElementById('crosswalk'), { subtree: true, childList: true, attributes: true, attributeFilter: ['class'] });
        });
        const entered = (part) => expect.poll(() => page.evaluate((p) => window.__e2eTransitions.some((c) => c.includes(p)), part), { message: `${part} fades in` }).toBe(true);
        const resetTransitions = () => page.evaluate(() => { window.__e2eTransitions = []; });
        const current = page.locator('.step-item.current');
        const complete = page.locator('.step-item.complete');

        // A: select source.
        await expect(current).toContainText('select source');
        await expect(complete).toHaveCount(0);
        await pickFramework(page, src.name);

        // B: select target; the list is not blank.
        await expect(current).toContainText('select target');
        await expect(complete).toHaveText([/select source/]);
        await entered('crosswalk__list');
        await resetTransitions();
        await pickFramework(page, tgt.name);

        // Align: both hierarchies render.
        await waitForAlign(page, src, tgt);
        await expect(complete).toHaveText([/select source/, /select target/]);
        await entered('crosswalk__double-hierarchy');
        await expect(sourceColumn(page)).toContainText(src.name);
        await expect(targetColumn(page)).toContainText(tgt.name);

        // Start an alignment without applying it.
        const startWorking = async () => {
            const s1 = nodeRow(sourceColumn(page), src.c.S1);
            const relation = await pickRelation(page, s1);
            await chooseSourceRelation(page, s1, relation.value);
            await plusButton(nodeRow(targetColumn(page), tgt.c.T1)).click();
            await expect(crosswalkButton(page, 'apply alignments')).toBeVisible();
        };
        await startWorking();

        // Back to B via "change target": the list shows again and the working alignment is dropped.
        await resetTransitions();
        await page.locator('button[title="change target"]').click();
        await expect(current).toContainText('select target');
        await expect(complete).toHaveText([/select source/]);
        await entered('crosswalk__list');
        await expect(stepList(page)).toBeVisible();
        expect((await crosswalkState(page)).working).toMatchObject({ source: '', targets: [], type: '', changed: false });
        await pickFramework(page, tgt.name);
        await waitForAlign(page, src, tgt);
        await expect(crosswalkButton(page, 'apply alignments')).toHaveCount(0);
        await expect(page.locator('.crosswalk-buttons__source__type')).toHaveCount(0);
        expect(await crosswalkState(page)).toMatchObject({ sourceState: 'ready', toSave: 0, toDelete: 0 });

        // Back to A via "change source": dependent state resets.
        await startWorking();
        await resetTransitions();
        await page.locator('button[title="change source"]').click();
        await expect(current).toContainText('select source');
        await expect(complete).toHaveCount(0);
        await entered('crosswalk__list');
        const state = await crosswalkState(page);
        expect(state.step).toBe(0);
        expect(state.sourceRelationships).toBeNull();
        expect(state.working).toMatchObject({ source: '', targets: [], type: '', changed: false });
        expect(state).toMatchObject({ sourceState: 'ready', toSave: 0, toDelete: 0 });
        // Choosing another source goes straight back to aligning against the same target.
        await pickFramework(page, otherName);
        await expect(current).toContainText('align frameworks');
        await expect(nodeRow(sourceColumn(page), other.competencies[`O1 ${otherName}`])).toBeVisible();
        await expect(nodeRow(sourceColumn(page), src.c.S1)).toHaveCount(0);
        for (const id of Object.values(tgt.c)) await expect(nodeRow(targetColumn(page), id)).toBeVisible({ timeout: 30_000 });
        await expect(crosswalkButton(page, 'apply alignments')).toHaveCount(0);
        await expect(page.locator('.crosswalk-buttons__source__type')).toHaveCount(0);
        expect(consoleProblems(log)).toEqual([]);
    });

    test.describe('XW-03 remove / change alignments @P1', () => {
        /** Seeds S1 -> T1 and S1 -> T2 of relation x on both frameworks and opens the crosswalk on them. */
        const setup = async (app, page, account) => {
            const { src, tgt } = await seedPair(app, account);
            // Learn which relation types the configuration in effect offers.
            await startCrosswalk(app, src, tgt);
            const options = (await relationOptions(page, nodeRow(sourceColumn(page), src.c.S1))).filter((o) => o.value !== 'narrows');
            expect(options.length).toBeGreaterThan(1);
            const [x, y] = options;
            const a1 = await seedAlignment(page, { source: src.c.S1, target: tgt.c.T1, relationType: x.value, frameworkIds: [src.id, tgt.id] });
            const a2 = await seedAlignment(page, { source: src.c.S1, target: tgt.c.T2, relationType: x.value, frameworkIds: [src.id, tgt.id] });
            await expect.poll(async () => (await storedAlignments(page, src.id)).length).toBe(2);
            await app.go('/frameworks');
            await startCrosswalk(app, src, tgt);
            const s1 = nodeRow(sourceColumn(page), src.c.S1);
            await expect(s1.locator('.crosswalk__align_link')).toHaveText(new RegExp(`${x.label}\\s*2`));
            return { src, tgt, x, y, a1, a2, s1 };
        };
        const save = async (page, summaryText) => {
            await crosswalkButton(page, 'save & review').click();
            const summary = page.locator('.crosswalk__summary');
            for (const text of summaryText) await expect(summary).toContainText(text);
            await summary.getByText('save alignments').click();
            await expect(page).toHaveURL(/#\/frameworks/);
        };

        test('remove an alignment', async ({ app, page, account, console: log }) => {
            const { src, tgt, x, a1, a2, s1 } = await setup(app, page, account);
            // Clicking the alignment tag selects that relation and shows its targets checked.
            await s1.locator('.crosswalk__align_link').click();
            const t1 = nodeRow(targetColumn(page), tgt.c.T1);
            const t2 = nodeRow(targetColumn(page), tgt.c.T2);
            await expect(checkButton(t1)).toBeVisible();
            await expect(checkButton(t2)).toBeVisible();
            await expect(plusButton(nodeRow(targetColumn(page), tgt.c.T3))).toBeVisible();

            await checkButton(t1).click();
            await expect(plusButton(t1)).toBeVisible();
            await expect(checkButton(t1)).toBeHidden();
            await crosswalkButton(page, 'apply alignments').click();
            await expect(page.locator('.crosswalk-topbar .tag')).toHaveText('removing 1');
            await expect(s1.locator('.crosswalk__align_link')).toHaveText(new RegExp(`${x.label}\\s*1`));
            await expect(t1).toHaveClass(/not-crosswalk-aligned/);

            await save(page, ['1 alignment ready to remove']);
            const remaining = [{ source: src.c.S1, target: tgt.c.T2, relationType: x.value }];
            await expect.poll(async () => sortAlignments(await storedAlignments(page, src.id))).toEqual(remaining);
            await expect.poll(async () => sortAlignments(await storedAlignments(page, tgt.id))).toEqual(remaining);
            await expect.poll(async () => (await storedAlignments(page, src.id)).map((a) => a.id)).toEqual([a2]);
            await expect.poll(() => stored(page, a1), { message: 'removed alignment deleted from CaSS' }).toBeNull();

            // Persists: the crosswalk now shows one alignment.
            await startCrosswalk(app, src, tgt);
            await expect(nodeRow(sourceColumn(page), src.c.S1).locator('.crosswalk__align_link')).toHaveText(new RegExp(`${x.label}\\s*1`));
            expect(consoleProblems(log)).toEqual([]);
        });

        test('change the relation type of an alignment', async ({ app, page, account, console: log }) => {
            const { src, tgt, x, y, a1, s1 } = await setup(app, page, account);
            const t1 = nodeRow(targetColumn(page), tgt.c.T1);
            // Take T1 out of relation x ...
            await s1.locator('.crosswalk__align_link').click();
            await checkButton(t1).click();
            await crosswalkButton(page, 'apply alignments').click();
            // ... and add it back with relation y.
            await chooseSourceRelation(page, s1, y.value);
            await expect(s1.locator('.crosswalk-buttons__source__type')).toHaveText(y.label);
            await expect(plusButton(t1)).toBeVisible();
            await expect(checkButton(nodeRow(targetColumn(page), tgt.c.T2))).toBeHidden(); // T2 is aligned by x, not y
            await plusButton(t1).click();
            await crosswalkButton(page, 'apply alignments').click();
            await expect(page.locator('.crosswalk-topbar .tag')).toHaveText(['adding 1', 'removing 1']);
            const tags = s1.locator('.crosswalk__align_link');
            await expect(tags).toHaveCount(2);
            await expect(tags.filter({ hasText: x.label })).toHaveText(new RegExp(`${x.label}\\s*1`));
            await expect(tags.filter({ hasText: y.label })).toHaveText(new RegExp(`${y.label}\\s*1`));

            await save(page, ['1 alignment ready to add', '1 alignment ready to remove']);
            const expected = sortAlignments([
                { source: src.c.S1, target: tgt.c.T1, relationType: y.value },
                { source: src.c.S1, target: tgt.c.T2, relationType: x.value },
            ]);
            await expect.poll(async () => sortAlignments(await storedAlignments(page, src.id))).toEqual(expected);
            await expect.poll(async () => sortAlignments(await storedAlignments(page, tgt.id))).toEqual(expected);
            await expect.poll(() => stored(page, a1), { message: 'replaced alignment deleted from CaSS' }).toBeNull();

            await startCrosswalk(app, src, tgt);
            const after = nodeRow(sourceColumn(page), src.c.S1).locator('.crosswalk__align_link');
            await expect(after).toHaveCount(2);
            await expect(after.filter({ hasText: y.label })).toHaveText(new RegExp(`${y.label}\\s*1`));
            expect(consoleProblems(log)).toEqual([]);
        });
    });

    test('XW-04 aligned / unaligned filters @P2', async ({ app, page, account, console: log }) => {
        const { src, tgt } = await seedPair(app, account, { source: ['S1', 'S2', 'S3'], target: ['T1', 'T2', 'T3'] });
        await startCrosswalk(app, src, tgt);
        const relation = await pickRelation(page, nodeRow(sourceColumn(page), src.c.S1));
        await seedAlignment(page, { source: src.c.S1, target: tgt.c.T1, relationType: relation.value, frameworkIds: [src.id, tgt.id] });
        await app.go('/frameworks');
        await startCrosswalk(app, src, tgt);

        const filter = (column, title) => column.locator(`.crosswalk-buttons [title="${title}"]`);
        const expectShown = async (column, fw, visible) => {
            for (const [name, id] of Object.entries(fw.c)) {
                const row = nodeRow(column, id);
                if (visible.includes(name)) await expect(row, `${name} shown`).toBeVisible();
                else await expect(row, `${name} hidden`).toBeHidden();
            }
        };
        for (const [column, fw, aligned] of [[sourceColumn(page), src, 'S1'], [targetColumn(page), tgt, 'T1']]) {
            const all = Object.keys(fw.c);
            await expectShown(column, fw, all);
            await filter(column, 'show aligned only').click();
            await expect(filter(column, 'show aligned only')).toHaveClass(/is-focused/);
            await expectShown(column, fw, [aligned]);
            await filter(column, 'show unaligned only').click();
            await expect(filter(column, 'show unaligned only')).toHaveClass(/is-focused/);
            await expectShown(column, fw, all.filter((n) => n !== aligned));
            await filter(column, 'show all').click();
            await expect(filter(column, 'show all')).toHaveClass(/is-focused/);
            await expectShown(column, fw, all);
        }
        // Each side filters on its own.
        await filter(sourceColumn(page), 'show aligned only').click();
        await expectShown(sourceColumn(page), src, ['S1']);
        await expectShown(targetColumn(page), tgt, ['T1', 'T2', 'T3']);

        // A newly applied alignment counts as aligned.
        await filter(sourceColumn(page), 'show all').click();
        await chooseSourceRelation(page, nodeRow(sourceColumn(page), src.c.S2), relation.value);
        await plusButton(nodeRow(targetColumn(page), tgt.c.T2)).click();
        await crosswalkButton(page, 'apply alignments').click();
        await filter(sourceColumn(page), 'show aligned only').click();
        await filter(targetColumn(page), 'show unaligned only').click();
        await expectShown(sourceColumn(page), src, ['S1', 'S2']);
        await expectShown(targetColumn(page), tgt, ['T3']);
        expect(consoleProblems(log)).toEqual([]);
    });
});
