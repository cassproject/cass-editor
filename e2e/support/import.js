// Helpers for the import tests (TEST-CASES.md §5, e2e/tests/import.spec.js).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { expect } from '@playwright/test';

const here = path.dirname(fileURLToPath(import.meta.url));
export const FIXTURES = path.resolve(here, '../fixtures/import');
const SCHEMA_DIR = path.resolve(here, '../../public/schema.cassproject.org');

const CORS = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*' };

/**
 * Serves https://schema.cassproject.org/... from the editor's bundled copy
 * (public/schema.cassproject.org), so importers that fetch schema documents directly
 * (CTDL-ASN CSV fetches ceasn2cassTerms) work without the internet.
 */
export async function serveSchemas(page) {
    await page.route('https://schema.cassproject.org/**', async (route) => {
        const { pathname } = new URL(route.request().url());
        const base = path.join(SCHEMA_DIR, decodeURIComponent(pathname));
        const file = [base, path.join(base, 'index.json-ld')].find((p) => p.startsWith(SCHEMA_DIR) && fs.existsSync(p) && fs.statSync(p).isFile());
        if (!file) return route.fulfill({ status: 404, headers: CORS, body: 'not found' });
        return route.fulfill({ status: 200, headers: CORS, contentType: 'application/json', body: fs.readFileSync(file) });
    });
}

/**
 * Answers GETs for url with json (and CORS preflights), as a remote server would. json may be
 * a function of the request URL, called per request.
 */
export async function serveJson(page, url, json) {
    await page.route(url, async (route) => {
        if (route.request().method() === 'OPTIONS') return route.fulfill({ status: 204, headers: CORS });
        const body = typeof json === 'function' ? json(new URL(route.request().url())) : json;
        return route.fulfill({ status: 200, headers: CORS, contentType: 'application/json', body: JSON.stringify(body) });
    });
}

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const GUID_PATH = /(data\/schema\.cassproject\.org\.0\.4\.\w+\/)x(?=[0-9a-f]{8}-)/g;

/**
 * The id an object of the test server has on the fake remote server of proxyCass: another host,
 * and an "x" before the guid (the CaSS server treats objects whose type and guid match an
 * existing object as that object, whatever the host, so a copy needs a guid of its own).
 */
export const remoteIdOf = (id, remote, cass) => id.replace(new RegExp(`^${escapeRe(cass)}(data/schema\\.cassproject\\.org\\.0\\.4\\.\\w+/)`), `${remote}$1x`);

/**
 * Makes remote (e.g. http://remote-cass.test/api/) behave as a second CaSS server holding copies
 * of the test server's objects under other ids (see remoteIdOf): requests are proxied to cass
 * (the test server) with ids mapped back, and ids in responses are mapped to remote ids.
 */
export async function proxyCass(page, remote, cass) {
    const toLocal = (text) => text.split(remote).join(cass).replace(GUID_PATH, '$1');
    const toRemote = (text) => text.replace(new RegExp(`${escapeRe(cass)}(data/schema\\.cassproject\\.org\\.0\\.4\\.\\w+/)(?=[0-9a-f]{8}-)`, 'g'), `${remote}$1x`).split(cass).join(remote);
    await page.route(`${remote}**`, async (route) => {
        const request = route.request();
        if (request.method() === 'OPTIONS') return route.fulfill({ status: 204, headers: CORS });
        const postData = request.postDataBuffer();
        const response = await route.fetch({
            url: toLocal(request.url()),
            // Bodies keep the remote host: signature sheets name the server they are for.
            ...(postData ? { postData: Buffer.from(postData.toString('latin1').replace(GUID_PATH, '$1'), 'latin1') } : {}),
        });
        const body = toRemote(await response.text());
        const headers = { ...response.headers(), ...CORS };
        for (const name of ['content-length', 'content-encoding', 'transfer-encoding']) delete headers[name];
        return route.fulfill({ status: response.status(), headers, body });
    });
}

