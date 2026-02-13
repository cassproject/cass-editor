const { test, expect } = require('@playwright/test');

test.describe('Content Management', () => {
    test.beforeEach(async ({ page }) => {
        // Go to the legacy login page
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        await page.goto('/#/legacyLogin?server=http://localhost/api/');

        // Wait for a moment to let things settle
        await page.waitForTimeout(1000);

        // Force apiLoginEnabled to false to show the Create Account button
        await page.evaluate(() => {
            if (window.app && window.app.$store) {
                window.app.$store.commit('featuresEnabled/apiLoginEnabled', false);
            }
        });

        // Click create account
        await page.click('#legacy-login-create-account-button');

        // Fill in the create account form
        await page.fill('#legacy-login-create-link-person-name', 'Test User');
        await page.fill('#legacy-login-create-link-person-email', `test${Date.now()}@test.com`);
        await page.fill('#legacy-login-create-account-username', `testuser${Date.now()}`);
        await page.fill('#legacy-login-create-account-password', 'password123');
        await page.fill('#legacy-login-create-account-password-confirm', 'password123');

        // Click the create button
        await page.click('#legacy-login-create-link-person-button');

        // Wait for the manage users button which appears after successful login/creation to resolve the spinner/redirect
        await page.waitForSelector('#side-nav-user-icon-button');
    });

    test('Create and Edit Framework', async ({ page }) => {
        // Navigate to frameworks page (should be there already, but ensuring)
        // Ensure query params are preserved if needed, but the redirect usually handles it
        // We are already on /frameworks after login.

        // Click add new dropdown
        console.log('Clicking add new dropdown toggle...');
        await page.waitForSelector('#add-new-dropdown-toggle-button');
        await page.click('#add-new-dropdown-toggle-button');

        // Check if dropdown is active
        const isDropdownActive = await page.evaluate(() => {
            return document.querySelector('.dropdown').classList.contains('is-active');
        });
        console.log(`Dropdown active status: ${isDropdownActive}`);

        // Select Framework
        console.log('Clicking add new framework option...');
        await page.click('#add-new-dropdown-framework');
        console.log('Clicked add new framework option.');

        // Wait for framework editor to load. Looking for the framework container.
        console.log('Waiting for .lode__thing-editing...');
        await page.waitForSelector('.lode__thing-editing');

        // Verify we are in edit mode or can see inputs
        // Scoping the name selector to the framework container to avoid ambiguity with competencies
        // We escape the special characters in the ID for the selector
        // CSS selector for ID requires escaping special chars like : / . 
        // Playwright handles [id="..."] attribute selector correctly without escaping content.
        const frameworkNameSelector = '.lode__thing-editing [id="http://schema.org/name-0"] textarea';
        const frameworkDescriptionSelector = '.lode__thing-editing [id="http://schema.org/description-0"] textarea';

        await page.waitForSelector(frameworkNameSelector);
        await page.fill(frameworkNameSelector, 'Test Framework Name');

        // Use keyboard to trigger blur/save if needed
        await page.press(frameworkNameSelector, 'Tab');

        // Check if description exists
        if (await page.isVisible(frameworkDescriptionSelector)) {
            await page.fill(frameworkDescriptionSelector, 'Test Framework Description');
            await page.press(frameworkDescriptionSelector, 'Tab');
        }

        // Click Done to save and close the editor modal
        console.log('Clicking done editing...');
        await page.click('#thing-editing-done-editing-button');

        // Add a competency
        // Look for #add-competency-button (Hierarchy.vue)
        const addCompetencyButton = '#add-competency-button';
        await page.waitForSelector(addCompetencyButton);
        await page.click(addCompetencyButton);

        // Click create new competency button which appears after add button
        const createNewCompetencyButton = '#create-new-competency-button';
        await page.waitForSelector(createNewCompetencyButton);
        await page.click(createNewCompetencyButton);


        // Wait for usage of the editor
        // The editor has class .lode__thing-editing
        const editorSelector = '.lode__thing-editing';
        await page.waitForSelector(editorSelector, { state: 'visible', timeout: 30000 });
        console.log('Competency editor found.');

        // Define selector for name field within the editor
        const competencyNameSelector = `${editorSelector} [id="http://schema.org/name-0"] textarea`;

        // Fill in the competency name
        await page.fill(competencyNameSelector, 'Test Competency 1');
        console.log('Competency name filled.');
        await page.press(competencyNameSelector, 'Tab');

    });
});
