// Page-level helpers for driving the editor. Tests reach the editor through App rather than
// building URLs or logging in by hand, so the conventions live in one place.
import { expect } from '@playwright/test';
import { randomBytes } from 'node:crypto';
import { CASS_URL } from './env.js';

/** Random lowercase letters and digits, to keep generated names and tokens apart. */
export const randomId = (length = 6) => randomBytes(length).toString('hex').slice(0, length);

let counter = 0;
/** A name no other test (or earlier run) uses. */
export const unique = (prefix = 'e2e') => `${prefix} ${Date.now().toString(36)}${(counter++).toString(36)}${randomId(4)}`;

export class App {
    constructor(page) {
        this.page = page;
    }

    /** URL for an editor route, e.g. url('/frameworks', { view: 'true' }). */
    url(route = '/', params = {}) {
        const query = new URLSearchParams({ server: CASS_URL, ...params });
        return `/?${query.toString()}#${route.startsWith('/') ? route : '/' + route}`;
    }

    /** Opens a route and waits until the editor has connected to CaSS. */
    async open(route = '/', params = {}) {
        const target = new URL(this.url(route, params), this.page.url() === 'about:blank' ? 'http://localhost/' : this.page.url());
        const current = this.page.url();
        await this.page.goto(this.url(route, params));
        // A URL differing only in its hash does not reload the page (or run init scripts).
        if (current !== 'about:blank' && current.split('#')[0] === target.href.split('#')[0]) {
            await this.page.reload();
        }
        await this.ready();
    }

    async ready() {
        await this.page.waitForFunction(() => window.app != null && window.repo != null && window.repo.selectedServer != null, null, { timeout: 90_000 });
    }

    /** Navigates within the already loaded editor (keeps the login, which lives in memory). */
    async go(route) {
        await this.page.evaluate((r) => { window.location.hash = r; }, route.startsWith('/') ? route : '/' + route);
    }

