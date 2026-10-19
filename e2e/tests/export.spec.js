// TEST-CASES.md §6 Export (EXP-01, EXP-02).
//
// Formats that open a CaSS service in a new tab are checked through the response that tab
// loaded; formats that save a file are checked through the download's contents. Nothing
// leaves localhost: the import in EXP-02 reads its source URL from page.route.
import { test, expect, unique, problems } from '../support/fixtures.js';
import { CASS_URL } from '../support/env.js';
import { nodeRow, openFramework } from '../support/hierarchy.js';
import { FRAMEWORK_FORMATS, exportModal, exportAs, csvRecords, ctdlAsnGraph, serveJson, textOf } from '../support/export.js';

const ONET_ABILITIES = 'https://www.onetcenter.org/ctdlasn/graph/ce-07c257d6-9119-11e8-b852-782bcb5df6ac';
const format = (value) => FRAMEWORK_FORMATS.find((f) => f.value === value);
const exportButton = (page) => page.locator('[title="Export framework"]');
/** Object ids in exports carry a version suffix (".../<guid>/<timestamp>"). */
const sameId = (versioned, id) => [versioned].flat().some((v) => v === id || v.startsWith(id + '/'));
const guidOf = (id) => id.split('/').pop();
/** The RDF formats the editor fetches from CaSS (data/<guid>) and saves as a file, with their Accept header. */
const RDF_ACCEPT = { rdfQuads: 'text/n4', rdfXml: 'application/rdf+xml', turtle: 'text/turtle' };

/** Logs in, seeds Alpha, Delta > Echo, opens the framework and the export modal. */
async function openExport(app, page, account, competencies = ['Alpha', { name: 'Delta', children: ['Echo'] }]) {
    await app.login(account);
    const fw = await app.seedFramework({ name: unique('Export'), competencies });
    // Opening a framework CaSS cannot find yet sends the editor back to the list.
    await app.waitIndexed(`@id:"${fw.id}"`);
    await openFramework(page, fw.id);
    for (const id of Object.values(fw.competencies)) await expect(nodeRow(page, id)).toBeVisible({ timeout: 60_000 });
    await exportButton(page).click();
    await expect(exportModal(page)).toBeVisible();
    return fw;
}

/** What CaSS itself answers for data/<guid> in a given RDF serialisation. */
async function serverRdf(page, guid, accept) {
    const res = await page.request.get(`${CASS_URL}data/${guid}`, { headers: { Accept: accept } });
    expect(res.ok()).toBeTruthy();
    return await res.text();
}

/**
 * Checks for each format's result on the seeded framework (Alpha, Delta > Echo). Popup formats
 * get { url, status, body }, file formats { files }.
 */
