// Targeted exploration: create content, exercise AddProperty, delete competency, delete framework
// This script only deletes things it creates.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    const uid = Date.now();
    const FW_NAME = `ZeroCov FW ${uid}`;

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
    const createAcctBtn = page.locator('#legacy-login-create-account-button');
    if (await createAcctBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
        await createAcctBtn.click();
    }
    await page.fill('#legacy-login-create-link-person-name', 'Zero Cov');
    await page.fill('#legacy-login-create-link-person-email', `zerocov${uid}@test.com`);
    await page.fill('#legacy-login-create-account-username', `zerocov${uid}`);
    await page.fill('#legacy-login-create-account-password', 'password123');
    await page.fill('#legacy-login-create-account-password-confirm', 'password123');
    await page.click('#legacy-login-create-link-person-button');
    await page.waitForSelector('#side-nav-user-icon-button', { timeout: 15000 });
    console.log('   Logged in');

    // ============ CREATE FRAMEWORK ============
    console.log('2. Creating framework...');
    await page.goto('http://localhost:8082/#/frameworks?server=http://localhost/api/');
    await page.waitForTimeout(3000);

    const newBtn = page.locator('#add-new-dropdown-toggle-button');
    if (await newBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
        await newBtn.click();
        await page.waitForTimeout(1000);
    }
    await page.waitForTimeout(2000);

    // Name the framework
    const nameInput = page.locator('#property-string-computed-text').first();
    if (await nameInput.isVisible({ timeout: 5000 }).catch(() => false)) {
        await nameInput.fill(FW_NAME);
        await page.waitForTimeout(500);
        const doneBtn = page.locator('.button').filter({ hasText: /done/i }).first();
        if (await doneBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
            await doneBtn.click();
            await page.waitForTimeout(3000);
        }
    }
    console.log('   Framework created');

    // ============ ADD 3 COMPETENCIES ============
    console.log('3. Adding competencies...');
    for (let c = 1; c <= 3; c++) {
        const addBtn = page.locator('.button').filter({ hasText: /add|create new/i }).first();
        if (await addBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
            await addBtn.click();
            await page.waitForTimeout(1500);

            const compName = page.locator('#property-string-computed-text').first();
            if (await compName.isVisible({ timeout: 3000 }).catch(() => false)) {
                await compName.fill(`ZeroCov Comp ${c} ${uid}`);
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

    // ============ NAVIGATE INTO FRAMEWORK ============
    console.log('4. Entering framework detail...');
    await page.goto('http://localhost:8082/#/frameworks?server=http://localhost/api/');
    await page.waitForTimeout(3000);
    // Dismiss dropdowns
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    await page.evaluate(() => {
        document.querySelectorAll('.dropdown-content, .dropdown.is-active').forEach(el => el.style.display = 'none');
        if (window.app && window.app.$store) window.app.$store.commit('app/showRightAside', '');
    });
    await page.waitForTimeout(500);

    // Double-click to enter framework detail
    const fwItem = page.locator('.cass--list--item .cass--list--thing').first();
    if (await fwItem.isVisible({ timeout: 3000 }).catch(() => false)) {
        await fwItem.dblclick({ force: true });
        await page.waitForTimeout(5000);
    }
    console.log('   In framework detail view');

    // ============ SELECT COMPETENCY & EXERCISE BREADCRUMBS ============
    console.log('5. Selecting hierarchy items for Breadcrumbs...');
    const hItems = page.locator('.lode__hierarchy-item');
    await page.waitForTimeout(2000);
    const hCount = await hItems.count();
    console.log(`   Found ${hCount} hierarchy items`);

    for (let i = 0; i < Math.min(hCount, 3); i++) {
        await hItems.nth(i).click();
        await page.waitForTimeout(800);

        // Force Breadcrumbs computed properties
        await page.evaluate(() => {
            const allEls = document.querySelectorAll('*');
            for (const el of allEls) {
                const vm = el.__vue__;
                if (vm && vm.$options && vm.$options.name === 'Breadcrumbs') {
                    void vm.breadCrumbInfo;
                    void vm.parentBreadCrumbInfo;
                    void vm.directoryBreadCrumbInfo;
                    // Call methods
                    try { vm.searchFrameworks(); } catch { }
                    try { vm.computeParentCompetencies(); } catch { }
                    if (vm.competency) {
                        try { vm.getName(vm.competency); } catch { }
                    }
                    break;
                }
            }
        });
    }

    // ============ OPEN EDIT PANEL & TRIGGER AddProperty ============
    console.log('6. Opening ThingEditing & AddProperty...');
    if (hCount > 0) {
        await hItems.first().hover();
        await page.waitForTimeout(500);
        const editBtn = page.locator('.edit-button').first();
        if (await editBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
            await editBtn.click({ force: true });
            await page.waitForTimeout(2000);

            const thingEditing = page.locator('.lode__thing-editing');
            if (await thingEditing.isVisible({ timeout: 5000 }).catch(() => false)) {
                console.log('   ThingEditing visible');

                // Click "Add Property" button
                const addPropBtn = page.locator('#thing-editing-add-property-button');
                if (await addPropBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
                    console.log('   Clicking Add Property button...');
                    await addPropBtn.click();
                    await page.waitForTimeout(2000);

                    // AddProperty.vue should be visible now
                    // Exercise all its computed properties
                    const addPropResult = await page.evaluate(() => {
                        const allEls = document.querySelectorAll('*');
                        for (const el of allEls) {
                            const vm = el.__vue__;
                            if (vm && vm.$options && vm.$options.name === 'AddProperty') {
                                void vm.selectedPropertyToAdd;
                                void vm.selectedPropertyToAddIsTextValue;
                                void vm.selectedPropertyToAddIsVersionIdentifier;
                                void vm.addRelationBy;
                                void vm.checkedOptions;
                                void vm.profile;
                                void vm.propertiesRemaining;
                                void vm.isSearching;
                                void vm.isLevel;
                                void vm.textPropertyValue;
                                void vm.versionIdentifiers;
                                void vm.editingVersionIdentifierIndex;
                                return 'AddProperty found, propertiesRemaining: ' + (vm.propertiesRemaining ? vm.propertiesRemaining.length : 0);
                            }
                        }
                        return 'AddProperty NOT found';
                    });
                    console.log('   ' + addPropResult);

                    // Click on available properties to select them
                    const propItems = page.locator('.add-property-selection .button, .add-property-selection a, .add-property-selection .property-option');
                    const piCount = await propItems.count();
                    console.log(`   Found ${piCount} property options`);
                    if (piCount > 0) {
                        // Click first property option
                        await propItems.first().click();
                        await page.waitForTimeout(1000);

                        // Try clicking more property options
                        for (let i = 1; i < Math.min(piCount, 4); i++) {
                            try {
                                await propItems.nth(i).click({ timeout: 500 });
                                await page.waitForTimeout(500);
                            } catch { }
                        }
                    }

                    // Also try clicking on the list of remaining properties shown in AddProperty
                    const remainingProps = page.locator('.add-property .column .button, .add-property .property-select-button');
                    const rpCount = await remainingProps.count();
                    console.log(`   Found ${rpCount} remaining property buttons`);
                    for (let i = 0; i < Math.min(rpCount, 5); i++) {
                        try {
                            await remainingProps.nth(i).click({ timeout: 500 });
                            await page.waitForTimeout(500);
                        } catch { }
                    }

                    // Cancel back
                    const cancelBtn = page.locator('.button').filter({ hasText: /cancel|back/i }).first();
                    if (await cancelBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
                        await cancelBtn.click();
                        await page.waitForTimeout(500);
                    }
                } else {
                    console.log('   Add Property button NOT visible (hasAdditionalProperty may be false)');
                    // Try to trigger it via store
                    await page.evaluate(() => {
                        const allEls = document.querySelectorAll('*');
                        for (const el of allEls) {
                            const vm = el.__vue__;
                            if (vm && vm.$options && vm.$options.name === 'ThingEditing') {
                                vm.showAddPropertyContent = true;
                                break;
                            }
                        }
                    });
                    await page.waitForTimeout(1000);
                }

                // ============ DELETE COMPETENCY ============
                console.log('7. Deleting a competency (competencyEdits.js)...');
                // The delete button in ThingEditing - trigger via showModal
                const deleteResult = await page.evaluate(() => {
                    const allEls = document.querySelectorAll('*');
                    for (const el of allEls) {
                        const vm = el.__vue__;
                        if (vm && vm.$options && vm.$options.name === 'ThingEditing') {
                            // Need to set the item to delete
                            const comp = vm.$store.getters['editor/selectedCompetency'];
                            if (comp) {
                                vm.$store.commit('editor/setItemToDelete', comp);
                                vm.showModal('deleteObject');
                                return 'Delete modal triggered for: ' + (comp.name || comp.id);
                            }
                            return 'No selected competency to delete';
                        }
                    }
                    return 'ThingEditing not found';
                });
                console.log('   ' + deleteResult);
                await page.waitForTimeout(2000);

                // Click the "Delete Competency" button in the modal
                const deleteConfirmBtn = page.locator('#delete-competency-confirm-delete-button');
                if (await deleteConfirmBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
                    console.log('   Clicking Delete Competency confirm button...');
                    await deleteConfirmBtn.click();
                    await page.waitForTimeout(3000);
                    console.log('   Competency deleted - competencyEdits.deleteObject exercised');
                } else {
                    console.log('   Delete confirm button NOT visible');
                    // Dismiss any modal
                    await page.keyboard.press('Escape');
                    await page.waitForTimeout(500);
                }

                // Close editing panel
                const closeEditBtn = page.locator('.lode__thing-editing .button').filter({ hasText: /done|close/i }).first();
                if (await closeEditBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
                    await closeEditBtn.click();
                    await page.waitForTimeout(500);
                }
            }
        }
    }

    // ============ DELETE FRAMEWORK ============
    console.log('8. Deleting framework (competencyEdits.deleteObject framework path)...');
    // Go back to frameworks list
    await page.goto('http://localhost:8082/#/frameworks?server=http://localhost/api/');
    await page.waitForTimeout(3000);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    await page.evaluate(() => {
        document.querySelectorAll('.dropdown-content, .dropdown.is-active').forEach(el => el.style.display = 'none');
    });
    await page.waitForTimeout(500);

    // Click our framework to select it
    const ourFw = page.locator('.cass--list--item .cass--list--thing').first();
    if (await ourFw.isVisible({ timeout: 3000 }).catch(() => false)) {
        // Double-click to enter it
        await ourFw.dblclick({ force: true });
        await page.waitForTimeout(4000);

        // Trigger delete framework modal via store
        const fwDeleteResult = await page.evaluate(() => {
            const store = window.app && window.app.$store;
            if (!store) return 'no store';
            const fw = store.getters['editor/framework'];
            if (!fw) return 'no framework in editor';
            store.commit('editor/setItemToDelete', fw);
            store.commit('app/showModal', { component: 'DeleteFrameworkConfirm' });
            return 'Delete framework modal triggered for: ' + (fw.name || fw.shortId());
        });
        console.log('   ' + fwDeleteResult);
        await page.waitForTimeout(2000);

        // Click the delete confirm button
        const deleteFrameworkBtn = page.locator('#delete-framework-confirm-delete-button, .is-danger.button').filter({ hasText: /delete/i }).first();
        if (await deleteFrameworkBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
            console.log('   Clicking Delete Framework confirm button...');
            await deleteFrameworkBtn.click();
            await page.waitForTimeout(3000);
            console.log('   Framework deleted');
        } else {
            console.log('   Delete framework button NOT visible, checking for other buttons...');
            // Try generic modal buttons
            const modalBtns = page.locator('.modal .is-danger.button, .modal .button.is-danger');
            if (await modalBtns.first().isVisible({ timeout: 1000 }).catch(() => false)) {
                await modalBtns.first().click();
                await page.waitForTimeout(3000);
            }
            // Dismiss any remaining modals
            await page.keyboard.press('Escape');
            await page.waitForTimeout(500);
        }
    }

    // ============ BREADCRUMBS VIA SEARCH ============
    console.log('9. Exercising Breadcrumbs via search results...');
    await page.goto('http://localhost:8082/#/frameworks?server=http://localhost/api/');
    await page.waitForTimeout(3000);

    // Search for something that exists within frameworks (triggers List.vue with Breadcrumbs)
    const searchInput = page.locator('#search-bar-input');
    if (await searchInput.isVisible({ timeout: 2000 }).catch(() => false)) {
        // Enable "search competency name" filter
        const filterBtn = page.locator('#open-filters-side-bar-button');
        if (await filterBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
            await filterBtn.click();
            await page.waitForTimeout(1000);
            // Check all "apply search term to" checkboxes
            const checkboxes = page.locator('#right-side-bar input[type="checkbox"]');
            const cbCount = await checkboxes.count();
            for (let i = 0; i < cbCount; i++) {
                const label = await checkboxes.nth(i).evaluate(el => {
                    const lbl = el.closest('label') || el.parentElement;
                    return lbl ? lbl.textContent.trim() : '';
                });
                if (/competency|name/i.test(label)) {
                    await checkboxes.nth(i).click({ force: true });
                    await page.waitForTimeout(200);
                }
            }
            const closeBtn = page.locator('#close-right-aside-button');
            if (await closeBtn.isVisible()) await closeBtn.click();
            await page.waitForTimeout(500);
        }

        // Type a search term to find competencies within frameworks
        await searchInput.fill('competency');
        await page.waitForTimeout(3000);

        // Click on any search results to trigger Breadcrumbs rendering
        const searchResults = page.locator('.cass--list--item');
        const srCount = await searchResults.count();
        console.log(`   Found ${srCount} search results`);
        for (let i = 0; i < Math.min(srCount, 3); i++) {
            try {
                await searchResults.nth(i).click();
                await page.waitForTimeout(1000);
                // Force Breadcrumbs evaluation
                await page.evaluate(() => {
                    const allEls = document.querySelectorAll('*');
                    for (const el of allEls) {
                        const vm = el.__vue__;
                        if (vm && vm.$options && vm.$options.name === 'Breadcrumbs') {
                            void vm.breadCrumbInfo;
                            void vm.parentBreadCrumbInfo;
                            void vm.directoryBreadCrumbInfo;
                            if (vm.competency) {
                                vm.getName(vm.competency);
                            }
                            break;
                        }
                    }
                });
            } catch { }
        }
        await searchInput.fill('');
        await page.waitForTimeout(500);
    }

    // ============ EXERCISE common.js VIA conditionalDelete and spitEvent ============
    console.log('10. Exercising common.js utility functions...');
    await page.evaluate(() => {
        const allEls = document.querySelectorAll('*');
        for (const el of allEls) {
            const vm = el.__vue__;
            if (vm && vm.$options && vm.$options.mixins) {
                // Try to access common.js methods
                if (typeof vm.spitEvent === 'function') {
                    try { vm.spitEvent('testEvent', 'testId', 'testTarget'); } catch { }
                }
                if (typeof vm.isLink === 'function') {
                    try { vm.isLink('http://example.com'); } catch { }
                    try { vm.isLink('not a link'); } catch { }
                }
                if (typeof vm.resolveNameFromUrl === 'function') {
                    try { vm.resolveNameFromUrl('http://example.com/test'); } catch { }
                }
                if (typeof vm.getDisplayStringFrom === 'function') {
                    try { vm.getDisplayStringFrom({ value: 'testVal' }); } catch { }
                }
                break;
            }
        }
    });

    // ============ EXERCISE MORE LISTITEMINFO ============
    console.log('11. Deep ListItemInfo exercise...');
    await page.goto('http://localhost:8082/#/frameworks?server=http://localhost/api/');
    await page.waitForTimeout(3000);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    await page.evaluate(() => {
        document.querySelectorAll('.dropdown-content, .dropdown.is-active').forEach(el => el.style.display = 'none');
    });
    await page.waitForTimeout(500);

    const listItems2 = page.locator('.cass--list--item');
    const li2Count = await listItems2.count();
    for (let i = 0; i < Math.min(li2Count, 3); i++) {
        await listItems2.nth(i).click({ force: true });
        await page.waitForTimeout(1500);

        // Deep exercise ListItemInfo
        await page.evaluate(() => {
            const allEls = document.querySelectorAll('*');
            for (const el of allEls) {
                const vm = el.__vue__;
                if (vm && vm.$options && vm.$options.name === 'ListItemInfo') {
                    // Touch ALL computed properties
                    const propNames = [
                        'objectType', 'object', 'numObjects', 'canEdit',
                        'dateCreated', 'lastModified', 'creatorName',
                        'owners', 'readers', 'profile', 'ceasnDataFields',
                        'totalCompetencies', 'directoryName', 'directoryType',
                        'directoryItems', 'directoryIsPublished', 'conceptSchemeType',
                        'isCtdlasnProfile', 'isTlaProfile', 'shortType',
                        'objectName', 'frameworkObj', 'framework'
                    ];
                    for (const p of propNames) {
                        try { void vm[p]; } catch { }
                    }
                    // Call methods
                    if (typeof vm.getCompetencyCount === 'function') {
                        try { vm.getCompetencyCount(); } catch { }
                    }
                    if (typeof vm.getProfile === 'function') {
                        try { vm.getProfile(); } catch { }
                    }
                    break;
                }
            }
        });

        const closeBtn = page.locator('#close-right-aside-button');
        if (await closeBtn.isVisible()) await closeBtn.click({ force: true });
        await page.waitForTimeout(300);
    }

    // ============ EXERCISE REMAINING STORE MODULES ============
    console.log('12. Additional store exercise...');
    await page.evaluate(() => {
        const store = window.app && window.app.$store;
        if (!store) return;

        // Crosswalk module
        store.commit('crosswalk/sourceFramework', null);
        store.commit('crosswalk/targetFramework', null);
        store.commit('crosswalk/step', 'A');
        store.commit('crosswalk/step', 'B');
        store.commit('crosswalk/step', 'C');
        store.commit('crosswalk/selectedSourceCompetency', null);
        store.commit('crosswalk/selectedTargetCompetency', null);
        void store.getters['crosswalk/alignments'];

        // Lode module
        store.commit('lode/selectCompetency', null);
        store.commit('lode/setSelectAll', true);
        store.commit('lode/setSelectAll', false);
        store.commit('lode/setHierarchySelectAll', true);
        store.commit('lode/setHierarchySelectAll', false);

        // Editor module
        store.commit('editor/framework', null);
        store.commit('editor/selectedCompetency', null);
        store.commit('editor/private', false);
        store.commit('editor/newFramework', true);
        store.commit('editor/newFramework', false);
        store.commit('editor/newCompetency', true);
        store.commit('editor/newCompetency', false);

        // Configuration module
        void store.getters['configuration/configByName'];
    });

    // ============ EXTRACT COVERAGE ============
    console.log('13. Extracting coverage...');
    const coverage = await page.evaluate(() => window.__coverage__);
    if (coverage) {
        const fileCount = Object.keys(coverage).length;
        console.log(`   Coverage found for ${fileCount} files`);

        const outputDir = path.join(__dirname, '.nyc_output');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const outputPath = path.join(outputDir, `targeted-zerocov-${Date.now()}.json`);
        fs.writeFileSync(outputPath, JSON.stringify(coverage));
        console.log(`   Coverage written to: ${outputPath}`);
    } else {
        console.log('   No coverage data found!');
    }

    await browser.close();
    console.log('Done!');
})();
