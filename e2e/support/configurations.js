// Helpers for the configurations spec (TEST-CASES.md §10).
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { expect } from '@playwright/test';

// A configuration as the editor saves it for "create new configuration" (name, description, @id,
// owner and signature removed). Captured from the editor's own save so seeded configurations
// load in the configuration screens and the framework editor like real ones.
const TEMPLATE = JSON.parse(fs.readFileSync(fileURLToPath(new URL('../fixtures/configuration-template.json', import.meta.url)), 'utf8'));

/** localStorage key of the browser-default configuration (src/mixins/cassUtil.js). */
export const BROWSER_DEFAULT_KEY = 'cassAuthoringToolDefaultBrowserConfigId';

/** Namespace of the editor's custom properties (property ids are CUSTOM_CONTEXT + name). */
export const CUSTOM_CONTEXT = 'https://schema.cassproject.org/0.4/';

/**
 * A custom framework property as the editor saves it (configuration.js generatePropertyConfigObject):
 * { name, label, description, range }.
 */
const frameworkProperty = ({ name, label, description = label, range = 'http://schema.org/URL' }) => ({
    '@id': CUSTOM_CONTEXT + name,
    '@type': 'http://www.w3.org/2000/01/rdf-schema#Property',
    'http://schema.org/domainIncludes': [{ '@id': 'https://schema.cassproject.org/0.4/Framework' }],
    'http://schema.org/rangeIncludes': [{ '@id': range }],
    'http://www.w3.org/2000/01/rdf-schema#comment': [{ '@language': 'en', '@value': description }],
    'http://www.w3.org/2000/01/rdf-schema#label': [{ '@language': 'en', '@value': label }],
    priority: 'tertiary',
    isRequired: false,
    readOnly: false,
    noTextEditing: false,
    isDirectLink: false,
    max: 1,
});

/**
 * A configuration's data as the editor saves it, before @id and owner: the template with name,
 * description, overrides (merged into the top level) and optional custom frameworkProperties.
 */
export function configurationData({ name, description = 'E2E configuration', overrides = {}, frameworkProperties = [] }) {
    const data = { ...JSON.parse(JSON.stringify(TEMPLATE)), ...overrides, name, description, isDefault: false };
    for (const prop of frameworkProperties) {
        data.frameworkConfig[CUSTOM_CONTEXT + prop.name] = frameworkProperty(prop);
        data.frameworkConfig.tertiaryProperties = [...(data.frameworkConfig.tertiaryProperties || []), CUSTOM_CONTEXT + prop.name];
    }
    return data;
}

/**
 * Creates a configuration owned by the logged-in user (or by a throwaway key with foreign: true).
 * overrides are merged into the top level (e.g. { defaultObjectOwners: [...] }). Never sets
 * isDefault (the instance default is server-wide). Returns its id.
 */
export async function seedConfiguration(page, { name, description = 'E2E configuration', foreign = false, overrides = {} }) {
    const data = configurationData({ name, description, overrides });
    return await page.evaluate(async ({ data, foreign }) => {
        const owner = foreign ? EcPpk.generateKey() : EcIdentityManager.default.ids[0].ppk;
        const eim = new EcIdentityManager();
        const identity = new EcIdentity();
        identity.ppk = owner;
        eim.addIdentity(identity);
        const c = new schema.Thing();
        c.copyFrom(data);
        c.generateId(repo.selectedServer);
        c.addOwner(owner.toPk());
        await repo.multiput([c], null, null, eim);
        return c.shortId();
    }, { data, foreign });
}

/**
 * Makes this page's CaSS searches for configurations also return config (a configuration's JSON
 * with an @id), without saving it: the configuration search answers with ids (the editor turns on
 * EcRepository.cachingL2) and the objects come from sky/repo/multiGet, so both are extended. Use it
 * for data that must not reach the shared server (e.g. a malformed configuration would break every
 * other test's configuration screens).
 */
export async function addConfigurationToSearches(page, config) {
    const id = config['@id'];
    // multiGet asks for server-relative paths, with or without the version: match the guid.
    const guid = id.split('/').filter((part) => /^[0-9a-f-]{36}$/.test(part)).pop();
    await page.route(/\/sky\/repo\/search/, async (route) => {
        if (!(route.request().postData() ?? '').includes('@type:Configuration')) return route.fallback();
        const response = await route.fetch();
        const list = await response.json();
        if (Array.isArray(list)) list.push(list.length === 0 || typeof list[0] === 'string' ? id : config);
        await route.fulfill({ response, json: list });
    });
    await page.route(/\/sky\/repo\/multiGet/, async (route) => {
        if (!(route.request().postData() ?? '').includes(guid)) return route.fallback();
        const response = await route.fetch();
        const list = await response.json();
        if (Array.isArray(list)) list.push(config);
        await route.fulfill({ response, json: list });
    });
}

/**
 * Creates a framework owned by the logged-in user with top-level competencies (names), optionally
 * using a configuration (framework.configuration = id). Returns { id, name, competencies: { name: id } }.
 */
export async function seedFramework(page, { name, competencies = [], configuration = null }) {
    return await page.evaluate(async ({ name, competencies, configuration }) => {
        const owner = EcIdentityManager.default.ids[0].ppk;
        const f = new EcFramework();
        f.generateId(repo.selectedServer);
        f.setName(name);
        f.addOwner(owner.toPk());
        if (configuration) f.configuration = configuration;
        const toSave = [];
        const ids = {};
        for (const cname of competencies) {
            const c = new EcCompetency();
            c.generateId(repo.selectedServer);
            c.setName(cname);
            c.addOwner(owner.toPk());
            f.addCompetency(c.shortId());
            toSave.push(c);
            ids[cname] = c.shortId();
        }
        toSave.push(f);
        await repo.multiput(toSave);
        return { id: f.shortId(), name, competencies: ids };
    }, { name, competencies, configuration });
}

/** Ids of configurations named name (exact), as the logged-in user sees them. */
export async function configurationIdsNamed(page, name) {
    return await page.evaluate(async (n) => (await repo.searchWithParams(`@type:Configuration AND name:"${n}"`, { size: 50 }))
        .filter((c) => c.name === n).map((c) => c.shortId()), name);
}

/** The configuration list row (Configurations page or Framework Configuration modal) for name. */
export const configRow = (scope, name) => scope.locator('tbody tr').filter({ has: scope.page().locator('th', { hasText: name }) });

/** Opens the Configurations page and waits for a configuration (by name) to be listed. */
export async function openConfigurations(app, name) {
    await expect(async () => {
        await app.open('/configuration');
        await expect(configRow(app.page.locator('#configuration'), name)).toBeVisible({ timeout: 15_000 });
    }).toPass({ timeout: 120_000 });
}

/** The browser-default configuration id saved in localStorage, or null. */
export async function browserDefaultId(page) {
    return await page.evaluate((key) => localStorage.getItem(key), BROWSER_DEFAULT_KEY);
}
