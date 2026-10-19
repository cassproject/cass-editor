// Serves schema.cassproject.org to every test from the editor's bundled copy (fixtures.js).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { EDITOR_URL } from './env.js';

const SCHEMA_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../public/schema.cassproject.org');

async function fulfillFromDisk(route, relativePath) {
    const base = path.join(SCHEMA_DIR, decodeURIComponent(relativePath));
    const file = [base, path.join(base, 'index.json-ld')]
        .find((p) => p.startsWith(SCHEMA_DIR) && fs.existsSync(p) && fs.statSync(p).isFile());
    const headers = { 'Access-Control-Allow-Origin': '*' };
    if (!file) return route.fulfill({ status: 404, headers, body: 'not found' });
    return route.fulfill({ status: 200, headers, contentType: 'application/json', body: fs.readFileSync(file) });
}

/**
 * Answers schema.cassproject.org documents from the editor's bundled copy (public/), both:
 * - https://schema.cassproject.org/..., which the editor still fetches remotely (REG-02 known bug),
 *   so no test depends on the internet; and
 * - the dev server's own /schema.cassproject.org/... copy (JSON-LD contexts, stores/lode.js), which a
 *   busy dev server could leave pending long enough that a framework never renders.
 * Unknown paths 404.
 */
export async function serveSchemasLocally(page) {
    await page.route('https://schema.cassproject.org/**', (route) =>
        fulfillFromDisk(route, new URL(route.request().url()).pathname));
    await page.route(`${EDITOR_URL}schema.cassproject.org/**`, (route) =>
        fulfillFromDisk(route, new URL(route.request().url()).pathname.replace(/^\/schema\.cassproject\.org/, '')));
}
