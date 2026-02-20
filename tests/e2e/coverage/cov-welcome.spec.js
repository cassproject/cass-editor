const { test, expect } = require('../fixtures');

// Coverage: Welcome.vue (4.65% → ~30%+)
// Exercises Welcome page rendering, links, computed properties, and mounted lifecycle

test('Welcome: page loads with correct structure', async ({ page }) => {
    await page.goto('/#/?server=http://localhost/api/');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('#welcome')).toBeVisible({ timeout: 10000 });

    // Verify title
    const title = page.locator('#welcome h1');
    await expect(title).toContainText('Welcome to CaSS');

    // Verify subtitle
    const subtitle = page.locator('#welcome h3.subtitle');
    await expect(subtitle).toBeVisible();
});

test('Welcome: Getting Started section visible', async ({ page }) => {
    await page.goto('/#/?server=http://localhost/api/');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('#welcome')).toBeVisible({ timeout: 15000 });

    // Getting Started section
    const gettingStarted = page.locator('text=Getting Started');
    await expect(gettingStarted).toBeVisible({ timeout: 10000 });

    // Steps visible - use h4 elements containing step text
    const steps = page.locator('#welcome h4');
    const count = await steps.count();
    expect(count).toBeGreaterThanOrEqual(4);
});

test('Welcome: documentation links present', async ({ page }) => {
    await page.goto('/#/?server=http://localhost/api/');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('#welcome')).toBeVisible({ timeout: 10000 });

    // Documentation section
    const docSection = page.locator('text=Helpful links');
    await expect(docSection).toBeVisible();

    // Documentation links
    const frameworkPropsLink = page.locator('#welcome-framework-properties-link');
    await expect(frameworkPropsLink).toBeVisible();

    const configLink = page.locator('a:has-text("Configuration")').first();
    await expect(configLink).toBeVisible();

    const userGroupsLink = page.locator('#welcome-user-groups-link');
    await expect(userGroupsLink).toBeVisible();
});

test('Welcome: resource links present', async ({ page }) => {
    await page.goto('/#/?server=http://localhost/api/');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('#welcome')).toBeVisible({ timeout: 10000 });

    // Resources section
    const resources = page.locator('text=Resources');
    await expect(resources.first()).toBeVisible();

    // Resource links
    const authoringLink = page.locator('#welcome-authoring-report-link');
    await expect(authoringLink).toBeVisible();

    const githubLink = page.locator('#welcome-cass-on-github-link');
    await expect(githubLink).toBeVisible();
});

test('Welcome: import example frameworks section', async ({ page }) => {
    await page.goto('/#/?server=http://localhost/api/');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('#welcome')).toBeVisible({ timeout: 10000 });

    // Import Example Frameworks section
    const importSection = page.locator('text=Import Example Frameworks');
    await expect(importSection).toBeVisible();

    // O*NET link
    const onetLink = page.locator('#welcome-onet-basic-skills-link');
    await expect(onetLink).toBeVisible();
});

test('Welcome: contact section present', async ({ page }) => {
    await page.goto('/#/?server=http://localhost/api/');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('#welcome')).toBeVisible({ timeout: 10000 });

    // Get in touch section
    const contactSection = page.locator('text=Get in touch');
    await expect(contactSection).toBeVisible();

    const slackLink = page.locator('#welcome-cass-slack-link');
    await expect(slackLink).toBeVisible();
});

test('Welcome: store state accessible', async ({ page }) => {
    await page.goto('/#/?server=http://localhost/api/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForFunction(() => window.app && window.app.$store, { timeout: 10000 });

    const result = await page.evaluate(() => {
        const store = window.app.$store;
        return {
            hasLoggedOnPerson: store.state.user?.loggedOnPerson != null,
            hasQueryParams: store.state.editor?.queryParams != null
        };
    });

    expect(result.hasLoggedOnPerson).toBe(true);
    expect(result.hasQueryParams).toBe(true);
});
