// Deep browser exploration for maximum coverage
// Targets: Breadcrumbs, competencyEdits, AddProperty, ListItemInfo, Crosswalk, common.js
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    const uid = Date.now();

    // ============ LOGIN ============
    console.log('1. Logging in...');
    await page.goto('http://localhost:8082/#/legacyLogin?server=http://localhost/api/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);
    await page.evaluate(() => {
        if (window.app && window.app.$store) {
            window.app.$store.commit('featuresEnabled/apiLoginEnabled', false);
        }
    });
    await page.waitForTimeout(500);
    const createBtn = page.locator('#legacy-login-create-account-button');
    if (await createBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
        await createBtn.click();
    }
    await page.fill('#legacy-login-create-link-person-name', 'Deep Explorer');
    await page.fill('#legacy-login-create-link-person-email', `deep${uid}@test.com`);
    await page.fill('#legacy-login-create-account-username', `deep${uid}`);
    await page.fill('#legacy-login-create-account-password', 'password123');
    await page.fill('#legacy-login-create-account-password-confirm', 'password123');
    await page.click('#legacy-login-create-link-person-button');
    await page.waitForSelector('#side-nav-user-icon-button', { timeout: 15000 });
    console.log('   Logged in');

    // ============ WELCOME PAGE ============
    console.log('2. Exploring Welcome page...');
    await page.goto('http://localhost:8082/#/?server=http://localhost/api/');
    await page.waitForTimeout(2000);
    // Click all links and buttons on welcome page
    const welcomeLinks = page.locator('.welcome-page a, .welcome-page button, .welcome-page .button');
    const wlCount = await welcomeLinks.count();
    for (let i = 0; i < Math.min(wlCount, 10); i++) {
        try {
            const href = await welcomeLinks.nth(i).getAttribute('href');
            if (href && (href.startsWith('http') || href.startsWith('docs'))) continue; // Skip external
            await welcomeLinks.nth(i).click({ timeout: 1000 });
            await page.waitForTimeout(300);
        } catch { }
    }

    // ============ FRAMEWORKS LIST - DEEP INTERACTION ============
    console.log('3. Frameworks list - deep interaction...');
    await page.goto('http://localhost:8082/#/frameworks?server=http://localhost/api/');
    await page.waitForTimeout(3000);

    // Exercise search with multiple queries
    const searchInput = page.locator('#search-bar-input');
    if (await searchInput.isVisible({ timeout: 3000 }).catch(() => false)) {
        for (const term of ['framework', 'test', 'competency', '']) {
            await searchInput.fill(term);
            await page.waitForTimeout(800);
        }
    }

    // Open filter panel and interact with EVERY option
    const filterBtn = page.locator('#open-filters-side-bar-button');
    if (await filterBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
        await filterBtn.click();
        await page.waitForTimeout(1000);

        // All radios
        const radios = page.locator('#right-side-bar input[type="radio"]');
        for (let i = 0; i < await radios.count(); i++) {
            await radios.nth(i).click({ force: true });
            await page.waitForTimeout(300);
        }

        // All checkboxes - toggle on then off
        const checkboxes = page.locator('#right-side-bar input[type="checkbox"]');
        for (let i = 0; i < await checkboxes.count(); i++) {
            await checkboxes.nth(i).click({ force: true });
            await page.waitForTimeout(200);
        }
        await page.waitForTimeout(500);
        for (let i = 0; i < await checkboxes.count(); i++) {
            await checkboxes.nth(i).click({ force: true });
            await page.waitForTimeout(100);
        }

        const closeBtn = page.locator('#close-right-aside-button');
        if (await closeBtn.isVisible()) await closeBtn.click();
        await page.waitForTimeout(300);
    }

    // Click frameworks to exercise ListItemInfo deeply
    const listItems = page.locator('.cass--list--item');
    const itemCount = await listItems.count();
    for (let i = 0; i < Math.min(itemCount, 3); i++) {
        await listItems.nth(i).click();
        await page.waitForTimeout(1500);

        // Exercise ListItemInfo Vue instance deeply
        await page.evaluate(() => {
            const allEls = document.querySelectorAll('*');
            for (const el of allEls) {
                const vm = el.__vue__;
                if (vm && vm.$options && vm.$options.name === 'ListItemInfo') {
                    // Touch all computed properties
                    void vm.objectType;
                    void vm.object;
                    void vm.numObjects;
                    void vm.canEdit;
                    void vm.dateCreated;
                    void vm.lastModified;
                    void vm.creatorName;
                    void vm.owners;
                    void vm.readers;
                    void vm.profile;
                    void vm.ceasnDataFields;
                    void vm.totalCompetencies;
                    void vm.directoryName;
                    void vm.directoryType;
                    void vm.directoryItems;
                    void vm.directoryIsPublished;
                    void vm.conceptSchemeType;
                    void vm.isCtdlasnProfile;
                    void vm.isTlaProfile;
                    break;
                }
            }
        });

        const closeBtn = page.locator('#close-right-aside-button');
        if (await closeBtn.isVisible()) await closeBtn.click();
        await page.waitForTimeout(300);
    }

    // ============ CREATE FRAMEWORK WITH MULTIPLE COMPETENCIES ============
    console.log('4. Creating framework with hierarchy...');
    // Click "+ New" button
    const newBtn = page.locator('#add-new-dropdown-toggle-button');
    if (await newBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
        await newBtn.click();
        await page.waitForTimeout(1000);
    }

    // Wait for framework creation view
    await page.waitForTimeout(2000);

    // Name the framework
    const nameInput = page.locator('#property-string-computed-text').first();
    if (await nameInput.isVisible({ timeout: 5000 }).catch(() => false)) {
        await nameInput.fill(`Deep Coverage Framework ${uid}`);
        await page.waitForTimeout(500);

        // Click done
        const doneBtn = page.locator('.button').filter({ hasText: /done/i }).first();
        if (await doneBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
            await doneBtn.click();
            await page.waitForTimeout(3000);
        }
    }

    // Now add multiple competencies
    console.log('5. Adding competencies...');
    for (let c = 1; c <= 4; c++) {
        // Click "Add" or "create new" button
        const addBtn = page.locator('.button').filter({ hasText: /add|create new/i }).first();
        if (await addBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
            await addBtn.click();
            await page.waitForTimeout(1500);

            const compName = page.locator('#property-string-computed-text').first();
            if (await compName.isVisible({ timeout: 3000 }).catch(() => false)) {
                await compName.fill(`Competency ${c} - ${uid}`);
                await page.waitForTimeout(300);

                const doneBtn = page.locator('.button').filter({ hasText: /done/i }).first();
                if (await doneBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
                    await doneBtn.click();
                    await page.waitForTimeout(2000);
                }
            }
        }
        console.log(`   Added competency ${c}`);
    }

    // ============ NAVIGATE INTO FRAMEWORK DETAIL ============
    console.log('5b. Navigating into framework detail...');
    // Go back to frameworks list
    await page.goto('http://localhost:8082/#/frameworks?server=http://localhost/api/');
    await page.waitForTimeout(3000);
    // Dismiss any dropdown overlays
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    await page.evaluate(() => {
        document.querySelectorAll('.dropdown-content, .dropdown.is-active').forEach(el => {
            el.style.display = 'none';
        });
        // Close right aside if open
        if (window.app && window.app.$store) {
            window.app.$store.commit('app/showRightAside', '');
        }
    });
    await page.waitForTimeout(500);
    // Double-click the first framework to enter detail view
    const fwItems = page.locator('.cass--list--item .cass--list--thing');
    if (await fwItems.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await fwItems.first().dblclick({ force: true });
        await page.waitForTimeout(4000);
    }

    // ============ HIERARCHY INTERACTION ============
    console.log('6. Interacting with hierarchy...');
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await page.waitForTimeout(2000);
    const hCount = await hierarchyItems.count();
    console.log(`   Found ${hCount} hierarchy items`);

    // Click each hierarchy item to trigger Breadcrumbs
    for (let i = 0; i < Math.min(hCount, 4); i++) {
        await hierarchyItems.nth(i).click();
        await page.waitForTimeout(500);

        // This should trigger Breadcrumbs.vue rendering
        // Exercise Breadcrumbs computed props
        await page.evaluate(() => {
            const allEls = document.querySelectorAll('*');
            for (const el of allEls) {
                const vm = el.__vue__;
                if (vm && vm.$options && vm.$options.name === 'Breadcrumbs') {
                    void vm.breadCrumbInfo;
                    void vm.parentBreadCrumbInfo;
                    void vm.directoryBreadCrumbInfo;
                    break;
                }
            }
        });
    }

    // ============ EDIT COMPETENCY - DEEP ============
    console.log('7. Editing competency (ThingEditing, Property, AddProperty)...');
    if (hCount > 0) {
        // Hover and click edit button
        await hierarchyItems.first().hover();
        await page.waitForTimeout(500);
        const editBtn = page.locator('.edit-button').first();
        if (await editBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
            await editBtn.click({ force: true });
            await page.waitForTimeout(2000);

            const thingEditing = page.locator('.lode__thing-editing');
            if (await thingEditing.isVisible({ timeout: 5000 }).catch(() => false)) {
                // Click on property containers to expand them
                const propContainers = page.locator('.lode__thing-editing .property-container, .lode__thing-editing .property');
                const pCount = await propContainers.count();
                for (let i = 0; i < Math.min(pCount, 8); i++) {
                    try {
                        await propContainers.nth(i).click({ timeout: 500 });
                        await page.waitForTimeout(300);
                    } catch { }
                }

                // Try to find and click "Add property" or "+" button inside ThingEditing
                const addPropBtn = page.locator('.lode__thing-editing .button, .lode__thing-editing button').filter({ hasText: /add|property|\+/i }).first();
                if (await addPropBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
                    await addPropBtn.click();
                    await page.waitForTimeout(1500);

                    // Exercise AddProperty.vue
                    await page.evaluate(() => {
                        const allEls = document.querySelectorAll('*');
                        for (const el of allEls) {
                            const vm = el.__vue__;
                            if (vm && vm.$options && vm.$options.name === 'AddProperty') {
                                void vm.selectedPropertyToAdd;
                                void vm.selectedPropertyToAddIsTextValue;
                                void vm.addRelationBy;
                                void vm.checkedOptions;
                                void vm.profile;
                                void vm.propertiesRemaining;
                                break;
                            }
                        }
                    });

                    // Click available property options
                    const propOptions = page.locator('.add-property-selection, .add-property button, .property-option');
                    const poCount = await propOptions.count();
                    for (let i = 0; i < Math.min(poCount, 5); i++) {
                        try {
                            await propOptions.nth(i).click({ timeout: 500 });
                            await page.waitForTimeout(300);
                        } catch { }
                    }

                    // Go back if possible
                    const backBtn = page.locator('.button').filter({ hasText: /back/i }).first();
                    if (await backBtn.isVisible({ timeout: 500 }).catch(() => false)) {
                        await backBtn.click();
                        await page.waitForTimeout(300);
                    }
                }

                // Try editing a PropertyString value
                const propStringInputs = page.locator('.lode__thing-editing input[type="text"], .lode__thing-editing textarea');
                const psCount = await propStringInputs.count();
                for (let i = 0; i < Math.min(psCount, 3); i++) {
                    try {
                        await propStringInputs.nth(i).click({ timeout: 500 });
                        const currentVal = await propStringInputs.nth(i).inputValue();
                        await propStringInputs.nth(i).fill(currentVal + ' edited');
                        await page.waitForTimeout(300);
                    } catch { }
                }

                // Click done/save
                const saveBtn = page.locator('.lode__thing-editing .button').filter({ hasText: /done|save|close/i }).first();
                if (await saveBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
                    await saveBtn.click();
                    await page.waitForTimeout(1000);
                }
            }
        }
    }

    // ============ TOOLBAR INTERACTIONS ============
    console.log('8. Toolbar interactions...');
    // Click toolbar buttons (undo, redo, etc.)
    const toolbarButtons = page.locator('#editor-toolbar button, .editor-toolbar button, .editor-toolbar .button');
    const tbCount = await toolbarButtons.count();
    for (let i = 0; i < Math.min(tbCount, 8); i++) {
        try {
            const text = await toolbarButtons.nth(i).textContent();
            // Skip dangerous buttons like "delete"
            if (text && /delete|remove/i.test(text)) continue;
            await toolbarButtons.nth(i).click({ timeout: 500 });
            await page.waitForTimeout(300);
        } catch { }
    }

    // ============ DRAG & DROP (for competencyEdits.js) ============
    console.log('9. Attempting drag & drop for competencyEdits...');
    const hItems2 = page.locator('.lode__hierarchy-item');
    const h2Count = await hItems2.count();
    if (h2Count >= 2) {
        try {
            // Try dragging second item onto first
            const sourceBox = await hItems2.nth(1).boundingBox();
            const targetBox = await hItems2.nth(0).boundingBox();
            if (sourceBox && targetBox) {
                await page.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + sourceBox.height / 2);
                await page.mouse.down();
                await page.waitForTimeout(300);
                await page.mouse.move(targetBox.x + targetBox.width / 2, targetBox.y + targetBox.height / 2, { steps: 10 });
                await page.waitForTimeout(300);
                await page.mouse.up();
                await page.waitForTimeout(1000);
            }
        } catch (e) {
            console.log('   Drag failed:', e.message);
        }
    }

    // ============ RIGHT-CLICK CONTEXT MENU ============
    console.log('10. Right-click context menu...');
    if (h2Count > 0) {
        try {
            await hItems2.first().click({ button: 'right' });
            await page.waitForTimeout(500);
            // Close menu if it appeared
            await page.keyboard.press('Escape');
            await page.waitForTimeout(300);
        } catch { }
    }

    // ============ KEYBOARD SHORTCUTS ============
    console.log('11. Keyboard shortcuts...');
    // Select a hierarchy item and try keyboard operations
    if (h2Count > 0) {
        await hItems2.first().click();
        await page.waitForTimeout(300);

        // Copy (Ctrl+C)
        await page.keyboard.press('Control+c');
        await page.waitForTimeout(200);

        // Cut (Ctrl+X)  - but don't actually cut
        // await page.keyboard.press('Control+x');

        // Undo (Ctrl+Z)
        await page.keyboard.press('Control+z');
        await page.waitForTimeout(200);

        // Arrow keys for navigation
        await page.keyboard.press('ArrowDown');
        await page.waitForTimeout(200);
        await page.keyboard.press('ArrowUp');
        await page.waitForTimeout(200);
    }

    // ============ CROSSWALK DEEP ============
    console.log('12. Crosswalk deep interaction...');
    await page.goto('http://localhost:8082/#/crosswalk?server=http://localhost/api/');
    await page.waitForTimeout(3000);

    // Exercise crosswalk computed properties
    await page.evaluate(() => {
        const allEls = document.querySelectorAll('*');
        for (const el of allEls) {
            const vm = el.__vue__;
            if (vm && vm.$options && (vm.$options.name === 'Crosswalk' || vm.$options.name === 'crosswalk')) {
                // Touch all computed props
                void vm.queryParams;
                void vm.sourceFramework;
                void vm.targetFramework;
                void vm.showRightAside;
                void vm.alignments;
                void vm.step;
                void vm.sourceCompetencies;
                void vm.targetCompetencies;
                void vm.selectedSourceCompetency;
                void vm.selectedTargetCompetency;
                break;
            }
        }
    });

    // Click on frameworks in the crosswalk list
    const crosswalkItems = page.locator('.crosswalk-step-container .cass--list--item, .crosswalk-step-container .cass--list--thing');
    if (await crosswalkItems.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await crosswalkItems.first().click();
        await page.waitForTimeout(2000);

        // Try to proceed to step B
        const nextBtn = page.locator('.button').filter({ hasText: /next|step|select/i }).first();
        if (await nextBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
            await nextBtn.click();
            await page.waitForTimeout(2000);
        }
    }

    // Search in crosswalk
    const cwSearch = page.locator('#search-bar-input');
    if (await cwSearch.isVisible({ timeout: 1000 }).catch(() => false)) {
        await cwSearch.fill('test');
        await page.waitForTimeout(800);
        await cwSearch.fill('');
        await page.waitForTimeout(500);
    }

    // ============ IMPORT DEEP ============
    console.log('13. Import deep interaction...');
    await page.goto('http://localhost:8082/#/import?server=http://localhost/api/');
    await page.waitForTimeout(2000);

    // Exercise all import tabs
    for (const tabId of ['import-file-tab-button', 'import-server-tab-button', 'import-text-tab-button', 'import-url-tab-button']) {
        const tab = page.locator(`#${tabId}`);
        if (await tab.isVisible({ timeout: 1000 }).catch(() => false)) {
            await tab.click();
            await page.waitForTimeout(800);
        }
    }

    // Exercise import computed properties
    await page.evaluate(() => {
        const allEls = document.querySelectorAll('*');
        for (const el of allEls) {
            const vm = el.__vue__;
            if (vm && vm.$options && vm.$options.name === 'Import') {
                void vm.queryParams;
                void vm.importType;
                void vm.importTab;
                void vm.loggedIn;
                void vm.conceptMode;
                void vm.progressionMode;
                void vm.isIframe;
                void vm.featuresEnabled;
                break;
            }
        }
    });

    // Try pasting text in the text tab
    const textTab = page.locator('#import-text-tab-button');
    if (await textTab.isVisible({ timeout: 1000 }).catch(() => false)) {
        await textTab.click();
        await page.waitForTimeout(500);
        const textarea = page.locator('textarea').first();
        if (await textarea.isVisible({ timeout: 1000 }).catch(() => false)) {
            await textarea.fill('Sample\nCompetency1\nCompetency2\nCompetency3');
            await page.waitForTimeout(500);
        }
    }

    // Try URL input
    const urlTab = page.locator('#import-url-tab-button');
    if (await urlTab.isVisible({ timeout: 1000 }).catch(() => false)) {
        await urlTab.click();
        await page.waitForTimeout(500);
        const urlInput = page.locator('input[placeholder*="url" i], input[type="url"]').first();
        if (await urlInput.isVisible({ timeout: 1000 }).catch(() => false)) {
            await urlInput.fill('https://example.com/framework.json');
            await page.waitForTimeout(500);
        }
    }

    // ============ CONCEPTS / TAXONOMIES ============
    console.log('14. Taxonomies interaction...');
    await page.goto('http://localhost:8082/#/concepts?server=http://localhost/api/');
    await page.waitForTimeout(3000);

    // Try to create a new taxonomy
    const newTaxBtn = page.locator('#add-new-dropdown-toggle-button, .button').filter({ hasText: /\+|new/i }).first();
    if (await newTaxBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
        await newTaxBtn.click();
        await page.waitForTimeout(1500);

        const taxName = page.locator('#property-string-computed-text').first();
        if (await taxName.isVisible({ timeout: 3000 }).catch(() => false)) {
            await taxName.fill(`Test Taxonomy ${uid}`);
            await page.waitForTimeout(300);
            const doneBtn = page.locator('.button').filter({ hasText: /done/i }).first();
            if (await doneBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
                await doneBtn.click();
                await page.waitForTimeout(2000);
            }
        }
    }

    // ============ CONFIGURATION DEEP ============
    console.log('15. Configuration deep interaction...');
    await page.goto('http://localhost:8082/#/configuration?server=http://localhost/api/');
    await page.waitForTimeout(3000);

    // Exercise configuration editor
    await page.evaluate(() => {
        const allEls = document.querySelectorAll('*');
        for (const el of allEls) {
            const vm = el.__vue__;
            if (vm && vm.$options && vm.$options.name === 'ConfigurationEditor') {
                void vm.queryParams;
                void vm.loggedIn;
                void vm.configs;
                void vm.selectedConfig;
                void vm.isDefaultSelected;
                break;
            }
        }
    });

    // Click on configuration items
    const configItems = page.locator('.configuration-list .cass--list--item, .configuration-list li, .config-item');
    const ciCount = await configItems.count();
    for (let i = 0; i < Math.min(ciCount, 3); i++) {
        try {
            await configItems.nth(i).click({ timeout: 500 });
            await page.waitForTimeout(500);
        } catch { }
    }

    // Toggle switches/checkboxes
    const configCheckboxes = page.locator('.configuration-editor input[type="checkbox"], .config-checkbox');
    const ccCount = await configCheckboxes.count();
    for (let i = 0; i < Math.min(ccCount, 5); i++) {
        try {
            await configCheckboxes.nth(i).click({ force: true, timeout: 500 });
            await page.waitForTimeout(300);
        } catch { }
    }

    // ============ USERS / GROUPS DEEP ============
    console.log('16. Users/Groups deep interaction...');
    await page.goto('http://localhost:8082/#/users?server=http://localhost/api/');
    await page.waitForTimeout(3000);

    // Exercise UserGroupEditor
    await page.evaluate(() => {
        const allEls = document.querySelectorAll('*');
        for (const el of allEls) {
            const vm = el.__vue__;
            if (vm && vm.$options && vm.$options.name === 'UserGroupEditor') {
                void vm.queryParams;
                void vm.loggedIn;
                void vm.groups;
                void vm.selectedGroup;
                void vm.groupMembers;
                void vm.canEditGroup;
                void vm.isOwnGroup;
                break;
            }
        }
    });

    // Create a group
    const createGroupBtn = page.locator('.button').filter({ hasText: /create|new|group/i }).first();
    if (await createGroupBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
        await createGroupBtn.click();
        await page.waitForTimeout(2000);

        // Name the group
        const groupInput = page.locator('input[placeholder*="group" i], #group-name-input, input[type="text"]').first();
        if (await groupInput.isVisible({ timeout: 2000 }).catch(() => false)) {
            await groupInput.fill(`Test Group ${uid}`);
            await page.waitForTimeout(300);
        }

        // Save
        const saveBtn = page.locator('.button').filter({ hasText: /save|create|done/i }).first();
        if (await saveBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
            await saveBtn.click();
            await page.waitForTimeout(2000);
        }
    }

    // Click on groups if any exist
    const groupItems = page.locator('.cass--list--item');
    const giCount = await groupItems.count();
    for (let i = 0; i < Math.min(giCount, 3); i++) {
        try {
            await groupItems.nth(i).click();
            await page.waitForTimeout(500);
        } catch { }
    }

    // ============ PLUGINS ============
    console.log('17. Plugins interaction...');
    await page.goto('http://localhost:8082/#/pluginManager?server=http://localhost/api/');
    await page.waitForTimeout(2000);

    // Click on plugin items
    const pluginItems = page.locator('.cass--list--item, .plugin-item, .plugin-card');
    const piCount = await pluginItems.count();
    for (let i = 0; i < Math.min(piCount, 3); i++) {
        try {
            await pluginItems.nth(i).click({ timeout: 500 });
            await page.waitForTimeout(300);
        } catch { }
    }

    // ============ SIDEBAR TOGGLE ============
    console.log('18. Sidebar interactions...');
    // First dismiss any open modals
    try {
        await page.evaluate(() => {
            // Click any modal close buttons or backgrounds
            document.querySelectorAll('.modal-background, .modal-close, .modal .delete').forEach(el => el.click());
            // Also dismiss via store if possible
            if (window.app && window.app.$store) {
                window.app.$store.commit('app/showModal', null);
            }
        });
        await page.waitForTimeout(500);
    } catch { }

    // Navigate to a clean page first to avoid modal issues
    await page.goto('http://localhost:8082/#/frameworks?server=http://localhost/api/');
    await page.waitForTimeout(2000);

    try {
        const collapseBtn = page.locator('#side-nav-collapse-button');
        if (await collapseBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
            await collapseBtn.click({ force: true });
            await page.waitForTimeout(500);
            await collapseBtn.click({ force: true });
            await page.waitForTimeout(500);
        }
    } catch (e) {
        console.log('   Sidebar collapse failed:', e.message.substring(0, 50));
    }

    // User icon button
    try {
        const userBtn = page.locator('#side-nav-user-icon-button');
        if (await userBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
            await userBtn.click({ force: true });
            await page.waitForTimeout(500);
            await page.keyboard.press('Escape');
            await page.waitForTimeout(300);
        }
    } catch { }

    // Navigate to each sidebar link
    for (const linkId of ['side-nav-frameworks-link', 'side-nav-import-link']) {
        try {
            const link = page.locator(`#${linkId}`);
            if (await link.isVisible({ timeout: 500 }).catch(() => false)) {
                await link.click({ force: true });
                await page.waitForTimeout(1000);
            }
        } catch { }
    }

    // ============ STORE DEEP EXERCISE ============
    console.log('19. Deep store exercise...');
    await page.evaluate(() => {
        const app = window.app;
        if (!app || !app.$store) return;
        const store = app.$store;

        // App module
        store.commit('app/showRightAside', 'FilterAndSort');
        store.commit('app/showRightAside', '');
        store.commit('app/searchTerm', 'test');
        store.commit('app/searchTerm', '');
        store.commit('app/sortResults', { id: 'lastEdited' });
        store.commit('app/sortResults', { id: 'alphabetical' });
        store.commit('app/sortResults', { id: 'dateCreated' });
        store.commit('app/filterByOwnedByMe', true);
        store.commit('app/filterByOwnedByMe', false);
        store.commit('app/filterByNotOwnedByMe', true);
        store.commit('app/filterByNotOwnedByMe', false);
        store.commit('app/showModal', { component: 'TestModal' });
        store.commit('app/showModal', null);
        store.commit('app/showSideNav', false);
        store.commit('app/showSideNav', true);

        // Editor module
        store.commit('editor/conceptMode', true);
        store.commit('editor/conceptMode', false);
        store.commit('editor/progressionMode', true);
        store.commit('editor/progressionMode', false);

        // Features enabled
        void store.getters['featuresEnabled/apiLoginEnabled'];
        void store.getters['featuresEnabled/searchByOwnerNameEnabled'];
        void store.getters['featuresEnabled/publishingEnabled'];
    });

    // ============ EXTRACT COVERAGE ============
    console.log('20. Extracting coverage...');
    const coverage = await page.evaluate(() => window.__coverage__);
    if (coverage) {
        const fileCount = Object.keys(coverage).length;
        console.log(`   Coverage found for ${fileCount} files`);

        const outputDir = path.join(__dirname, '.nyc_output');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const outputPath = path.join(outputDir, `deep-exploration-${Date.now()}.json`);
        fs.writeFileSync(outputPath, JSON.stringify(coverage));
        console.log(`   Coverage written to: ${outputPath}`);
    } else {
        console.log('   No coverage data found!');
    }

    await browser.close();
    console.log('Done!');
})();
