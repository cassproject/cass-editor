const { chromium } = require('playwright');
(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    const uid = Date.now();

    // Login
    await page.goto('http://localhost:8082/#/legacyLogin?server=http://localhost/api/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);
    await page.evaluate(() => { if (window.app && window.app.$store) window.app.$store.commit('featuresEnabled/apiLoginEnabled', false); });
    await page.waitForTimeout(500);
    const cb = page.locator('#legacy-login-create-account-button');
    if (await cb.isVisible({ timeout: 3000 }).catch(() => false)) await cb.click();
    await page.fill('#legacy-login-create-link-person-name', 'Diag');
    await page.fill('#legacy-login-create-link-person-email', `diag${uid}@test.com`);
    await page.fill('#legacy-login-create-account-username', `diag${uid}`);
    await page.fill('#legacy-login-create-account-password', 'password123');
    await page.fill('#legacy-login-create-account-password-confirm', 'password123');
    await page.click('#legacy-login-create-link-person-button');
    await page.waitForSelector('#side-nav-user-icon-button', { timeout: 15000 });
    console.log('Logged in');

    // Go to frameworks
    await page.goto('http://localhost:8082/#/frameworks?server=http://localhost/api/');
    await page.waitForTimeout(4000);

    const fwCount = await page.locator('.cass--list--item').count();
    console.log('Frameworks in list: ' + fwCount);

    // Dismiss overlays
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    await page.evaluate(() => {
        document.querySelectorAll('.dropdown-content, .dropdown.is-active').forEach(el => el.style.display = 'none');
        if (window.app && window.app.$store) window.app.$store.commit('app/showRightAside', '');
    });
    await page.waitForTimeout(500);

    // Double-click to enter
    const fw = page.locator('.cass--list--item .cass--list--thing').first();
    await fw.dblclick({ force: true });
    console.log('Double-clicked. Waiting 10s...');
    await page.waitForTimeout(10000);

    // Check URL
    console.log('URL: ' + page.url());

    // Check hierarchy
    const hCount = await page.locator('.lode__hierarchy-item').count();
    console.log('Hierarchy items (.lode__hierarchy-item): ' + hCount);

    // Broader check for any clickable items
    const treeItems = await page.locator('[class*="hierarchy"]').count();
    console.log('Elements with "hierarchy" in class: ' + treeItems);

    // Check for the main framework component
    const vueComps = await page.evaluate(() => {
        const seen = new Set();
        document.querySelectorAll('*').forEach(el => {
            if (el.__vue__ && el.__vue__.$options && el.__vue__.$options.name) {
                seen.add(el.__vue__.$options.name);
            }
        });
        return Array.from(seen).sort();
    });
    console.log('Vue components: ' + vueComps.join(', '));

    // Check Framework component state
    const fwState = await page.evaluate(() => {
        const allEls = document.querySelectorAll('*');
        for (const el of allEls) {
            const vm = el.__vue__;
            if (vm && vm.$options && vm.$options.name === 'Framework') {
                return JSON.stringify({
                    hasHierarchy: !!vm.hierarchy,
                    hierarchyLength: vm.hierarchy ? vm.hierarchy.length : 0,
                    view: vm.view,
                    hasCompetencies: !!vm.competencies,
                    competenciesCount: vm.competencies ? vm.competencies.length : 0,
                    frameworkName: vm.framework ? (vm.framework.name || 'unnamed') : 'no framework'
                });
            }
        }
        return 'Framework component not found';
    });
    console.log('Framework state: ' + fwState);

    // Check Hierarchy component state
    const hState = await page.evaluate(() => {
        const allEls = document.querySelectorAll('*');
        for (const el of allEls) {
            const vm = el.__vue__;
            if (vm && vm.$options && vm.$options.name === 'Hierarchy') {
                return JSON.stringify({
                    hasCompetencies: !!vm.competencies,
                    competenciesCount: vm.competencies ? vm.competencies.length : 0,
                    hasViewMode: !!vm.viewMode,
                    isEditing: !!vm.isEditing,
                    containerClass: vm.$el ? vm.$el.className : 'unknown'
                });
            }
        }
        return 'Hierarchy component not found';
    });
    console.log('Hierarchy state: ' + hState);

    // Check for edit buttons
    const editBtns = await page.locator('.edit-button, [class*="edit"]').count();
    console.log('Edit-like buttons: ' + editBtns);

    // Check for thing-editing
    const teCount = await page.locator('.lode__thing-editing').count();
    console.log('ThingEditing elements: ' + teCount);

    // Check for tree items
    const treeCount = await page.locator('.tree-item, .tree-node, .hierarchy-node, .node').count();
    console.log('Tree/node elements: ' + treeCount);

    // Log all class names that contain "item" in the main content area
    const itemClasses = await page.evaluate(() => {
        const classes = new Set();
        document.querySelectorAll('[class*="item"], [class*="comp"]').forEach(el => {
            el.classList.forEach(c => {
                if (c.includes('item') || c.includes('comp') || c.includes('hierarchy')) {
                    classes.add(c);
                }
            });
        });
        return Array.from(classes).sort();
    });
    console.log('Item/comp/hierarchy classes: ' + itemClasses.join(', '));

    await browser.close();
    console.log('Done');
})();
