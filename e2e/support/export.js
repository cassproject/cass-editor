// Helpers for the export tests, TEST-CASES.md §6 (e2e/tests/export.spec.js).
//
// The export modal (src/components/modalContent/ExportOptionsModal.vue) either opens a CaSS
// service URL in a new tab (window.open) or saves a file in the page (file-saver / a data: link).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { expect } from '@playwright/test';
import { CASS_URL } from './env.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const FIXTURES = path.resolve(here, '../fixtures/export');
const CORS = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*' };

/**
 * The formats the modal offers for a framework. popup: the CaSS service the new tab opens
 * (followed by the framework's guid); files: the file names saved (name = framework name).
 */
export const FRAMEWORK_FORMATS = [
    { value: 'asn', label: 'Achievement Standards Network (RDF+XML)', popup: 'asn/' },
    { value: 'jsonld', label: 'CASS (JSON-LD)', popup: 'data/' },
    { value: 'rdfQuads', label: 'CASS (RDF Quads)', files: (name) => [`${name}.n4`] },
    { value: 'rdfXml', label: 'CASS (RDF+XML)', files: (name) => [`${name}.rdf.xml`] },
    { value: 'turtle', label: 'CASS (Turtle)', files: (name) => [`${name}.turtle`] },
    { value: 'ctdlasnJsonld', label: 'Credential Engine ASN (JSON-LD)', popup: 'ceasn/' },
    { value: 'ctdlasnCsv', label: 'Credential Engine ASN (CSV)', files: (name) => [`${name}.csv`] },
    { value: 'csv', label: 'Table (CSV)', files: (name) => [`${name} - Competencies.csv`, `${name} - Relations.csv`] },
    { value: 'case', label: 'IMS Global CASE (JSON)', popup: 'ims/case/v1p0/CFPackages/' },
    { value: 'scd', label: 'Shareable Competency Definitions (JSON)', popup: 'scd/' },
];

/** The open export modal. */
export const exportModal = (page) => page.locator('#cass-modal.is-active, .modal.is-active').filter({ has: page.locator('.export-confirm') });

/**
 * Picks format in the open export modal and clicks "Export file". For popup formats returns
 * { popup, url, status, body } (the new tab and the CaSS response it loaded); for file formats
 * returns { files: [{ name, text }] } once `count` downloads arrived.
 */
export async function exportAs(page, format, { count } = {}) {
    const modal = exportModal(page);
    await expect(modal).toBeVisible();
    await modal.locator('select').selectOption(format.value);
    if (format.popup) {
        const service = new RegExp(`^${CASS_URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}${format.popup.replace(/\//g, '\\/')}[^/?#]+$`);
        const responseP = page.context().waitForEvent('response', (r) => service.test(r.url()));
        const popupP = page.waitForEvent('popup');
        await modal.locator('.export-confirm').click();
        const popup = await popupP;
        const response = await responseP;
        return { popup, url: response.url(), status: response.status(), body: await response.text() };
    }
    const downloads = [];
    const onDownload = (d) => downloads.push(d);
    page.on('download', onDownload);
    try {
        await modal.locator('.export-confirm').click();
        await expect.poll(() => downloads.length, { timeout: 30_000 }).toBeGreaterThanOrEqual(count ?? 1);
    } finally {
        page.off('download', onDownload);
    }
    const files = [];
    for (const d of downloads) {
        files.push({ name: d.suggestedFilename(), text: fs.readFileSync(await d.path(), 'utf8') });
    }
    return { files };
}

/** Minimal CSV parser (quoted fields, embedded commas/quotes/newlines). Returns rows of cells. */
export function parseCsv(text) {
    const rows = [];
    let row = [];
    let cell = '';
    let quoted = false;
    for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (quoted) {
            if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; } else if (ch === '"') quoted = false;
            else cell += ch;
        } else if (ch === '"') quoted = true;
        else if (ch === ',') { row.push(cell); cell = ''; } else if (ch === '\n' || ch === '\r') {
            if (ch === '\r' && text[i + 1] === '\n') i++;
            row.push(cell); rows.push(row); row = []; cell = '';
        } else cell += ch;
    }
    if (cell !== '' || row.length) { row.push(cell); rows.push(row); }
    return rows.filter((r) => r.some((c) => c !== ''));
}

/** CSV text as objects keyed by the header row. */
export function csvRecords(text) {
    const [header, ...rows] = parseCsv(text);
    return rows.map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ''])));
}

/**
 * A CTDL-ASN graph (e2e/fixtures/export/ctdlasn-graph.json) with fresh ids: a framework, a
 * parent with one child, and a sibling. Returns { graph, frameworkId, names }.
 */
export function ctdlAsnGraph(name, prefix) {
    const values = {
        name,
        prefix,
        frameworkCtid: `ce-${randomUUID()}`,
        parentCtid: `ce-${randomUUID()}`,
        childCtid: `ce-${randomUUID()}`,
        siblingCtid: `ce-${randomUUID()}`,
    };
    let text = fs.readFileSync(path.join(FIXTURES, 'ctdlasn-graph.json'), 'utf8');
    for (const [key, value] of Object.entries(values)) text = text.split(`{{${key}}}`).join(value);
    const graph = JSON.parse(text);
    return {
        graph,
        frameworkId: graph['@graph'][0]['@id'],
        names: { parent: `${prefix} Parent`, child: `${prefix} Child`, sibling: `${prefix} Sibling` },
    };
}

/** Answers GETs (and CORS preflights) for url with json, as a remote server would. */
export async function serveJson(page, url, json) {
    await page.route(url, async (route) => {
        if (route.request().method() === 'OPTIONS') return route.fulfill({ status: 204, headers: CORS });
        return route.fulfill({ status: 200, headers: CORS, contentType: 'application/json', body: JSON.stringify(json) });
    });
}

/** Text of a CaSS / CTDL value that may be a string, a language map or [{@value}]. */
export function textOf(value) {
    if (value == null) return value;
    if (typeof value === 'string') return value;
    if (Array.isArray(value)) return textOf(value[0]);
    if (value['@value'] != null) return value['@value'];
    return Object.values(value)[0];
}