/**
 * A CTDL-ASN JSON-LD graph: a framework with two top-level competencies, the first of
 * which has two children. Every @id is new, so runs never collide.
 * Returns { graph, frameworkId, ids: { name: id }, names: [...] }.
 */
export function ctdlAsnGraph(name, prefix = 'Competency') {
    const id = () => `https://example.org/ce-${randomUUID()}`;
    const frameworkId = id();
    const n = {
        top1: `${prefix} A`,
        child1: `${prefix} A.1`,
        child2: `${prefix} A.2`,
        top2: `${prefix} B`,
    };
    const ids = Object.fromEntries(Object.values(n).map((v) => [v, id()]));
    const comp = (text, extra) => ({
        '@id': ids[text],
        '@type': 'ceasn:Competency',
        'ceterms:ctid': ids[text].split('/').pop(),
        'ceasn:competencyText': { 'en-us': text },
        'ceasn:isPartOf': frameworkId,
        'ceasn:inLanguage': ['en-US'],
        ...extra,
    });
    const graph = {
        '@context': 'https://credreg.net/ctdlasn/schema/context/json',
        '@id': `https://example.org/ctdlasn/graph/${frameworkId.split('/').pop()}`,
        '@graph': [
            {
                '@id': frameworkId,
                '@type': 'ceasn:CompetencyFramework',
                'ceterms:ctid': frameworkId.split('/').pop(),
                'ceasn:name': { 'en-us': name },
                'ceasn:description': { 'en-us': `Description of ${name}` },
                'ceasn:inLanguage': ['en-US'],
                'ceasn:hasTopChild': [ids[n.top1], ids[n.top2]],
            },
            comp(n.top1, { 'ceasn:isTopChildOf': frameworkId, 'ceasn:hasChild': [ids[n.child1], ids[n.child2]] }),
            comp(n.child1, { 'ceasn:isChildOf': ids[n.top1] }),
            comp(n.child2, { 'ceasn:isChildOf': ids[n.top1] }),
            comp(n.top2, { 'ceasn:isTopChildOf': frameworkId }),
        ],
    };
    return { graph, frameworkId, ids, names: Object.values(n), n };
}

/** Writes contents to the test's output folder under fileName and returns the path. */
export function writeFixture(testInfo, fileName, contents) {
    const file = testInfo.outputPath(fileName);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, typeof contents === 'string' ? contents : JSON.stringify(contents, null, 2));
    return file;
}

/** Reads a template from e2e/fixtures/import and replaces {{key}} placeholders. */
export function fromTemplate(fileName, values) {
    let text = fs.readFileSync(path.join(FIXTURES, fileName), 'utf8');
    for (const [key, value] of Object.entries(values)) text = text.split(`{{${key}}}`).join(value);
    return text;
}

export const newUuid = () => randomUUID();

/** Selects an import tab ("File Import", "Remote Server", "Paste Text", "URL Source"). */
export async function chooseTab(page, label) {
    await page.locator('.import-tab button', { hasText: label }).click();
    await expect(page.locator('.import-tab.is-active-tab', { hasText: label })).toBeVisible();
}

/** Picks file(s) in the File Import drop zone and clicks "Process Files". */
export async function uploadFile(page, files) {
    await page.locator('#drag-and-drop input[type=file]').setInputFiles(files);
    await page.locator('#drag-and-drop').getByRole('button', { name: /process files/i }).click();
}

/** Searches CaSS (as the page's user) and returns matching objects' JSON. */
export async function search(page, query) {
    return await page.evaluate(async (q) => (await repo.searchWithParams(q, { size: 50 })).map((o) => JSON.parse(o.toJson())), query);
}

/** Text of a CaSS value that may be a string, a language map or [{@value}]. */
export function textOf(value) {
    if (value == null) return value;
    if (typeof value === 'string') return value;
    if (Array.isArray(value)) return textOf(value[0]);
    if (value['@value'] != null) return value['@value'];
    return Object.values(value)[0];
}