const CHECKS = {
    asn: async (page, fw, { url, status, body }) => {
        expect(url).toBe(`${CASS_URL}asn/${guidOf(fw.id)}`);
        expect(status).toBe(200);
        expect(body).toContain('<rdf:RDF');
        expect(body).toMatch(new RegExp(`<core:StandardDocument rdf:about="${fw.id}[^"]*">\\s*<dc:title>${fw.name}</dc:title>`));
        for (const name of ['Alpha', 'Delta', 'Echo']) expect(body).toContain(`<dc:title>${name}</dc:title>`);
        // Echo is a child of Delta.
        expect(body).toMatch(new RegExp(`rdf:about="${fw.competencies.Echo}[^"]*">\\s*<dc:title>Echo</dc:title>\\s*<qua:isChildOf rdf:resource="${fw.competencies.Delta}`));
    },
    jsonld: async (page, fw, { url, status, body }) => {
        expect(url).toBe(`${CASS_URL}data/${guidOf(fw.id)}`);
        expect(status).toBe(200);
        const json = JSON.parse(body);
        expect(sameId(json['@id'], fw.id)).toBeTruthy();
        expect(json['@type']).toBe('Framework');
        expect(json.name).toBe(fw.name);
        expect([...json.competency].sort()).toEqual(Object.values(fw.competencies).sort());
        expect(json.relation).toHaveLength(1);
    },
    ctdlasnJsonld: async (page, fw, { url, status, body }) => {
        expect(url).toBe(`${CASS_URL}ceasn/${guidOf(fw.id)}`);
        expect(status).toBe(200);
        const graph = JSON.parse(body)['@graph'];
        const framework = graph.find((n) => n['@type'] === 'ceasn:CompetencyFramework');
        expect(sameId(framework['@id'], fw.id)).toBeTruthy();
        expect(textOf(framework['ceasn:name'])).toBe(fw.name);
        const competencies = graph.filter((n) => n['@type'] === 'ceasn:Competency');
        expect(competencies.map((c) => textOf(c['ceasn:competencyText'])).sort()).toEqual(['Alpha', 'Delta', 'Echo']);
        const byName = Object.fromEntries(competencies.map((c) => [textOf(c['ceasn:competencyText']), c]));
        expect(framework['ceasn:hasTopChild']).toHaveLength(2);
        expect(sameId(byName.Echo['ceasn:isChildOf'], fw.competencies.Delta)).toBeTruthy();
    },
    ctdlasnCsv: async (page, fw, { files }) => {
        expect(files.map((x) => x.name)).toEqual([`${fw.name}.csv`]);
        const rows = csvRecords(files[0].text);
        // One row for the framework, then one row per competency.
        expect(rows.filter((r) => r['@type'] === 'ceasn:CompetencyFramework').map((r) => r['ceasn:name'])).toEqual([fw.name]);
        const competencies = rows.filter((r) => r['@type'] === 'ceasn:Competency');
        expect(competencies.map((r) => r['ceasn:competencyText']).sort()).toEqual(['Alpha', 'Delta', 'Echo']);
        expect(rows).toHaveLength(4);
        const echo = competencies.find((r) => r['ceasn:competencyText'] === 'Echo');
        expect(sameId(echo['ceasn:isChildOf'], fw.competencies.Delta)).toBeTruthy();
    },
    csv: async (page, fw, { files }) => {
        expect(files.map((x) => x.name).sort()).toEqual(format('csv').files(fw.name).sort());
        const competencies = csvRecords(files.find((x) => x.name.endsWith('Competencies.csv')).text);
        // One row per competency.
        expect(competencies.map((r) => r.name).sort()).toEqual(['Alpha', 'Delta', 'Echo']);
        for (const row of competencies) {
            expect(Object.values(fw.competencies).some((id) => sameId(row['@id'], id))).toBeTruthy();
        }
        const relations = csvRecords(files.find((x) => x.name.endsWith('Relations.csv')).text);
        expect(relations).toHaveLength(1);
        expect(relations[0].relationType).toBe('narrows');
        expect(sameId(relations[0].source, fw.competencies.Echo)).toBeTruthy();
        expect(sameId(relations[0].target, fw.competencies.Delta)).toBeTruthy();
    },
    case: async (page, fw, { url, status, body }) => {
        expect(url).toBe(`${CASS_URL}ims/case/v1p0/CFPackages/${guidOf(fw.id)}`);
        expect(status).toBe(200);
        const pkg = JSON.parse(body);
        expect(pkg.CFDocument.title).toBe(fw.name);
        expect(pkg.CFItems.map((i) => i.fullStatement).sort()).toEqual(['Alpha', 'Delta', 'Echo']);
        const items = Object.fromEntries(pkg.CFItems.map((i) => [i.fullStatement, i.identifier]));
        // The hierarchy: one association, Echo (origin) narrows Delta (destination). CaSS writes
        // it as relationType "narrows" (no CASE associationType); that is the server's format.
        expect(pkg.CFAssociations.map((a) => [a.originNodeURI.identifier, a.relationType, a.destinationNodeURI.identifier]))
            .toEqual([[items.Echo, 'narrows', items.Delta]]);
    },
    scd: async (page, fw, { url, status, body }) => {
        expect(url).toBe(`${CASS_URL}scd/${guidOf(fw.id)}`);
        expect(status).toBe(200);
        const json = JSON.parse(body);
        expect(sameId(json.id, fw.id)).toBeTruthy();
        expect(json.name).toBe(fw.name);
        expect(json.competencyDefinition).toHaveLength(3);
        expect(json.resourceAssociation).toHaveLength(1);
    },
};
for (const [value, accept] of Object.entries(RDF_ACCEPT)) {
    CHECKS[value] = async (page, fw, { files }) => {
        expect(files.map((x) => x.name)).toEqual(format(value).files(fw.name));
        // The file holds the framework's serialisation, as CaSS serves it for that Accept header.
        expect(files[0].text).toContain(fw.name);
        expect(files[0].text).toContain(guidOf(fw.competencies.Echo));
        expect(files[0].text).toBe(await serverRdf(page, guidOf(fw.id), accept));
    };
}

