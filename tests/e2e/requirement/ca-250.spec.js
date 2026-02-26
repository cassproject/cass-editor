const { test, expect } = require('../fixtures');

// CA-250: Operate within HTML5 environment
    test('CA-250: HTML5 environment', async ({ page }) => {
        await page.goto('/?server=http://localhost/api/');
        const doctype = await page.evaluate(() => {
            const node = document.doctype;
            return node ? node.name : null;
        });
        expect(doctype).toBe('html');
    });
