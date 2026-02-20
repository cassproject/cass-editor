/**
 * Deep coverage tests for Welcome.vue
 * Currently at 4.65% — this targets computed properties, mounted lifecycle,
 * template links, and sidebar sections.
 */

const { test, expect, loginAndNavigate } = require('../fixtures');

test.describe('Welcome page deep coverage', () => {

    test('Welcome page structure and all sections', async ({ page }) => {
        await page.goto('/#/?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');
        const welcome = page.locator('#welcome');
        await expect(welcome).toBeVisible();

        // Verify main title and subtitle
        await expect(page.locator('text=Welcome to CaSS')).toBeVisible();
        await expect(page.locator('text=Competency and Skills System')).toBeVisible();

        // Getting Started section
        await expect(page.locator('text=Getting Started')).toBeVisible();
        await expect(page.locator('text=1. Create your user and login')).toBeVisible();
        await expect(page.locator('text=2. Create user groups for collaborating')).toBeVisible();
        await expect(page.locator('text=3. Create a configuration')).toBeVisible();
        await expect(page.locator('text=4. Author a framework')).toBeVisible();
        await expect(page.locator('text=5. Collaborate with your team')).toBeVisible();

        // Helpful links section
        await expect(page.locator('text=Helpful links')).toBeVisible();
        await expect(page.locator('text=Documentation').first()).toBeVisible();
        await expect(page.locator('#welcome-framework-properties-link')).toBeVisible();
        await expect(page.locator('#welcome-competency-properties-link')).toBeVisible();
        await expect(page.locator('#welcome-relationship-types-link')).toBeVisible();
        await expect(page.locator('#welcome-user-groups-link')).toBeVisible();

        // Resources section
        await expect(page.locator('text=Resources')).toBeVisible();
        await expect(page.locator('#welcome-authoring-report-link')).toBeVisible();
        await expect(page.locator('#welcome-cassproject-link')).toBeVisible();
        await expect(page.locator('#welcome-cass-developer-guide-link')).toBeVisible();
        await expect(page.locator('#welcome-cass-official-documentation-link')).toBeVisible();
        await expect(page.locator('#welcome-cass-on-github-link')).toBeVisible();

        // Import Example Frameworks section
        await expect(page.locator('text=Import Example Frameworks')).toBeVisible();
        await expect(page.locator('#welcome-onet-basic-skills-link')).toBeVisible();
        await expect(page.locator('#welcome-harvard-emotional-intelligence-link')).toBeVisible();
        await expect(page.locator('#welcome-act-collaborative-problem-solving-link')).toBeVisible();

        // Get in touch section
        await expect(page.locator('text=Get in touch')).toBeVisible();
        await expect(page.locator('#welcome-cass-slack-link')).toBeVisible();
        await expect(page.locator('#welcome-cass-issues-link')).toBeVisible();
    });

    test('Welcome page computed properties and data', async ({ page }) => {
        await page.goto('/#/?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');
        await expect(page.locator('#welcome')).toBeVisible();

        const vueData = await page.evaluate(() => {
            const el = document.querySelector('#welcome');
            if (el && el.__vue__) {
                const vm = el.__vue__;
                return {
                    name: vm.$options.name,
                    importing: vm.importing,
                    error: vm.error,
                    casslogo: typeof vm.casslogo,
                    baseRepoUrl: typeof vm.baseRepoUrl,
                    // computed
                    loggedInPerson: vm.loggedInPerson,
                    queryParams: vm.queryParams,
                    hasLinkToLegacyDemos: typeof vm.linkToLegacyDemos
                };
            }
            return null;
        });
        expect(vueData).toBeTruthy();
        expect(vueData.name).toBe('Welcome');
        expect(vueData.importing).toBe(false);
        expect(vueData.error).toBeNull();
        expect(vueData.casslogo).toBe('string');
        expect(vueData.baseRepoUrl).toBe('string');
        expect(vueData.hasLinkToLegacyDemos).toBe('boolean');
    });

    test('Welcome page navigation links work', async ({ page }) => {
        await page.goto('/#/?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');
        await expect(page.locator('#welcome')).toBeVisible();

        // Click frameworks link
        const frameworksLink = page.locator('#welcome-frameworks-link').first();
        await expect(frameworksLink).toBeVisible();
        await frameworksLink.click();
        await page.waitForURL(/#\/frameworks/);

        // Navigate back to welcome
        await page.goto('/#/?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');
        await expect(page.locator('#welcome')).toBeVisible();

        // Click login link (legacy or api)
        const loginLink = page.locator('#welcome-legacy-login-link, #welcome-login-link').first();
        await expect(loginLink).toBeVisible();
        await loginLink.click();
        await page.waitForURL(/#\/(legacyLogin|login)/);
    });

    test('Welcome page after login shows user state', async ({ page }) => {
        await loginAndNavigate(page);
        await page.goto('/#/?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');
        await expect(page.locator('#welcome')).toBeVisible();

        const postLoginData = await page.evaluate(() => {
            const el = document.querySelector('#welcome');
            if (el && el.__vue__) {
                const vm = el.__vue__;
                return {
                    loggedInPerson: vm.loggedInPerson,
                    linkToLegacyDemos: vm.linkToLegacyDemos,
                    queryParams: vm.queryParams
                };
            }
            return null;
        });
        expect(postLoginData).toBeTruthy();
    });
});
