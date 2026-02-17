// Standalone script: open the coverage-instrumented app, navigate through pages, and extract coverage
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    console.log('Navigating to legacy login...');
    await page.goto('http://localhost:8082/#/legacyLogin?server=http://localhost/api/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);

    // Disable API login to show legacy form
    await page.evaluate(() => {
        if (window.app && window.app.$store) {
            window.app.$store.commit('featuresEnabled/apiLoginEnabled', false);
        }
    });
    await page.waitForTimeout(500);

    // Create account
    console.log('Creating account...');
    const createBtn = page.locator('#legacy-login-create-account-button');
    if (await createBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
        await createBtn.click();
    }
    const uid = Date.now();
    await page.fill('#legacy-login-create-link-person-name', 'Coverage Explorer');
    await page.fill('#legacy-login-create-link-person-email', `covexplore${uid}@test.com`);
    await page.fill('#legacy-login-create-account-username', `covexplore${uid}`);
    await page.fill('#legacy-login-create-account-password', 'password123');
    await page.fill('#legacy-login-create-account-password-confirm', 'password123');
    await page.click('#legacy-login-create-link-person-button');
    await page.waitForSelector('#side-nav-user-icon-button', { timeout: 15000 });
    console.log('Logged in successfully');

    // ============ FRAMEWORKS LIST ============
    console.log('Navigating to frameworks...');
    await page.goto('http://localhost:8082/#/frameworks?server=http://localhost/api/');
    await page.waitForTimeout(3000);

    // Search bar
    const searchInput = page.locator('#search-bar-input');
    if (await searchInput.isVisible({ timeout: 3000 }).catch(() => false)) {
        await searchInput.fill('test search coverage');
        await page.waitForTimeout(1000);
        await searchInput.fill('');
        await page.waitForTimeout(500);
    }

    // Open filter panel
    const filterBtn = page.locator('#open-filters-side-bar-button');
    if (await filterBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
        await filterBtn.click();
        await page.waitForTimeout(1000);

        // Click all radios and checkboxes
        const radios = page.locator('#right-side-bar input[type="radio"]');
        const radioCount = await radios.count();
        for (let i = 0; i < radioCount; i++) {
            await radios.nth(i).click({ force: true });
            await page.waitForTimeout(200);
        }

        const checkboxes = page.locator('#right-side-bar input[type="checkbox"]');
        const cbCount = await checkboxes.count();
        for (let i = 0; i < cbCount; i++) {
            await checkboxes.nth(i).click({ force: true });
            await page.waitForTimeout(200);
        }
        // Toggle back
        for (let i = 0; i < cbCount; i++) {
            await checkboxes.nth(i).click({ force: true });
            await page.waitForTimeout(100);
        }

        // Close filter panel
        const closeBtn = page.locator('#close-right-aside-button');
        if (await closeBtn.isVisible()) await closeBtn.click();
        await page.waitForTimeout(500);
    }

    // Click first framework for info panel
    const listItems = page.locator('.cass--list--item');
    if (await listItems.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await listItems.first().click();
        await page.waitForTimeout(1000);
        const closeBtn = page.locator('#close-right-aside-button');
        if (await closeBtn.isVisible()) await closeBtn.click();
        await page.waitForTimeout(500);

        // Double click to enter framework
        const thingItems = page.locator('.cass--list--item .cass--list--thing');
        if (await thingItems.first().isVisible({ timeout: 2000 }).catch(() => false)) {
            await thingItems.first().dblclick();
            await page.waitForTimeout(3000);
        }
    }

    // ============ FRAMEWORK DETAIL ============
    console.log('Exploring framework detail...');
    const hierarchy = page.locator('.lode__hierarchy');
    if (await hierarchy.isVisible({ timeout: 5000 }).catch(() => false)) {
        // Click hierarchy items
        const hItems = page.locator('.lode__hierarchy-item');
        if (await hItems.first().isVisible({ timeout: 3000 }).catch(() => false)) {
            await hItems.first().click();
            await page.waitForTimeout(500);

            // Hover to reveal edit button
            await hItems.first().hover();
            await page.waitForTimeout(500);
            const editBtn = page.locator('.edit-button').first();
            if (await editBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
                await editBtn.click({ force: true });
                await page.waitForTimeout(1000);

                // Interact with ThingEditing
                const thingEditing = page.locator('.lode__thing-editing');
                if (await thingEditing.isVisible({ timeout: 3000 }).catch(() => false)) {
                    // Click property fields
                    const propertyContainers = page.locator('.lode__thing-editing .property-container');
                    const propCount = await propertyContainers.count();
                    for (let i = 0; i < Math.min(propCount, 5); i++) {
                        try {
                            await propertyContainers.nth(i).click({ timeout: 500 });
                            await page.waitForTimeout(200);
                        } catch { }
                    }

                    // Click done/close
                    const doneBtn = page.locator('.lode__thing-editing .button, .lode__thing-editing button').filter({ hasText: /done|close|cancel/i }).first();
                    if (await doneBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
                        await doneBtn.click();
                        await page.waitForTimeout(500);
                    }
                }
            }
        }

        // Try toolbar buttons
        const toolbar = page.locator('.editor-toolbar, #editor-toolbar');
        if (await toolbar.isVisible({ timeout: 1000 }).catch(() => false)) {
            const toolbarBtns = toolbar.locator('button, .button');
            const tbCount = await toolbarBtns.count();
            for (let i = 0; i < Math.min(tbCount, 3); i++) {
                try {
                    await toolbarBtns.nth(i).click({ timeout: 500 });
                    await page.waitForTimeout(300);
                } catch { }
            }
        }
    }

    // ============ CROSSWALK ============
    console.log('Navigating to crosswalk...');
    await page.goto('http://localhost:8082/#/crosswalk?server=http://localhost/api/');
    await page.waitForTimeout(3000);

    // ============ IMPORT ============
    console.log('Navigating to import...');
    await page.goto('http://localhost:8082/#/import?server=http://localhost/api/');
    await page.waitForTimeout(2000);
    // Click through import tabs
    for (const tabId of ['import-file-tab-button', 'import-server-tab-button', 'import-text-tab-button', 'import-url-tab-button']) {
        const tab = page.locator(`#${tabId}`);
        if (await tab.isVisible({ timeout: 1000 }).catch(() => false)) {
            await tab.click();
            await page.waitForTimeout(500);
        }
    }

    // ============ CONCEPTS / TAXONOMIES ============
    console.log('Navigating to taxonomies...');
    await page.goto('http://localhost:8082/#/concepts?server=http://localhost/api/');
    await page.waitForTimeout(2000);

    // ============ CONFIGURATION ============
    console.log('Navigating to configuration...');
    await page.goto('http://localhost:8082/#/configuration?server=http://localhost/api/');
    await page.waitForTimeout(2000);

    // ============ PLUGINS ============
    console.log('Navigating to plugins...');
    await page.goto('http://localhost:8082/#/pluginManager?server=http://localhost/api/');
    await page.waitForTimeout(2000);

    // ============ USERS / GROUPS ============
    console.log('Navigating to users...');
    await page.goto('http://localhost:8082/#/users?server=http://localhost/api/');
    await page.waitForTimeout(2000);

    // ============ WELCOME ============
    console.log('Navigating to welcome page...');
    await page.goto('http://localhost:8082/#/?server=http://localhost/api/');
    await page.waitForTimeout(2000);

    // ============ EXTRACT COVERAGE ============
    console.log('Extracting coverage data...');
    const coverage = await page.evaluate(() => window.__coverage__);
    if (coverage) {
        const fileCount = Object.keys(coverage).length;
        console.log(`Coverage data found for ${fileCount} files`);

        const outputDir = path.join(__dirname, '.nyc_output');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const outputPath = path.join(outputDir, `browser-exploration-${Date.now()}.json`);
        fs.writeFileSync(outputPath, JSON.stringify(coverage));
        console.log(`Coverage written to: ${outputPath}`);
    } else {
        console.log('No coverage data found!');
    }

    await browser.close();
    console.log('Done!');
})();