test.describe('EXP-01 export formats @P1', () => {
    // One framework and one page load for all formats (a step per format), to keep the load on
    // the shared editor dev server down.
    test('EXP-01 every offered format exports the framework @P1', async ({ app, page, account, console: log }) => {
        // Ten formats in one test.
        test.slow();
        const fw = await openExport(app, page, account);
        const options = await exportModal(page).locator('select option').allTextContents();
        expect(options.map((o) => o.trim())).toEqual(['Select an option', ...FRAMEWORK_FORMATS.map((f) => f.label)]);

        for (const f of FRAMEWORK_FORMATS) {
            await test.step(f.label, async () => {
                if (!(await exportModal(page).isVisible())) await exportButton(page).click();
                const result = await exportAs(page, f, { count: f.files ? f.files(fw.name).length : undefined });
                await CHECKS[f.value](page, fw, result);
                if (result.popup) await result.popup.close();
                const modal = exportModal(page);
                if (await modal.isVisible()) await modal.getByRole('button', { name: /cancel/i }).click();
                await expect(modal).toHaveCount(0);
            });
        }
        expect(problems(log)).toEqual([]);
    });

    test('EXP-01 Table (CSV) of a framework without relations saves its competencies @P1', async ({ app, page, account, console: log }) => {
        // Only the competencies file is checked here; the page error it throws today is the
        // known-bug test below, so the page-error check is relaxed for this test only.
        test.info().annotations.push({ type: 'allow-page-errors' });
        const fw = await openExport(app, page, account, ['Solo one', 'Solo two']);
        const { files } = await exportAs(page, format('csv'));
        expect(files.map((x) => x.name)).toContain(`${fw.name} - Competencies.csv`);
        const competencies = csvRecords(files.find((x) => x.name.endsWith('Competencies.csv')).text);
        expect(competencies.map((r) => r.name).sort()).toEqual(['Solo one', 'Solo two']);
        expect(problems(log)).toEqual([]);
        // Any page error other than the known one still fails.
        expect(log.pageErrors.filter((e) => !/fw\.relation is not iterable/.test(e))).toEqual([]);
    });

    test('EXP-01 Table (CSV) of a framework without relations exports without errors (known bug: fw.relation is not iterable) @P1', async ({ app, page, account, console: log }) => {
        test.fail(true, 'cassproject CSVExport.exportFramework loops over fw.relation unguarded and throws for a framework without relations; see e2e/FINDINGS.md');
        const fw = await openExport(app, page, account, ['Solo one', 'Solo two']);
        const { files } = await exportAs(page, format('csv'));
        const competencies = csvRecords(files.find((x) => x.name === `${fw.name} - Competencies.csv`).text);
        expect(competencies.map((r) => r.name).sort()).toEqual(['Solo one', 'Solo two']);
        // The export runs to the end: no uncaught error in the page (thrown before the
        // competencies file is saved, so it has happened by now) and none in the console.
        expect(log.pageErrors).toEqual([]);
        expect(problems(log)).toEqual([]);
    });
});