    /**
     * Creates an account through the legacy login page; the editor logs it in. Records the
     * saved identities on the account so later logins can skip the form (see login).
     */
    async createAccount(account) {
        await this.open('/legacyLogin');
        const inputs = this.page.locator('#login input');
        // The click can land before the login view is interactive; retry until the form switches.
        await expect(async () => {
            await this.page.getByText('create account', { exact: true }).click({ timeout: 5_000 });
            await expect(inputs).toHaveCount(5, { timeout: 2_000 });
        }).toPass({ timeout: 45_000 });
        await inputs.nth(0).fill(account.name);
        await inputs.nth(1).fill(account.email);
        await inputs.nth(2).fill(account.username);
        await inputs.nth(3).fill(account.password);
        await inputs.nth(4).fill(account.password);
        await this.page.locator('#login').getByText('create', { exact: true }).click();
        await this.page.waitForURL(/#\/frameworks/, { timeout: 60_000 });
        account.identities = await this.page.evaluate(() => localStorage.identities);
    }

    /**
     * Logs in as account. The editor keeps identities in localStorage, so this restores the ones
     * saved at account creation before the page loads, then opens route. Use loginViaForm to
     * exercise the login page itself.
     */
    async login(account, route = '/frameworks', params = {}) {
        if (!account.identities) return await this.loginViaForm(account);
        await this.setSavedIdentities(account.identities);
        await this.open(route, params);
        await expect.poll(() => this.page.evaluate(() => EcIdentityManager.default.ids.length)).toBeGreaterThan(0);
    }

    /**
     * Replaces the identities the editor will load on the next page load ('' for none). Applied
     * by an init script before the app starts, because a running editor writes its identities
     * back to localStorage. Each call's script applies once (on the first editor load after it),
     * so a later call wins and a page needs no visit to the editor's origin beforehand.
     */
    async setSavedIdentities(identities) {
        const token = `e2e-identities-${Date.now().toString(36)}-${randomId(12)}`;
        await this.page.addInitScript(({ token, identities }) => {
            if (window.top !== window || sessionStorage.getItem(token)) return;
            sessionStorage.setItem(token, '1');
            if (identities === '') localStorage.removeItem('identities');
            else localStorage.identities = identities;
        }, { token, identities });
    }

    /** Signs out through the user menu in the side navigation. */
    async logout() {
        await this.page.locator('.cass-editor__logged-in-user-icon').click();
        await this.page.locator('.cass-editor__logged-in-user-info').getByText('logout', { exact: true }).click();
        await expect.poll(() => this.page.evaluate(() => EcIdentityManager.default.ids.length)).toBe(0);
    }

    /** Forgets any saved login, as for a visitor who never logged in, and reloads. */
    async becomeAnonymous(route = '/frameworks', params = {}) {
        await this.setSavedIdentities('');
        await this.open(route, params);
        await expect.poll(() => this.page.evaluate(() => EcIdentityManager.default.ids.length)).toBe(0);
    }

    /** Logs in through the legacy login page and waits for the frameworks list. */
    async loginViaForm(account, { landing = /#\/frameworks/ } = {}) {
        await this.open('/legacyLogin');
        const inputs = this.page.locator('#login input');
        await inputs.nth(0).fill(account.username);
        await inputs.nth(1).fill(account.password);
        await this.page.locator('#login').getByText('login', { exact: true }).click();
        await this.page.waitForURL(landing, { timeout: 60_000 });
        await expect.poll(() => this.page.evaluate(() => EcIdentityManager.default.ids.length)).toBeGreaterThan(0);
    }

    /** The logged-in user's public key (PEM), or null. */
    async publicKey() {
        return await this.page.evaluate(() => EcIdentityManager.default.ids[0]?.ppk.toPk().toPem() ?? null);
    }

    /**
     * Creates a framework through the cassproject library in the page, owned by the logged-in
     * user (or by a throwaway key when foreign is true, i.e. one the user does not own).
     * competencies: names, or { name, description, children: [...] }; returns ids.
     */
    async seedFramework({ name = unique('Framework'), description = '', competencies = [], foreign = false } = {}) {
        return await this.page.evaluate(async ({ name, description, competencies, foreign }) => {
            const owner = foreign ? EcPpk.generateKey() : EcIdentityManager.default.ids[0].ppk;
            const eim = new EcIdentityManager();
            const identity = new EcIdentity();
            identity.ppk = owner;
            eim.addIdentity(identity);
            const toSave = [];
            const f = new EcFramework();
            f.generateId(repo.selectedServer);
            f.setName(name);
            if (description) f.setDescription(description);
            f.addOwner(owner.toPk());
            const ids = {};
            const add = (spec, parent) => {
                spec = typeof spec === 'string' ? { name: spec } : spec;
                const c = new EcCompetency();
                c.generateId(repo.selectedServer);
                c.setName(spec.name);
                if (spec.description) c.setDescription(spec.description);
                c.addOwner(owner.toPk());
                f.addCompetency(c.shortId());
                toSave.push(c);
                ids[spec.name] = c.shortId();
                if (parent) {
                    const r = new EcAlignment();
                    r.generateId(repo.selectedServer);
                    r.source = c.shortId();
                    r.target = parent.shortId();
                    r.relationType = 'narrows';
                    r.addOwner(owner.toPk());
                    f.addRelation(r.shortId());
                    toSave.push(r);
                }
                for (const child of spec.children || []) add(child, c);
            };
            for (const spec of competencies) add(spec, null);
            toSave.push(f);
            await repo.multiput(toSave, null, null, eim);
            return { id: f.shortId(), name, competencies: ids, ownerPem: owner.toPk().toPem() };
        }, { name, description, competencies, foreign });
    }

    /** Reads an object from CaSS as the logged-in user. */
    async fetchObject(id) {
        return await this.page.evaluate(async (id) => {
            const o = await EcRepository.get(id);
            return o == null ? null : JSON.parse(o.toJson());
        }, id);
    }

    /** Waits until CaSS search finds an object (searches lag writes until the index refreshes). */
    async waitIndexed(query) {
        await expect.poll(async () => this.page.evaluate(async (q) => (await repo.searchWithParams(q, { size: 5 })).length, query), { timeout: 20_000 }).toBeGreaterThan(0);
    }
}
