// Helpers for TEST-CASES.md §11 Assertions and the other permission-related specs.
// Assertions keep their fields encrypted (subject, agent, negative, evidence, dates), so these
// helpers decrypt them in the page as the logged-in user through the cassproject EcAssertion API.
import { expect } from '@playwright/test';
import { App } from './app.js';

/** The competency's node in the framework hierarchy (its <li> carries the competency id). */
export const competencyNode = (page, competencyId) => page.locator(`li[id="${competencyId}"]`).first();

/** The assertion controls ("I can", "I can't", evidence, badge) of one competency. */
export const assertionEditor = (page, competencyId) => competencyNode(page, competencyId).locator('.assertions-group').first();

/** Turns "manage assertions" mode on from the framework toolbar and waits for the controls. */
export async function startManagingAssertions(page) {
    const toggle = page.locator('#manageAssertionsButton');
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveText(/manage assertions/i);
    await toggle.click();
    await expect(toggle).toHaveText(/stop managing assertions/i);
    await expect(page.locator('.assertions-group').first()).toBeVisible();
}

/**
 * The assertions about a competency that the logged-in user can read, decrypted:
 * [{ id, subject, agent, negative, evidence, owner, reader, readerOfSubject }]. Waits (searches lag
 * writes) until at least `min` are found.
 */
export async function assertionsAbout(page, competencyId, { min = 1, timeout = 30_000 } = {}) {
    let found = [];
    await expect.poll(async () => {
        found = await page.evaluate(async (competencyId) => {
            const results = await EcAssertion.search(window.repo, `competency:"${competencyId}"`, null, null, { size: 100 });
            const out = [];
            for (const a of results || []) {
                if (a.competency !== competencyId) continue;
                const read = async (fn) => {
                    try {
                        return await fn();
                    } catch {
                        return undefined;
                    }
                };
                const subject = await read(async () => (await a.getSubject()).toPem());
                const agent = await read(async () => (await a.getAgent()).toPem());
                const negative = a.negative == null ? false : await read(() => a.getNegative());
                const evidence = a.evidence == null ? [] : await read(() => a.getEvidences());
                out.push({
                    id: a.shortId(),
                    subject,
                    agent,
                    negative,
                    evidence,
                    owner: a.owner || [],
                    reader: a.reader || [],
                    readerOfSubject: a.subject?.reader || [],
                });
            }
            return out;
        }, competencyId);
        return found.length;
    }, { timeout }).toBeGreaterThanOrEqual(min);
    return found;
}

/**
 * Re-reads one assertion (by id) from CaSS, decrypted as the logged-in user, or null if search
 * does not find it. Reads through search: EcAssertion.get / EcRepository.get of an assertion the
 * page just saved can hang (it joins an in-flight fetch that never settles), and search reflects
 * the stored object once the index refreshes, so callers poll.
 */
export async function readAssertion(page, id) {
    return await page.evaluate(async (id) => {
        delete EcRepository.cache[id];
        const results = await EcAssertion.search(window.repo, `@id:"${id}"`, null, null, { size: 5 });
        const a = (results || []).find((x) => x.shortId() === id);
        if (a == null) return null;
        const read = async (fn) => {
            try {
                return await fn();
            } catch {
                return undefined;
            }
        };
        return {
            id: a.shortId(),
            subject: await read(async () => (await a.getSubject()).toPem()),
            agent: await read(async () => (await a.getAgent()).toPem()),
            negative: a.negative == null ? false : await read(() => a.getNegative()),
            evidence: a.evidence == null ? [] : await read(() => a.getEvidences()),
            owner: a.owner || [],
            reader: a.reader || [],
        };
    }, id);
}

/**
 * Runs fn(app, page) as another user in a separate browser context (its own storage, so the main
 * page's login is untouched), then closes the context. Returns fn's result.
 */
export async function asUser(browser, account, fn, { route = '/frameworks', params = {} } = {}) {
    const context = await browser.newContext();
    try {
        const page = await context.newPage();
        const app = new App(page);
        await app.login(account, route, params);
        return await fn(app, page);
    } finally {
        await context.close();
    }
}

/** The public key (PEM) of an account, read by logging it in in a separate context. */
export const publicKeyOf = (browser, account) => asUser(browser, account, (app) => app.publicKey());

/**
 * Saves an assertion through the cassproject library as the logged-in user, about themselves
 * ("I can" unless negative), optionally naming the framework it was made in (the editor itself
 * never sets one). Returns its id.
 */
export async function seedAssertion(page, { competency, framework = null, negative = false }) {
    return await page.evaluate(async ({ competency, framework, negative }) => {
        const me = EcIdentityManager.default.ids[0].ppk.toPk();
        const a = new EcAssertion();
        a.generateId(window.repo.selectedServer);
        a.addOwner(me);
        await a.setSubject(me);
        await a.setAgent(me);
        a.setCompetency(competency);
        if (framework) a.framework = framework;
        await a.setAssertionDate(Date.now());
        await a.setExpirationDate(Date.now() + 1000 * 60 * 60 * 24 * 365);
        await a.setNegative(negative);
        a.setConfidence(1.0);
        await new Promise((resolve, reject) => EcRepository.save(a, resolve, reject));
        return a.shortId();
    }, { competency, framework, negative });
}