test('EXP-02 export from the import light view @P2', async ({ app, page, account, console: log }) => {
    // An import, then ten formats in one test.
    test.slow();
    const name = unique('Export after import');
    const prefix = unique('Imported');
    const source = ctdlAsnGraph(name, prefix);
    await app.login(account, '/import');
    await page.locator('.import-tab button', { hasText: 'URL Source' }).click();
    // The sample O*NET link (IMP-01), answered with our own graph.
    await serveJson(page, ONET_ABILITIES, source.graph);
    await page.getByText('Abilities Competency Framework', { exact: true }).click();
    await page.locator('#import-from-url .button', { hasText: /^\s*Import framework\s*$/i }).click();
    const preview = page.locator('.import-preview');
    await expect(preview.getByText(source.names.child, { exact: true })).toBeVisible({ timeout: 60_000 });
    await preview.locator('.button', { hasText: /^\s*done editing\s*$/i }).click();
    const light = page.locator('.import-light');
    await expect(light.getByText(source.names.child, { exact: true })).toBeVisible();

    const stored = await app.fetchObject(source.frameworkId);
    expect(textOf(stored.name)).toBe(name);
    const guid = await page.evaluate((id) => EcCrypto.md5(id), source.frameworkId);
    const names = Object.values(source.names).sort();

    for (const f of FRAMEWORK_FORMATS) {
        await test.step(f.label, async () => {
            await light.locator('.button', { hasText: /^\s*Export\s*$/i }).click();
            const result = await exportAs(page, f, { count: f.files ? f.files(name).length : undefined });
            if (f.popup) {
                expect(result.url).toBe(`${CASS_URL}${f.popup}${guid}`);
                expect(result.status).toBe(200);
                if (f.value === 'asn') {
                    for (const n of [name, ...names]) expect(result.body).toMatch(new RegExp(`<dc:title[^>]*>${n}</dc:title>`));
                } else if (f.value === 'jsonld') {
                    const json = JSON.parse(result.body);
                    expect(textOf(json.name)).toBe(name);
                    expect(json.competency).toHaveLength(3);
                } else if (f.value === 'ctdlasnJsonld') {
                    const graph = JSON.parse(result.body)['@graph'];
                    expect(graph.filter((n) => n['@type'] === 'ceasn:Competency').map((c) => textOf(c['ceasn:competencyText'])).sort()).toEqual(names);
                } else if (f.value === 'case') {
                    const pkg = JSON.parse(result.body);
                    expect(textOf(pkg.CFDocument.title)).toBe(name);
                    expect(pkg.CFItems.map((i) => textOf(i.fullStatement)).sort()).toEqual(names);
                } else if (f.value === 'scd') {
                    const json = JSON.parse(result.body);
                    expect(textOf(json.name)).toBe(name);
                    expect(json.competencyDefinition).toHaveLength(3);
                }
                await result.popup.close();
            } else {
                expect(result.files.map((x) => x.name).sort()).toEqual(f.files(name).sort());
                if (f.value === 'ctdlasnCsv') {
                    const rows = csvRecords(result.files[0].text);
                    expect(rows.filter((r) => r['@type'] === 'ceasn:Competency').map((r) => r['ceasn:competencyText']).sort()).toEqual(names);
                } else if (f.value === 'csv') {
                    const rows = csvRecords(result.files.find((x) => x.name.endsWith('Competencies.csv')).text);
                    // Imported names are language maps, so the name column's header varies; one row per competency.
                    expect(rows.map((r) => Object.values(r).find((v) => names.includes(v))).sort()).toEqual(names);
                } else {
                    // RDF Quads / RDF+XML / Turtle: what CaSS serves for the framework.
                    // (Turtle abbreviates ids with prefixes, so the name is what every serialisation holds verbatim.)
                    expect(result.files[0].text).toContain(name);
                    expect(result.files[0].text).toBe(await serverRdf(page, guid, RDF_ACCEPT[f.value]));
                }
            }
            const modal = exportModal(page);
            if (await modal.isVisible()) await modal.getByRole('button', { name: /cancel/i }).click();
            await expect(modal).toHaveCount(0);
        });
    }
    expect(problems(log)).toEqual([]);
});
