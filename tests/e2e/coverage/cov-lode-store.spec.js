/**
 * Coverage tests for lode.js store module
 * 248 lines — exercises schema/property management mutations and getters.
 */

const { test, expect } = require('../fixtures');

test.describe('Lode Store Coverage', () => {

    test('Exercise lode store saving/adding property mutations and getters', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');

        const result = await page.evaluate(() => {
            const store = window.app && window.app.$store;
            if (!store) return null;
            const r = {};

            // isSavingProperty
            r.savePropDefault = store.getters['lode/isSavingProperty'];
            store.commit('lode/setIsSavingProperty', true);
            r.savePropTrue = store.getters['lode/isSavingProperty'];
            store.commit('lode/setIsSavingProperty', false);

            // isSavingThing
            r.saveThingDefault = store.getters['lode/isSavingThing'];
            store.commit('lode/setIsSavingThing', true);
            r.saveThingTrue = store.getters['lode/isSavingThing'];
            store.commit('lode/setIsSavingThing', false);

            // isAddingProperty
            r.addPropDefault = store.getters['lode/isAddingProperty'];
            store.commit('lode/setIsAddingProperty', true);
            r.addPropTrue = store.getters['lode/isAddingProperty'];
            store.commit('lode/setIsAddingProperty', false);

            // addingProperty
            r.addingPropDefault = store.getters['lode/addingProperty'];
            store.commit('lode/setAddingProperty', 'http://schema.org/name');
            r.addingPropSet = store.getters['lode/addingProperty'];
            store.commit('lode/setAddingProperty', '');

            // addingRange
            r.addingRangeDefault = store.getters['lode/addingRange'];
            store.commit('lode/setAddingRange', ['http://schema.org/Text']);
            r.addingRangeSet = store.getters['lode/addingRange'];
            store.commit('lode/setAddingRange', []);

            // addingChecked
            r.addingCheckedDefault = store.getters['lode/addingChecked'];
            store.commit('lode/setAddingChecked', ['opt1', 'opt2']);
            r.addingCheckedSet = store.getters['lode/addingChecked'];
            store.commit('lode/setAddingChecked', []);

            // includeRelations
            r.includeRelDefault = store.getters['lode/includeRelations'];
            store.commit('lode/includeRelations', false);
            r.includeRelFalse = store.getters['lode/includeRelations'];
            store.commit('lode/includeRelations', true);

            return r;
        });

        expect(result).toBeTruthy();
        expect(result.savePropDefault).toBe(false);
        expect(result.savePropTrue).toBe(true);
        expect(result.saveThingDefault).toBe(false);
        expect(result.saveThingTrue).toBe(true);
        expect(result.addPropDefault).toBe(false);
        expect(result.addPropTrue).toBe(true);
        expect(result.addingPropDefault).toBe('');
        expect(result.addingPropSet).toBe('http://schema.org/name');
        expect(result.addingRangeDefault).toEqual([]);
        expect(result.addingRangeSet).toEqual(['http://schema.org/Text']);
        expect(result.addingCheckedDefault).toEqual([]);
        expect(result.addingCheckedSet).toEqual(['opt1', 'opt2']);
        expect(result.includeRelDefault).toBe(true);
        expect(result.includeRelFalse).toBe(false);
    });

    test('Exercise addingValues, numPropertyComponents, and competencySearchModal', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');

        const result = await page.evaluate(() => {
            const store = window.app && window.app.$store;
            if (!store) return null;
            const r = {};

            // setAddingValues with array of objects
            store.commit('lode/setAddingValues', [
                { '@value': 'val1', '@language': 'en' },
                { '@value': 'val2', '@language': 'es' }
            ]);
            r.addingValues = store.getters['lode/addingValues'];
            r.addingValuesLen = r.addingValues.length;

            // addToAddingValues
            store.commit('lode/addToAddingValues', { '@value': 'val3', '@language': 'fr' });
            r.addedValues = store.getters['lode/addingValues'];
            r.addedValuesLen = r.addedValues.length;

            // removeAddingValueAtIndex - sets state marker, does NOT splice
            store.commit('lode/removeAddingValueAtIndex', 0);
            r.removeIdx = store.getters['lode/removeAddingValueAtIndex'];
            r.afterRemoveLen = store.getters['lode/addingValues'].length; // still 3

            // Clean up
            store.commit('lode/setAddingValues', []);

            // competencySearchModalOpen
            store.commit('lode/competencySearchModalOpen', true);
            r.searchModalOpen = store.state.lode.competencySearchModalOpen;
            store.commit('lode/competencySearchModalOpen', false);

            // copyOrLink
            store.commit('lode/copyOrLink', true);
            r.copyOrLink = store.state.lode.copyOrLink;
            store.commit('lode/copyOrLink', false);

            // searchType
            store.commit('lode/searchType', 'Competency');
            r.searchType = store.state.lode.searchType;
            store.commit('lode/searchType', null);

            // incrementNumPropertyComponents / decrementNumPropertyComponents
            store.commit('lode/incrementNumPropertyComponents', 'thing-1');
            r.numIncrement1 = store.state.lode.numPropertyComponentsVisible['thing-1'];
            store.commit('lode/incrementNumPropertyComponents', 'thing-1');
            r.numIncrement2 = store.state.lode.numPropertyComponentsVisible['thing-1'];
            store.commit('lode/decrementNumPropertyComponents', 'thing-1');
            r.numDecrement = store.state.lode.numPropertyComponentsVisible['thing-1'];
            store.commit('lode/decrementNumPropertyComponents', 'thing-1');

            // setSchemata expects { id: string, obj: array }
            const schemaPayload = {
                id: 'schema:Thing',
                obj: [{ '@id': 'http://schema.org/name', 'http://schema.org/domainIncludes': [{ '@id': 'schema:Thing' }] }]
            };
            store.commit('lode/setSchemata', schemaPayload);
            r.schemata = store.state.lode.schemata['schema:Thing'];

            // setEmptySchemataLookup — test with separate key
            store.commit('lode/setEmptySchemataLookup', { id: 'schema:Empty' });
            r.emptySchemata = store.state.lode.schemataLookup['schema:Empty'];

            // setSchemataLookup requires schemataLookup[id] to exist first
            store.commit('lode/setEmptySchemataLookup', { id: 'schema:Thing' });
            store.commit('lode/setSchemataLookup', { index: 0, schema: schemaPayload });
            r.schemataLookup = store.state.lode.schemataLookup['schema:Thing']['http://schema.org/name'];

            // setObjectModel expects { type: { '@id': string }, val: object }
            store.commit('lode/setObjectModel', { type: { '@id': 'http://schema.org/Person' }, val: { label: 'Person' } });
            r.objectModel = store.state.lode.objectModel['http://schema.org/Person'];

            // rawSchemata expects { id: string, obj: object }
            store.commit('lode/rawSchemata', { id: 'testCtx', obj: { '@context': {} } });
            r.rawSchemata = store.state.lode.rawSchemata['testCtx'];

            return r;
        });

        expect(result).toBeTruthy();
        expect(result.addingValuesLen).toBe(2);
        expect(result.addedValuesLen).toBe(3);
        expect(result.afterRemoveLen).toBe(3);
        expect(result.removeIdx).toBe(0);
        expect(result.searchModalOpen).toBe(true);
        expect(result.copyOrLink).toBe(true);
        expect(result.searchType).toBe('Competency');
        expect(result.numIncrement1).toBe(1);
        expect(result.numIncrement2).toBe(2);
        expect(result.numDecrement).toBe(1);
        expect(result.schemataLookup).toBeTruthy();
        expect(result.emptySchemata).toEqual({});
        expect(result.objectModel).toEqual({ label: 'Person' });
        expect(result.rawSchemata).toEqual({ '@context': {} });
    });
});
